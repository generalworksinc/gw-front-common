export declare const loadingStore: {
    isLoading: import('solid-js').Accessor<boolean>;
    start: () => true;
    stop: () => false;
    toggle: () => boolean;
};
export type LoadingStore = typeof loadingStore;
