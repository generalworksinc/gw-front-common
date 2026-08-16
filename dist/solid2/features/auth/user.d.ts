export interface AuthEnv {
    getToken: () => Promise<string | null | undefined> | string | null | undefined;
    setToken: (token: string) => void | Promise<void>;
    removeToken: () => void | Promise<void>;
}
export declare const createAuthUser: (env: AuthEnv) => {
    $login: (token: string, userId: string, email: string, fullName: string, firstName: string, lastName?: string) => Promise<void>;
    $logout: (navigate?: (path: string) => void) => Promise<void>;
    authCheck: () => Promise<{
        accessToken: string | null | undefined;
    }>;
    getAccessTokenFromApp: () => Promise<string | null | undefined>;
};
