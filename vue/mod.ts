// vue entry (feature-based directories)
// Re-export stores (all named exports). `RefLike` is internal-only and not re-exported.

export { default as ErrorMessage } from './features/error/components/ErrorMessage.tsx';
// Re-export components for simple, typed imports from "@generalworks/gw-front-common/vue"
export { default as Loading } from './features/loading/components/Loading.tsx';
export * from './features/loading/store.ts';
export { default as Modal } from './features/modal/components/Modal.tsx';
export * from './features/modal/store.ts';
export { default as Notifications } from './features/notification/components/Notifications.tsx';
export * from './features/notification/store.ts';
