import {
	createStore,
	reconcile,
	type SetStoreFunction,
	unwrap,
} from 'solid-js/store';
import { isServer } from 'solid-js/web';

export type ResettableStoreOptions = {
	/** 指定するとクライアントで localStorage（または storage）へ永続化する */
	persist?: {
		name: string;
		storage?: Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;
	};
};

/**
 * リセット可能（+任意で永続化）なストアを作るファクトリ。
 *
 * createStore の2つの罠を構造的に回避する:
 * 1. createStore は初期値をクローンしない → 内部でディープコピーして保持するため、
 *    呼び出し側の defaultState がストア書き込みで汚染されることがない
 * 2. reset() は保持しておいた初期スナップショットを reconcile で書き戻すため、
 *    「汚染された初期値の書き戻し no-op」が起きない
 *
 * 永続化は makePersisted と異なり「set 直後の同期読み戻し」に依存しない
 * （microtask で遅延して書き込む）。Solid 2.0 の microtask バッチ化
 * （読み取りは flush まで旧値）でも正しい値が永続化される。
 */
export function createResettableStore<T extends object>(
	defaultState: T,
	options?: ResettableStoreOptions,
): { store: T; set: SetStoreFunction<T>; reset: () => void } {
	const snapshot = structuredClone(defaultState);
	const [store, setStore] = createStore<T>(structuredClone(snapshot));

	const persist = options?.persist;
	const storage = persist
		? (persist.storage ?? (isServer ? undefined : globalThis.localStorage))
		: undefined;

	// 復元（クライアントのみ・作成時に1回）
	if (persist && storage) {
		try {
			const raw = storage.getItem(persist.name);
			if (raw != null) {
				setStore(reconcile({ ...snapshot, ...JSON.parse(raw) }));
			}
		} catch {
			// 壊れた保存値は無視して初期状態で開始
		}
	}

	// 書き込みは microtask で遅延+同一tick内は1回に集約（Solid 2.0 のバッチ化でも安全）
	let scheduled = false;
	const schedulePersist = () => {
		if (!persist || !storage || scheduled) return;
		scheduled = true;
		queueMicrotask(() => {
			scheduled = false;
			try {
				storage.setItem(persist.name, JSON.stringify(unwrap(store)));
			} catch (err) {
				console.warn('Failed to persist resettable store.', err);
			}
		});
	};

	const set: SetStoreFunction<T> = ((...args: any[]) => {
		(setStore as any)(...args);
		schedulePersist();
	}) as SetStoreFunction<T>;

	const reset = () => {
		setStore(reconcile(structuredClone(snapshot)));
		schedulePersist();
	};

	return { store, set, reset };
}
