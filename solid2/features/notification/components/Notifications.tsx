import type { JSX } from '@solidjs/web';
import { For } from 'solid-js';
import type {
	NotificationPosition,
	NotificationStore,
} from '../notificationStore';

export interface NotificationsProps {
	store: NotificationStore;
	class?: string;
	position?: NotificationPosition;
}

export function Notifications(props: NotificationsProps): JSX.Element {
	return (
		<div class={`notifications ${props.class || ''}`}>
			<div
				class={`z-50 position-top-right default-position-style-top-right ${props.position ? `position-${props.position}` : ''}`}
			>
				<For each={props.store.get().list}>
					{(notification) => (
						<div
							class={`z-50 notification default-notification-style default-notification-${notification.type}`}
							aria-live="polite"
						>
							<div
								class={`z-50 notification-content default-notification-style-content default-notification-${notification.type}`}
							>
								<div>{notification.message}</div>
							</div>
							<button
								type="button"
								class={`z-50 notification-button default-notification-style-button default-notification-${notification.type}`}
								onClick={() => {
									if (notification.id) props.store.remove(notification.id);
								}}
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
