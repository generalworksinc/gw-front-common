import * as solid_js_store from 'solid-js/store';
import * as solid_js from 'solid-js';

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
type LoadingStore$1 = typeof loadingStore;

type LoadingStore = {
    isLoading: () => boolean;
    start: () => true;
    stop: () => false;
};
type AsyncFunction = (...args: any[]) => Promise<any>;
type SyncFunction = (...args: any[]) => any;
declare function eventWithLoading(store: Pick<LoadingStore, 'isLoading' | 'start' | 'stop'>, func: AsyncFunction | SyncFunction, ...params: any[]): Promise<any>;
declare function eventWithLoading(func: AsyncFunction | SyncFunction, ...params: any[]): Promise<any>;
declare const awaitLoadingWith: (store: Pick<LoadingStore, "isLoading" | "start" | "stop">, asyncFn: () => Promise<void>) => () => Promise<any>;
declare const awaitLoadingWithScheduler: (asyncFn: () => Promise<void>) => () => Promise<any>;

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

type NotificationType = 'success' | 'warning' | 'danger' | 'info';
interface NotificationItem {
    id: string;
    type: NotificationType;
    message: string;
    removeAfter?: number;
}
declare function add(n: Omit<NotificationItem, 'id'> & {
    text?: string;
}): void;
declare function remove(id: string | number): void;
declare function reset(): void;
declare const notificationStore: {
    get: () => {
        list: NotificationItem[];
    };
    add: typeof add;
    remove: typeof remove;
    reset: typeof reset;
};

type NotificationStore = typeof notificationStore;

export { type AuthStore, type AuthUser, type LoadingStore$1 as LoadingStore, type ModalStore, type NotificationItem, type NotificationStore, type NotificationType, authStore, awaitLoadingWith, awaitLoadingWithScheduler, eventWithLoading, loadingStore, modalStore, notificationStore };
