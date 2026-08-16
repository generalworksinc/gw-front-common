type AsyncFunction = (...args: any[]) => Promise<any>;
type SyncFunction = (...args: any[]) => any;
/** Run a user event once while exposing the global loading state. */
export declare const eventWithLoading: (func: AsyncFunction | SyncFunction, ...params: any[]) => Promise<any>;
export declare const awaitLoadingWith: (asyncFn: () => Promise<void>) => () => Promise<any>;
export {};
