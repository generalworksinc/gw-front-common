import { JSX } from 'solid-js';

/** @jsxImportSource solid-js */

declare function Loading(): JSX.Element;

/** @jsxImportSource solid-js */

declare function Modal(): JSX.Element;

/** @jsxImportSource solid-js */

declare function Notifications(props: {
    store?: any;
    class?: string;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}): JSX.Element;

export { Loading, Modal, Notifications };
