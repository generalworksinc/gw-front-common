/** @jsxImportSource solid-js */
import type { JSX } from 'solid-js';

// export function Notifications(props: {
// 	store?: any;
// 	class?: string;
// 	position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
// }): JSX.Elemen

import { For } from 'solid-js';
import { notificationStore } from '../notificationStore';

export default function Notifications(): JSX.Element {
	const removeNotificationHandler = (id?: string) => {
		if (id) notificationStore.remove(id);
	};

	return (
		<div class="notifications">
			<div class="z-50 position-top-right default-position-style-top-right">
				<For each={notificationStore.get().list}>
					{(notification) => (
						<div
							class={`z-50 notification default-notification-style default-notification-${notification.type}`}
							aria-live="polite"
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
