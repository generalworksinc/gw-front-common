import { createSignal } from 'solid-js';

export type NotificationType = 'success' | 'warning' | 'danger' | 'info';

export interface NotificationItem {
	id: string;
	type: NotificationType;
	message: string;
	removeAfter?: number;
}

export interface NotificationStore {
	state: { items: NotificationItem[] };
	add: (n: Omit<NotificationItem, 'id'>) => void;
	remove: (id: string) => void;
	clear: () => void;
}

const randomId = () => Math.random().toString(36).slice(2);

export function createNotificationStore(): NotificationStore {
	const [items, setItems] = createSignal<NotificationItem[]>([]);

	const add = (n: Omit<NotificationItem, 'id'>) => {
		const item: NotificationItem = { id: randomId(), ...n };
		setItems((prev) => [...prev, item]);
		if (item.removeAfter && item.removeAfter > 0) {
			setTimeout(() => remove(item.id), item.removeAfter);
		}
	};

	const remove = (id: string) => {
		setItems((prev) => prev.filter((n) => n.id !== id));
	};

	const clear = () => setItems([]);

	return new Proxy({} as any, {
		get(_t, k) {
			if (k === 'state')
				return { items: items() } as { items: NotificationItem[] };
			if (k === 'add') return add;
			if (k === 'remove') return remove;
			if (k === 'clear') return clear;
		},
	}) as unknown as NotificationStore;
}
