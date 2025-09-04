export type NotificationType = 'success' | 'warning' | 'danger' | 'info';
export interface NotificationItem {
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
export { notificationStore };
export type NotificationStore = typeof notificationStore;
