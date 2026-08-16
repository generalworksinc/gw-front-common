import { createContext, ParentComponent } from 'solid-js';
type StoreContextResult<T> = {
    Provider: ParentComponent;
    useStore: () => T;
    Context: ReturnType<typeof createContext<T>>;
};
export declare function createStoreContext<T>(createStoreValue: () => T): StoreContextResult<T>;
export {};
