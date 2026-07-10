export type NotificationType = 'success' | 'warning' | 'danger' | 'info';
export type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
export interface NotificationItem {
    id: string;
    type: NotificationType;
    message: string;
    removeAfter?: number;
}
export declare function useNotification(): import('pinia').Store<"notification", {
    list: NotificationItem[];
}, {}, {
    add(n: Omit<NotificationItem, "id">): void;
    remove(id: string): void;
    clear(): void;
}>;
