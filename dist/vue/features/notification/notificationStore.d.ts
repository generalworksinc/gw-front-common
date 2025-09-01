export type NotificationType = 'success' | 'warning' | 'danger' | 'info';
export interface NotificationItem {
    id: string;
    type: NotificationType;
    message: string;
    removeAfter?: number;
}
export declare const useNotification: import('pinia').StoreDefinition<"notification", {
    notifications: NotificationItem[];
}, {}, {
    add(n: Omit<NotificationItem, "id">): void;
    remove(id: string): void;
    clear(): void;
}>;
