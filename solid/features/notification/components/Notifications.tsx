/** @jsxImportSource solid-js */
import type { JSX } from 'solid-js';
import { For } from 'solid-js';
import type { NotificationItem, NotificationStore } from '../notificationStore';

export interface NotificationsApi {
	isSameStore: (store: NotificationStore) => boolean;
	getStore: () => NotificationStore;
	getListRef: () => NotificationItem[];
}

export interface NotificationsProps {
	store: NotificationStore;
	class?: string;
	position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
	onReady?: (api: NotificationsApi) => void;
}

export function Notifications(props: NotificationsProps): JSX.Element {
	const notificationStore = props.store;

	// debug: 初期化時に store 情報と list の参照・長さを出力
	try {
		console.log('[Notifications] store=', notificationStore);
		console.log('[Notifications] list ref=', notificationStore.get().list);
		console.log(
			'[Notifications] list length=',
			notificationStore.get().list?.length,
		);
	} catch (e) {
		console.warn('[Notifications] debug log error', e);
	}

	// 外から呼べるAPIを用意
	const api: NotificationsApi = {
		isSameStore: (store: NotificationStore) => store === notificationStore,
		getStore: () => notificationStore,
		getListRef: () => notificationStore.get().list,
	};
	try {
		if (props.onReady) props.onReady(api);
		if (typeof window !== 'undefined') {
			(window as any).__GW_NOTIFICATIONS_API__ = api;
		}
	} catch {}

	const removeNotificationHandler = (id?: string) => {
		if (id) notificationStore.remove(id);
	};

	return (
		<div class={`notifications ${props.class || ''}`}>
			<div
				class={`z-50 position-top-right default-position-style-top-right ${props.position ? `position-${props.position}` : ''}`}
			>
				<div>件数：{notificationStore.get().list?.length}</div>
				<For each={notificationStore.get().list}>
					{(notification) => (
						<div
							class={`z-50 notification default-notification-style default-notification-${notification.type}`}
							aria-live="polite"
						>
							<div
								class={`z-50 notification-content default-notification-style-content default-notification-${notification.type}`}
							>
								{(() => {
									// debug: レンダ時に各 item を出力
									try {
										console.log('[Notifications] render item', notification);
									} catch {}
									return <pre>{notification.message}</pre>;
								})()}
							</div>
							<button
								type="button"
								class={`z-50 notification-button default-notification-style-button default-notification-${notification.type}`}
								onClick={() => removeNotificationHandler(notification.id)}
								aria-label="delete notification"
							>
								&times;
							</button>
						</div>
					)}
				</For>
			</div>
		</div>
	);
}
