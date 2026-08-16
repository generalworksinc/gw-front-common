export type NotificationType = 'success' | 'warning' | 'danger' | 'info';
export type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
export interface NotificationItem {
    id?: string;
    type?: NotificationType;
    message: string;
    removeAfter?: number;
    position?: NotificationPosition;
}
export interface NotificationState {
    list: NotificationItem[];
}
export declare const notificationStore: {
    get: () => {
        list: NotificationItem[];
    };
    add: (payload: NotificationItem) => void;
    remove: (id: string) => void;
    reset: () => void;
};
export type NotificationStore = typeof notificationStore;
