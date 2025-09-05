import * as solid_js from 'solid-js';
import * as solid_js_store from 'solid-js/store';

declare const loadingStore: {
    isLoading: solid_js.Accessor<boolean>;
    start: () => true;
    stop: () => false;
    toggle: () => boolean;
};
type LoadingStore = typeof loadingStore;

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
type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
interface NotificationItem {
    id?: string;
    type?: NotificationType;
    message: string;
    removeAfter?: number;
    position?: NotificationPosition;
}
interface NotificationState {
    list: NotificationItem[];
}
declare const notificationStore: {
    get: () => {
        list: NotificationItem[];
    };
    add: (payload: NotificationItem) => void;
    remove: (id: string) => void;
    reset: () => void;
};

type NotificationStore = typeof notificationStore;

export { type LoadingStore as L, type ModalStore as M, type NotificationStore as N, type NotificationType as a, type NotificationPosition as b, type NotificationItem as c, type NotificationState as d, loadingStore as l, modalStore as m, notificationStore as n };
