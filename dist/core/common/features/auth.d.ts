/**
 * Parse token expiry value into epoch milliseconds.
 * Contract:
 * - Numeric values are treated as epoch milliseconds (NOT seconds).
 * - Numeric strings are treated as epoch milliseconds (NOT seconds).
 * - Date strings are parsed via Date.parse.
 */
export declare const parseTokenExpiryEpochMs: (value: unknown) => number | null;
type RefreshDecisionParams = {
    accessToken: string | null | undefined;
    accessTokenExpiresAtRaw: unknown;
    nowMs?: number;
    refreshBufferMs?: number;
};
export declare const shouldRefreshAccessTokenByExpiryMs: ({ accessToken, accessTokenExpiresAtRaw, nowMs, refreshBufferMs, }: RefreshDecisionParams) => boolean;
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
export declare const ensureFreshAccessTokenByState: ({ getAuthState, refreshAccessToken, refreshBufferMs, inflightKey, inflightTtlMs, }: FixedAuthOptions) => Promise<string | null | undefined>;
export declare const fetchWithAuthByState: <T>(options: FixedAuthOptions, request: (accessToken: string | null | undefined) => Promise<T>) => Promise<T>;
export {};
