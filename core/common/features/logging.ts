export type SentryLogParams = {
	message: string;
	reason?: string;
	level?: 'fatal' | 'error' | 'warning' | 'info' | 'debug' | 'log';
	category?: string;
	data?: Record<string, unknown>;
	extra?: Record<string, unknown>;
	tags?: Record<string, string>;
	user?: { id?: string; email?: string };
	contexts?: Record<string, Record<string, unknown>>;
	scope?: (scope: any) => void;
};

const MAX_STRING_LENGTH = 300;
const MAX_KEYS = 30;
const MAX_ARRAY_LENGTH = 20;
const MAX_DEPTH = 3;
const MAX_JSON_LENGTH = 2000;

const truncateString = (value: string): string =>
	value.length > MAX_STRING_LENGTH
		? `${value.slice(0, MAX_STRING_LENGTH)}...`
		: value;

const sanitizeValue = (value: unknown, depth = 0): unknown => {
	if (depth > MAX_DEPTH) return '[truncated]';
	if (typeof value === 'string') return truncateString(value);
	if (typeof value === 'number' || typeof value === 'boolean' || value == null)
		return value;
	if (value instanceof Date) return value.toISOString();
	if (Array.isArray(value)) {
		return value
			.slice(0, MAX_ARRAY_LENGTH)
			.map((item) => sanitizeValue(item, depth + 1));
	}
	if (typeof value === 'object') {
		const entries = Object.entries(value as Record<string, unknown>).slice(
			0,
			MAX_KEYS,
		);
		return Object.fromEntries(
			entries.map(([key, val]) => [key, sanitizeValue(val, depth + 1)]),
		);
	}
	return String(value);
};

const sanitizePayload = (
	payload?: Record<string, unknown>,
): Record<string, unknown> | undefined => {
	if (!payload) return undefined;
	const sanitized = sanitizeValue(payload, 0) as Record<string, unknown>;
	const json = JSON.stringify(sanitized);
	if (json.length <= MAX_JSON_LENGTH) return sanitized;
	return { _truncated: true, _size: json.length };
};

const sanitizeContexts = (
	contexts?: Record<string, Record<string, unknown>>,
): Record<string, Record<string, unknown>> | undefined => {
	if (!contexts) return undefined;
	const sanitizedEntries = Object.entries(contexts).map(([key, value]) => [
		key,
		(sanitizeValue(value, 0) as Record<string, unknown>) ?? {},
	]);
	return Object.fromEntries(sanitizedEntries);
};

export const logSentryMessageWithBreadcrumb = async (
	params: SentryLogParams,
): Promise<void> => {
	if (typeof window === 'undefined') return;
	try {
		const {
			message,
			reason,
			level = 'info',
			category = 'app',
			data,
			extra,
			tags,
			user,
			contexts,
			scope,
		} = params;
		// Avoid static bundler resolution of @sentry/browser in legacy toolchains (e.g. webpack4).
		// The module is loaded lazily only when this logger is actually used in browser runtime.
		const dynamicImport = new Function(
			'modulePath',
			'return import(modulePath);',
		) as (modulePath: string) => Promise<{
			addBreadcrumb: (breadcrumb: {
				category: string;
				level: 'fatal' | 'error' | 'warning' | 'info' | 'debug' | 'log';
				message: string;
				data?: Record<string, unknown>;
			}) => void;
			captureMessage: (
				message: string,
				options?: {
					level?: 'fatal' | 'error' | 'warning' | 'info' | 'debug' | 'log';
					extra?: Record<string, unknown>;
				},
			) => void;
			withScope: (cb: (scope: any) => void) => void;
		}>;
		const { addBreadcrumb, captureMessage, withScope } =
			await dynamicImport('@sentry/browser');
		const breadcrumbData = sanitizePayload({
			...(reason ? { reason } : {}),
			...(data ?? {}),
		});
		const sanitizedExtra = sanitizePayload({
			...(reason ? { reason } : {}),
			...(extra ?? {}),
		});
		const sanitizedContexts = sanitizeContexts(contexts);
		addBreadcrumb({
			category,
			level,
			message,
			data:
				breadcrumbData && Object.keys(breadcrumbData).length
					? breadcrumbData
					: undefined,
		});
		withScope((currentScope) => {
			if (user) currentScope.setUser(user);
			if (tags) {
				for (const [key, value] of Object.entries(tags)) {
					currentScope.setTag(key, value);
				}
			}
			if (sanitizedContexts) {
				for (const [key, value] of Object.entries(sanitizedContexts)) {
					currentScope.setContext(key, value);
				}
			}
			if (scope) scope(currentScope);
			captureMessage(message, {
				level,
				extra:
					sanitizedExtra && Object.keys(sanitizedExtra).length
						? sanitizedExtra
						: undefined,
			});
		});
	} catch (_err: unknown) {
		// ignore logging failures
	}
};
