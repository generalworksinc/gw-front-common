import { createStore } from 'solid-js';

export type NotificationType = 'success' | 'warning' | 'danger' | 'info';
export type NotificationPosition =
	| 'top-right'
	| 'top-left'
	| 'bottom-right'
	| 'bottom-left';

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

const randomId = () => Math.random().toString(36).slice(2);
const [store, setStore] = createStore<NotificationState>({ list: [] });

const remove = (id: string): void => {
	setStore((draft) => {
		draft.list = draft.list.filter((notification) => notification.id !== id);
	});
};

const add = (payload: NotificationItem): void => {
	const notification = {
		...payload,
		id: randomId(),
		removeAfter: payload.removeAfter ?? 3000,
	};
	setStore((draft) => {
		draft.list.push(notification);
	});
	if (notification.removeAfter > 0) {
		setTimeout(() => remove(notification.id), notification.removeAfter);
	}
};

const reset = (): void => {
	setStore((draft) => {
		draft.list = [];
	});
};

export const notificationStore = {
	get: () => ({ list: store.list }),
	add,
	remove,
	reset,
};

export type NotificationStore = typeof notificationStore;
