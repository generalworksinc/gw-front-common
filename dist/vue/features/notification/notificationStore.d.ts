import { Ref } from 'vue';
export type NotificationType = 'success' | 'warning' | 'danger' | 'info';
export interface NotificationItem {
    id: string;
    type: NotificationType;
    message: string;
    removeAfter?: number;
}
export interface NotificationStore {
    notifications: Ref<NotificationItem[]>;
    add: (n: Omit<NotificationItem, 'id'>) => void;
    remove: (id: string) => void;
    clear: () => void;
}
export declare function useNotification(): NotificationStore;
