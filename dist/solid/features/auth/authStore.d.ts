export interface AuthUser {
    id: string | null;
    email: string | null;
    fullName: string | null;
    firstName: string | null;
    lastName: string | null;
}
declare const _default: {
    get: () => AuthUser;
    set: import('solid-js/store').SetStoreFunction<AuthUser>;
    reset: () => void;
    isLoggedIn: () => boolean;
};
export default _default;
