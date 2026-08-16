export declare const loadingStore: {
    isLoading: import('solid-js').SourceAccessor<boolean>;
    start: () => boolean;
    stop: () => boolean;
    toggle: () => boolean;
};
export type LoadingStore = typeof loadingStore;
