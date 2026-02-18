export declare const isFunction: (functionToCheck: any) => boolean;
export type AsyncReturn<T extends (...args: any[]) => any> = Promise<Awaited<ReturnType<T>>>;
export type Promisify<T> = Promise<Awaited<T>>;
