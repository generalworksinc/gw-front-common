import * as solid_js_store from 'solid-js/store';
import * as solid_js from 'solid-js';
export { c as NotificationItem, b as NotificationPosition, d as NotificationState, N as NotificationStore, a as NotificationType, n as notificationStore } from '../../notificationStore-CUNsksgG.js';

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

declare const loadingStore: {
    isLoading: solid_js.Accessor<boolean>;
    start: () => true;
    stop: () => false;
    toggle: () => boolean;
};
type LoadingStore = typeof loadingStore;

type AsyncFunction = (...args: any[]) => Promise<any>;
type SyncFunction = (...args: any[]) => any;
declare const eventWithLoading: (func: AsyncFunction | SyncFunction, ...params: any[]) => Promise<any>;
declare const awaitLoadingWith: (asyncFn: () => Promise<void>) => () => Promise<any>;

declare const defaultState: {
    isOpen: boolean;
    isConfirm: boolean;
    html: string;
    message: string;
    height: string;
    width: string;
    maxHeight: string;
    maxWidth: string;
    minHeight: string;
    minWidth: string;
    isScrollY: boolean;
    isScrollX: boolean;
    yesFunc: any;
    noFunc: any;
};
declare const modalStore: {
    get: () => {
        isOpen: boolean;
        isConfirm: boolean;
        html: string;
        message: string;
        height: string;
        width: string;
        maxHeight: string;
        maxWidth: string;
        minHeight: string;
        minWidth: string;
        isScrollY: boolean;
        isScrollX: boolean;
        yesFunc: any;
        noFunc: any;
    };
    set: solid_js_store.SetStoreFunction<{
        isOpen: boolean;
        isConfirm: boolean;
        html: string;
        message: string;
        height: string;
        width: string;
        maxHeight: string;
        maxWidth: string;
        minHeight: string;
        minWidth: string;
        isScrollY: boolean;
        isScrollX: boolean;
        yesFunc: any;
        noFunc: any;
    }>;
    open: (obj?: Partial<typeof defaultState>) => void;
    confirm: (obj?: Partial<typeof defaultState>) => void;
    close: () => void;
    yes: () => void;
    no: () => void;
    reset: () => void;
};
type ModalStore = typeof modalStore;

export { type AuthStore, type AuthUser, type LoadingStore, type ModalStore, authStore, awaitLoadingWith, eventWithLoading, loadingStore, modalStore };
