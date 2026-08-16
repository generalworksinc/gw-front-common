import { JSX } from '@solidjs/web';
import { NotificationPosition, NotificationStore } from '../notificationStore';
export interface NotificationsProps {
    store: NotificationStore;
    class?: string;
    position?: NotificationPosition;
}
export declare function Notifications(props: NotificationsProps): JSX.Element;
