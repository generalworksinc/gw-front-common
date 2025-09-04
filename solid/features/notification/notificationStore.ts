import { createSignal } from 'solid-js';

export type NotificationType = 'success' | 'warning' | 'danger' | 'info';

export interface NotificationItem {
	id: string;
	type: NotificationType;
	message: string;
	removeAfter?: number;
}

const randomId = () => Math.random().toString(36).slice(2);

// Global-only, minimal API (scheduler-compatible)
const [items, setItems] = createSignal<NotificationItem[]>([]);

function add(n: Omit<NotificationItem, 'id'> & { text?: string }): void {
	const item: NotificationItem = {
		id: randomId(),
		message: (n as any).message ?? (n as any).text ?? '',
		type: n.type,
		removeAfter: n.removeAfter,
	};
	setItems((prev) => [...prev, item]);
	if (item.removeAfter && item.removeAfter > 0) {
		setTimeout(() => remove(item.id), item.removeAfter);
	}
}

function remove(id: string | number): void {
	setItems((prev) => prev.filter((n) => n.id !== String(id)));
}

function reset(): void {
	setItems([]);
}

const notificationStore = {
	get: () => ({ list: items() }),
	add,
	remove,
	reset,
};

// default export removed to favor named imports
export { notificationStore };

export type NotificationStore = typeof notificationStore;
