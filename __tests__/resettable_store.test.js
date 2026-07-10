import { authStore } from '../solid/features/auth/authStore.ts';
import { createResettableStore } from '../solid/features/store/resettableStore.ts';

const createMockStorage = (initial = {}) => {
	const values = new Map(Object.entries(initial));
	const calls = [];

	return {
		calls,
		storage: {
			getItem(name) {
				calls.push(['getItem', name]);
				return values.has(name) ? values.get(name) : null;
			},
			setItem(name, value) {
				calls.push(['setItem', name, value]);
				values.set(name, value);
			},
			removeItem(name) {
				calls.push(['removeItem', name]);
				values.delete(name);
			},
		},
	};
};

const setItemCalls = (calls) => calls.filter(([type]) => type === 'setItem');

describe('createResettableStore', () => {
	test('does not mutate defaultState after set', () => {
		const defaultState = {
			user: { fullName: null },
			count: 0,
		};
		const { set } = createResettableStore(defaultState);

		set('user', 'fullName', 'Ada Lovelace');
		set('count', 1);

		expect(defaultState).toEqual({
			user: { fullName: null },
			count: 0,
		});
	});

	test('reset restores the initial snapshot after nested writes', () => {
		const defaultState = {
			user: { fullName: null },
			count: 0,
		};
		const { store, set, reset } = createResettableStore(defaultState);

		set('user', 'fullName', 'Ada Lovelace');
		set('count', 1);
		reset();

		expect(store.user.fullName).toBe(null);
		expect(store.count).toBe(0);
		expect(defaultState.user.fullName).toBe(null);
	});

	test('persists after a microtask when persist is specified', async () => {
		const { calls, storage } = createMockStorage();
		const { set } = createResettableStore(
			{ count: 0 },
			{ persist: { name: 'counter', storage } },
		);

		set('count', 1);
		expect(setItemCalls(calls).length).toBe(0);

		await Promise.resolve();

		const writes = setItemCalls(calls);
		expect(writes.length).toBe(1);
		expect(writes[0][1]).toBe('counter');
		expect(JSON.parse(writes[0][2])).toEqual({ count: 1 });
	});

	test('coalesces multiple writes in the same tick into one persist write', async () => {
		const { calls, storage } = createMockStorage();
		const { set } = createResettableStore(
			{ count: 0, label: null },
			{ persist: { name: 'state', storage } },
		);

		set('count', 1);
		set('label', 'ready');

		await Promise.resolve();

		const writes = setItemCalls(calls);
		expect(writes.length).toBe(1);
		expect(JSON.parse(writes[0][2])).toEqual({ count: 1, label: 'ready' });
	});

	test('restores from persisted value on creation', () => {
		const { storage } = createMockStorage({
			state: JSON.stringify({ count: 7 }),
		});

		const { store } = createResettableStore(
			{ count: 0, label: 'default' },
			{ persist: { name: 'state', storage } },
		);

		expect(store.count).toBe(7);
		expect(store.label).toBe('default');
	});

	test('does not throw for broken persisted JSON', () => {
		const { storage } = createMockStorage({ state: '{broken' });

		expect(() =>
			createResettableStore(
				{ count: 0 },
				{ persist: { name: 'state', storage } },
			),
		).not.toThrow();
	});

	test('does not touch storage when persist is omitted', () => {
		const descriptor = Object.getOwnPropertyDescriptor(
			globalThis,
			'localStorage',
		);

		Object.defineProperty(globalThis, 'localStorage', {
			configurable: true,
			get() {
				throw new Error('localStorage should not be touched');
			},
		});

		try {
			const { set, reset } = createResettableStore({ count: 0 });
			set('count', 1);
			reset();
		} finally {
			if (descriptor) {
				Object.defineProperty(globalThis, 'localStorage', descriptor);
			} else {
				delete globalThis.localStorage;
			}
		}
	});
});

describe('authStore', () => {
	test('set then reset returns to logged-out default state', () => {
		authStore.reset();
		authStore.set({
			id: 'user-1',
			email: 'ada@example.com',
			fullName: 'Ada Lovelace',
			firstName: 'Ada',
			lastName: 'Lovelace',
		});

		expect(authStore.isLoggedIn()).toBe(true);

		authStore.reset();

		expect(authStore.isLoggedIn()).toBe(false);
		expect(authStore.get().fullName).toBe(null);
	});
});
