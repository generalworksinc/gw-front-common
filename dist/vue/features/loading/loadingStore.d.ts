export declare const useLoading: import('pinia').StoreDefinition<"loading", {
    isLoading: boolean;
}, {}, {
    setLoading(loading: boolean): void;
    startLoading(): void;
    stopLoading(): void;
    LOADING(): void;
    NOT_LOADING(): void;
}>;
