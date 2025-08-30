/** @jsxImportSource solid-js */
import type { JSX } from 'solid-js';
import { For } from 'solid-js';
import defaultStore from '../notificationStore';

export function Notifications(props: {
	store?: any;
	class?: string;
	position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}): JSX.Element {
	const store = () => props.store ?? defaultStore;
	const items = () => store()?.get?.()?.list ?? [];
	const pos = () => props.position ?? 'top-right';
	const removeNotificationHandler = (id?: string | number) => {
		if (id != null) store().remove?.(id);
	};
	return (
		<div class="notifications">
			<div class={`z-50 position-${pos()} default-position-style-${pos()}`}>
				<For each={items()}>
					{(notification: any) => (
						<div
							class={`z-50 notification default-notification-style default-notification-${notification.type}`}
						>
							<div
								class={`z-50 notification-content default-notification-style-content default-notification-${notification.type}`}
							>
								<pre>{notification.message}</pre>
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
