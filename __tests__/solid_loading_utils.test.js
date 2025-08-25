import {
	awaitLoadingWith,
	eventWithLoading,
} from '../solid/features/loading/utils.ts';

describe('solid/features/loading/utils', () => {
	const makeStore = () => {
		const store = {
			isLoading: false,
			startLoading: () => {
				store.isLoading = true;
			},
			stopLoading: () => {
				store.isLoading = false;
			},
		};
		return store;
	};

	test('returns false when already loading', async () => {
		const store = makeStore();
		store.isLoading = true;
		const res = await eventWithLoading(store, () => 1);
		expect(res).toBe(false);
		expect(store.isLoading).toBe(true);
	});

	test('handles sync function and toggles loading', async () => {
		const store = makeStore();
		const res = await eventWithLoading(store, (a, b) => a + b, 2, 3);
		expect(res).toBe(5);
		expect(store.isLoading).toBe(false);
	});

	test('handles async function success', async () => {
		const store = makeStore();
		const res = await eventWithLoading(store, async () => {
			await new Promise((r) => setTimeout(r, 5));
			return 'ok';
		});
		expect(res).toBe('ok');
		expect(store.isLoading).toBe(false);
	});

	test('handles thrown error and ensures stopLoading', async () => {
		const store = makeStore();
		await expect(
			eventWithLoading(store, () => {
				throw new Error('boom');
			}),
		).rejects.toThrow('boom');
		expect(store.isLoading).toBe(false);
	});

	test('handles async rejected promise and ensures stopLoading', async () => {
		const store = makeStore();
		try {
			await eventWithLoading(store, async () =>
				Promise.reject(new Error('rej')),
			);
			throw new Error('should not reach');
		} catch (e) {
			expect(e instanceof Error ? e.message : String(e)).toBe('rej');
		}
		expect(store.isLoading).toBe(false);
	});

	test('awaitLoadingWith wraps async function', async () => {
		const store = makeStore();
		const fn = awaitLoadingWith(store, async () => {
			await new Promise((r) => setTimeout(r, 5));
		});
		await expect(fn()).resolves.toBeUndefined();
		expect(store.isLoading).toBe(false);
	});
});
