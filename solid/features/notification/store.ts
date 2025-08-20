export type NotificationType = "success" | "warning" | "danger" | "info";

export interface NotificationItem {
	id: string;
	type: NotificationType;
	message: string;
	removeAfter?: number;
}

const randomId = () => Math.random().toString(36).slice(2);

export function createNotificationStore() {
	let items: NotificationItem[] = [];

	const add = (n: Omit<NotificationItem, "id">) => {
		const item: NotificationItem = { id: randomId(), ...n };
		items = [...items, item];
		if (item.removeAfter && item.removeAfter > 0) {
			setTimeout(() => remove(item.id), item.removeAfter);
		}
	};

	const remove = (id: string) => {
		items = items.filter((n) => n.id !== id);
	};

	const clear = () => {
		items = [];
	};

	return new Proxy({} as any, {
		get(_t, k) {
			if (k === "state") return { items };
			if (k === "add") return add;
			if (k === "remove") return remove;
			if (k === "clear") return clear;
		},
	});
}
