import { withInflight } from './promise';

/**
 * Parse token expiry value into epoch milliseconds.
 * Contract:
 * - Numeric values are treated as epoch milliseconds (NOT seconds).
 * - Numeric strings are treated as epoch milliseconds (NOT seconds).
 * - Date strings are parsed via Date.parse.
 */
export const parseTokenExpiryEpochMs = (value: unknown): number | null => {
	if (value == null) return null;

	if (typeof value === 'number') {
		if (!Number.isFinite(value)) return null;
		return value;
	}

	const raw = String(value).trim();
	if (!raw) return null;

	if (/^\d+$/.test(raw)) {
		const num = Number(raw);
		if (!Number.isFinite(num)) return null;
		return num;
	}

	const parsed = Date.parse(raw);
	return Number.isNaN(parsed) ? null : parsed;
};

type RefreshDecisionParams = {
	accessToken: string | null | undefined;
	accessTokenExpiresAtRaw: unknown;
	nowMs?: number;
	refreshBufferMs?: number;
};

export const shouldRefreshAccessTokenByExpiryMs = ({
	accessToken,
	accessTokenExpiresAtRaw,
	nowMs = Date.now(),
	refreshBufferMs = 5 * 60 * 1000,
}: RefreshDecisionParams): boolean => {
	const exp = parseTokenExpiryEpochMs(accessTokenExpiresAtRaw);
	if (!accessToken) return true;
	return exp != null && exp - nowMs <= refreshBufferMs;
};

type MaybePromise<T> = T | Promise<T>;

export type AuthStateSnapshot = {
	accessToken: string | null | undefined;
	accessTokenExpiresAtRaw: unknown;
	refreshToken?: string | null | undefined;
	fallbackAccessToken?: string | null | undefined;
};

export type FixedAuthOptions = {
	getAuthState: () => MaybePromise<AuthStateSnapshot>;
	refreshAccessToken: () => Promise<string | null>;
	refreshBufferMs?: number;
	inflightKey?: string;
	inflightTtlMs?: number;
};

const runRefreshWithInflight = async ({
	refreshAccessToken,
	inflightKey = 'refresh',
	inflightTtlMs = 10_000,
}: Pick<
	FixedAuthOptions,
	'refreshAccessToken' | 'inflightKey' | 'inflightTtlMs'
>) => withInflight(inflightKey, () => refreshAccessToken(), inflightTtlMs);

export const ensureFreshAccessTokenByState = async ({
	getAuthState,
	refreshAccessToken,
	refreshBufferMs = 5 * 60 * 1000,
	inflightKey = 'refresh',
	inflightTtlMs = 10_000,
}: FixedAuthOptions): Promise<string | null | undefined> => {
	const {
		accessToken,
		accessTokenExpiresAtRaw,
		refreshToken,
		fallbackAccessToken,
	} = await getAuthState();

	const shouldRefresh = shouldRefreshAccessTokenByExpiryMs({
		accessToken,
		accessTokenExpiresAtRaw,
		refreshBufferMs,
	});
	if (shouldRefresh) {
		const refreshed = await runRefreshWithInflight({
			refreshAccessToken,
			inflightKey,
			inflightTtlMs,
		});
		if (refreshed) return refreshed;
	}

	if (!accessToken && !shouldRefresh && refreshToken) {
		const refreshed = await runRefreshWithInflight({
			refreshAccessToken,
			inflightKey,
			inflightTtlMs,
		});
		if (refreshed) return refreshed;
	}

	if (!accessToken && fallbackAccessToken != null) {
		return fallbackAccessToken;
	}

	return accessToken;
};

export const fetchWithAuthByState = async <T>(
	options: FixedAuthOptions,
	request: (accessToken: string | null | undefined) => Promise<T>,
): Promise<T> => {
	const initialToken = await ensureFreshAccessTokenByState(options);
	try {
		return await request(initialToken);
	} catch (error) {
		const status =
			(error as { status?: number })?.status ??
			(error as { statusCode?: number })?.statusCode ??
			(error as { response?: { status?: number } })?.response?.status;
		if (status !== 401) {
			throw error;
		}
		const refreshedToken = await runRefreshWithInflight(options);
		if (!refreshedToken) {
			throw error;
		}
		return request(refreshedToken);
	}
};
