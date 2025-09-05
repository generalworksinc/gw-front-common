import { JSX } from 'solid-js';
import { N as NotificationStore } from '../../notificationStore-CUNsksgG.js';

/** @jsxImportSource solid-js */

declare function Loading(): JSX.Element;

/** @jsxImportSource solid-js */

declare function Modal(): JSX.Element;

/** @jsxImportSource solid-js */

interface NotificationsProps {
    store: NotificationStore;
    class?: string;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}
declare function Notifications(props: NotificationsProps): JSX.Element;

export { Loading, Modal, Notifications, type NotificationsProps };
