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

export { type NotificationStore as N, type NotificationItem as a, type NotificationType as b, type NotificationPosition as c, type NotificationState as d, notificationStore as n };
