import { type Ref, ref } from 'vue';

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

const randomId = () => Math.random().toString(36).slice(2);

const notifications: Ref<NotificationItem[]> = ref([]);

const remove = (id: string) => {
	notifications.value = notifications.value.filter((n) => n.id !== id);
};

const add = (n: Omit<NotificationItem, 'id'>) => {
	const item: NotificationItem = { id: randomId(), ...n };
	notifications.value = [...notifications.value, item];
	if (item.removeAfter && item.removeAfter > 0) {
		setTimeout(() => remove(item.id), item.removeAfter);
	}
};

const clear = () => (notifications.value = []);

const notificationStore: NotificationStore = {
	notifications,
	add,
	remove,
	clear,
};

export function useNotification(): NotificationStore {
	return notificationStore;
}
