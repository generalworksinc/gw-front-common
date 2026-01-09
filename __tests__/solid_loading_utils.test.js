import { loadingStore } from '../solid/features/loading/loadingStore.ts';
import {
	awaitLoadingWith,
	eventWithLoading,
} from '../solid/features/loading/utils.ts';

describe('solid/features/loading/utils', () => {
	beforeEach(() => {
		loadingStore.stop();
	});

	test('returns false when already loading', async () => {
		loadingStore.start();
		const res = await eventWithLoading(() => 1);
		expect(res).toBe(false);
		expect(loadingStore.isLoading()).toBe(true);
	});

	test('handles sync function and toggles loading', async () => {
		const res = await eventWithLoading((a, b) => a + b, 2, 3);
		expect(res).toBe(5);
		expect(loadingStore.isLoading()).toBe(false);
	});

	test('handles async function success', async () => {
		const res = await eventWithLoading(async () => {
			await new Promise((r) => setTimeout(r, 5));
			return 'ok';
		});
		expect(res).toBe('ok');
		expect(loadingStore.isLoading()).toBe(false);
	});

	test('handles thrown error and ensures stopLoading', async () => {
		await expect(
			eventWithLoading(() => {
				throw new Error('boom');
			}),
		).rejects.toThrow('boom');
		expect(loadingStore.isLoading()).toBe(false);
	});

	test('handles async rejected promise and ensures stopLoading', async () => {
		try {
			await eventWithLoading(async () => Promise.reject(new Error('rej')));
			throw new Error('should not reach');
		} catch (e) {
			expect(e instanceof Error ? e.message : String(e)).toBe('rej');
		}
		expect(loadingStore.isLoading()).toBe(false);
	});

	test('awaitLoadingWith wraps async function', async () => {
		const fn = awaitLoadingWith(async () => {
			await new Promise((r) => setTimeout(r, 5));
		});
		await expect(fn()).resolves.toBeUndefined();
		expect(loadingStore.isLoading()).toBe(false);
	});
});
