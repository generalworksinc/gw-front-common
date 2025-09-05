import { createStore } from 'solid-js/store';

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

const defaultState: NotificationState = {
	list: [],
};

const [store, setStore] = createStore<NotificationState>({ ...defaultState });

const add = (payload: NotificationItem) => {
	//   const id = Date.now();
	const id = randomId();
	const notification = { ...payload, id };
	setStore('list', (list) => [...list, notification]);
	if (notification.removeAfter) {
		setTimeout(() => {
			remove(id);
		}, notification.removeAfter);
	}
};

// const remove = (id: number) => {
const remove = (id: string) => {
	setStore('list', (list) => list.filter((n) => n.id !== id));
};

const reset = () => {
	setStore({ ...defaultState });
};

const notificationStore = {
	get: () => ({ list: store.list }),
	add,
	remove,
	reset,
};

// default export removed to favor named imports
export { notificationStore };

export type NotificationStore = typeof notificationStore;
