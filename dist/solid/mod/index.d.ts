import * as solid_js_store from 'solid-js/store';
export { L as LoadingStore, M as ModalStore, c as NotificationItem, b as NotificationPosition, d as NotificationState, N as NotificationStore, a as NotificationType, l as loadingStore, m as modalStore, n as notificationStore } from '../../notificationStore-D5jcCcnB.js';
import { ParentComponent, createContext } from 'solid-js';

interface AuthUser {
    id: string | null;
    email: string | null;
    fullName: string | null;
    firstName: string | null;
    lastName: string | null;
}
declare const authStore: {
    get: () => AuthUser;
    set: solid_js_store.SetStoreFunction<AuthUser>;
    reset: () => void;
    isLoggedIn: () => boolean;
};
type AuthStore = typeof authStore;

type AsyncFunction = (...args: any[]) => Promise<any>;
type SyncFunction = (...args: any[]) => any;
declare const eventWithLoading: (func: AsyncFunction | SyncFunction, ...params: any[]) => Promise<any>;
declare const awaitLoadingWith: (asyncFn: () => Promise<void>) => () => Promise<any>;

type StoreContextResult<T> = {
    Provider: ParentComponent;
    useStore: () => T;
    Context: ReturnType<typeof createContext<T | undefined>>;
};
declare function createStoreContext<T>(createStore: () => T): StoreContextResult<T>;

export { type AuthStore, type AuthUser, authStore, awaitLoadingWith, createStoreContext, eventWithLoading };
