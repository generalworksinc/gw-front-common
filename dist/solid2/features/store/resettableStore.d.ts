import { Store, StoreSetter } from 'solid-js';
export type ResettableStoreOptions = {
    persist?: {
        name: string;
        storage?: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
    };
};
export declare function createResettableStore<T extends object>(defaultState: T, options?: ResettableStoreOptions): {
    store: Store<T>;
    set: StoreSetter<T>;
    reset: () => void;
};
