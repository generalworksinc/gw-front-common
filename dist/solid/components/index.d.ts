import { JSX } from 'solid-js';
import { N as NotificationStore, a as NotificationItem } from '../../notificationStore-DDpgYDTp.js';

/** @jsxImportSource solid-js */

declare function Loading(): JSX.Element;

/** @jsxImportSource solid-js */

declare function Modal(): JSX.Element;

/** @jsxImportSource solid-js */

interface NotificationsApi {
    isSameStore: (store: NotificationStore) => boolean;
    getStore: () => NotificationStore;
    getListRef: () => NotificationItem[];
}
interface NotificationsProps {
    store: NotificationStore;
    class?: string;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    onReady?: (api: NotificationsApi) => void;
}
declare function Notifications(props: NotificationsProps): JSX.Element;

export { Loading, Modal, Notifications, type NotificationsApi, type NotificationsProps };
