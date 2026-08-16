import { isServer } from '@solidjs/web';
import {
	createStore,
	reconcile,
	type Store,
	type StoreSetter,
	snapshot,
} from 'solid-js';

export type ResettableStoreOptions = {
	persist?: {
		name: string;
		storage?: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
	};
};

export function createResettableStore<T extends object>(
	defaultState: T,
	options?: ResettableStoreOptions,
): { store: Store<T>; set: StoreSetter<T>; reset: () => void } {
	const initialSnapshot = structuredClone(defaultState);
	// T is constrained to objects, while Solid's public NoFn<T> helper is not
	// exported. The runtime value is a structured-cloned plain object.
	const [store, setStore] = createStore<T>(
		structuredClone(initialSnapshot) as never,
	);

	const persist = options?.persist;
	const storage = persist
		? (persist.storage ?? (isServer ? undefined : globalThis.localStorage))
		: undefined;

	if (persist && storage) {
		try {
			const raw = storage.getItem(persist.name);
			if (raw != null) {
				setStore(reconcile({ ...initialSnapshot, ...JSON.parse(raw) } as T));
			}
		} catch {
			// Ignore invalid persisted state and retain the initial value.
		}
	}

	let scheduled = false;
	const schedulePersist = () => {
		if (!persist || !storage || scheduled) return;
		scheduled = true;
		queueMicrotask(() => {
			scheduled = false;
			try {
				storage.setItem(persist.name, JSON.stringify(snapshot(store)));
			} catch (error) {
				console.warn('Failed to persist resettable store.', error);
			}
		});
	};

	const set: StoreSetter<T> = (update) => {
		setStore(update);
		schedulePersist();
	};

	const reset = () => {
		setStore(reconcile(structuredClone(initialSnapshot)));
		schedulePersist();
	};

	return { store, set, reset };
}
