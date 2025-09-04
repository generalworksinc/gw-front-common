export interface AuthUser {
    id: string | null;
    email: string | null;
    fullName: string | null;
    firstName: string | null;
    lastName: string | null;
}
export declare const authStore: {
    get: () => AuthUser;
    set: import('solid-js/store').SetStoreFunction<AuthUser>;
    reset: () => void;
    isLoggedIn: () => boolean;
};
export type AuthStore = typeof authStore;
