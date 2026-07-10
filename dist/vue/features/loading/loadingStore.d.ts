export declare function useLoading(): import('pinia').Store<"loading", {
    isLoading: boolean;
}, {}, {
    setLoading(loading: boolean): void;
    startLoading(): void;
    stopLoading(): void;
    /**
     * @deprecated startLoading()/stopLoading() を使うこと。次のメジャーバージョンで削除予定。
     */
    LOADING(): void;
    /**
     * @deprecated startLoading()/stopLoading() を使うこと。次のメジャーバージョンで削除予定。
     */
    NOT_LOADING(): void;
}>;
