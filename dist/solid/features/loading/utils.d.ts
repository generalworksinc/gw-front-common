type LoadingStore = {
    isLoading: () => boolean;
    start: () => true;
    stop: () => false;
};
type AsyncFunction = (...args: any[]) => Promise<any>;
type SyncFunction = (...args: any[]) => any;
export declare function eventWithLoading(store: Pick<LoadingStore, 'isLoading' | 'start' | 'stop'>, func: AsyncFunction | SyncFunction, ...params: any[]): Promise<any>;
export declare function eventWithLoading(func: AsyncFunction | SyncFunction, ...params: any[]): Promise<any>;
export declare const awaitLoadingWith: (store: Pick<LoadingStore, "isLoading" | "start" | "stop">, asyncFn: () => Promise<void>) => () => Promise<any>;
export declare const awaitLoadingWithScheduler: (asyncFn: () => Promise<void>) => () => Promise<any>;
export {};
