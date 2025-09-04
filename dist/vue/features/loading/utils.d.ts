type AsyncFunction = (...args: any[]) => Promise<any>;
type SyncFunction = (...args: any[]) => any;
export declare function eventWithLoading(func: AsyncFunction | SyncFunction, ...params: any[]): Promise<any>;
export declare const awaitLoadingWith: (asyncFn: () => Promise<void>) => () => Promise<any>;
export {};
