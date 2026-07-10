import { defineStore } from 'pinia';
import { resolvePinia } from '../../pinia';

export type NotificationType = 'success' | 'warning' | 'danger' | 'info';
export type NotificationPosition =
	| 'top-right'
	| 'top-left'
	| 'bottom-right'
	| 'bottom-left';

export interface NotificationItem {
	id: string;
	type: NotificationType;
	message: string;
	removeAfter?: number;
}

const randomId = () => Math.random().toString(36).slice(2);

const useNotificationPinia = defineStore('notification', {
	state: () => ({ list: [] as NotificationItem[] }),
	actions: {
		add(n: Omit<NotificationItem, 'id'>): void {
			const item: NotificationItem = {
				id: randomId(),
				...n,
				removeAfter: n.removeAfter ?? 3000,
			};
			this.list = [...this.list, item];
			if (item.removeAfter && item.removeAfter > 0) {
				setTimeout(() => this.remove(item.id), item.removeAfter);
			}
		},
		remove(id: string): void {
			this.list = this.list.filter((n) => n.id !== id);
		},
		clear(): void {
			this.list = [];
		},
	},
});

// 明示的に pinia の受け渡しを必須化（setup外でも setPinia 済みなら安全に呼べる）
export function useNotification() {
	return useNotificationPinia(resolvePinia());
}
