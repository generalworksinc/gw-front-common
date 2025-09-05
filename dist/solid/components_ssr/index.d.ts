import { JSX } from 'solid-js';
import { L as LoadingStore, M as ModalStore, N as NotificationStore } from '../../notificationStore-D5jcCcnB.js';
import 'solid-js/store';

/** @jsxImportSource solid-js */

interface LoadingProps {
    store: LoadingStore;
}
declare function Loading(props: LoadingProps): JSX.Element;

/** @jsxImportSource solid-js */

interface ModalProps {
    store: ModalStore;
}
declare function Modal(props: ModalProps): JSX.Element;

/** @jsxImportSource solid-js */

interface NotificationsProps {
    store: NotificationStore;
    class?: string;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}
declare function Notifications(props: NotificationsProps): JSX.Element;

export { Loading, type LoadingProps, Modal, type ModalProps, Notifications, type NotificationsProps };
