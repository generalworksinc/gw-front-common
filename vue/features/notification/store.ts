export type RefLike<T> = { value: T };

export type NotificationType = "success" | "warning" | "danger" | "info";

export interface NotificationItem {
	id: string;
	type: NotificationType;
	message: string;
	removeAfter?: number;
}

export interface NotificationStore {
	notifications: RefLike<NotificationItem[]>;
	add: (n: Omit<NotificationItem, "id">) => void;
	remove: (id: string) => void;
	clear: () => void;
}

const randomId = () => Math.random().toString(36).slice(2);

export function useNotification(): NotificationStore {
	const notifications: RefLike<NotificationItem[]> = { value: [] };

	const remove = (id: string) => {
		notifications.value = notifications.value.filter((n) => n.id !== id);
	};

	const add = (n: Omit<NotificationItem, "id">) => {
		const item: NotificationItem = { id: randomId(), ...n };
		notifications.value = [...notifications.value, item];
		if (item.removeAfter && item.removeAfter > 0) {
			setTimeout(() => remove(item.id), item.removeAfter);
		}
	};

	const clear = () => (notifications.value = []);

	return { notifications, add, remove, clear };
}

