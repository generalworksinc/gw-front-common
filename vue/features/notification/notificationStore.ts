import { defineStore } from 'pinia';

export type NotificationType = 'success' | 'warning' | 'danger' | 'info';

export interface NotificationItem {
	id: string;
	type: NotificationType;
	message: string;
	removeAfter?: number;
}

const randomId = () => Math.random().toString(36).slice(2);

export const useNotification = defineStore('notification', {
	state: () => ({ notifications: [] as NotificationItem[] }),
	actions: {
		add(n: Omit<NotificationItem, 'id'>): void {
			const item: NotificationItem = { id: randomId(), ...n };
			this.notifications = [...this.notifications, item];
			if (item.removeAfter && item.removeAfter > 0) {
				setTimeout(() => this.remove(item.id), item.removeAfter);
			}
		},
		remove(id: string): void {
			this.notifications = this.notifications.filter((n) => n.id !== id);
		},
		clear(): void {
			this.notifications = [];
		},
	},
});
