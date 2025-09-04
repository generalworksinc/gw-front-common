export declare function useLoading(): import('pinia').Store<"loading", {
    isLoading: boolean;
}, {}, {
    setLoading(loading: boolean): void;
    startLoading(): void;
    stopLoading(): void;
    LOADING(): void;
    NOT_LOADING(): void;
}>;
