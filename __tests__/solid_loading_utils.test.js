import {
	awaitLoadingWith,
	eventWithLoading,
} from '../solid/features/loading/utils.ts';

describe('solid/features/loading/utils', () => {
	const makeStore = () => {
		let v = false;
		return {
			isLoading() {
				return v;
			},
			start() {
				v = true;
				return true;
			},
			stop() {
				v = false;
				return false;
			},
		};
	};

	test('returns false when already loading', async () => {
		const store = makeStore();
		const s = makeStore();
		// set loading
		s.start();
		const res = await eventWithLoading(s, () => 1);
		expect(res).toBe(false);
		expect(s.isLoading()).toBe(true);
	});

	test('handles sync function and toggles loading', async () => {
		const s = makeStore();
		const res = await eventWithLoading(s, (a, b) => a + b, 2, 3);
		expect(res).toBe(5);
		expect(s.isLoading()).toBe(false);
	});

	test('handles async function success', async () => {
		const s = makeStore();
		const res = await eventWithLoading(s, async () => {
			await new Promise((r) => setTimeout(r, 5));
			return 'ok';
		});
		expect(res).toBe('ok');
		expect(s.isLoading()).toBe(false);
	});

	test('handles thrown error and ensures stopLoading', async () => {
		const s = makeStore();
		await expect(
			eventWithLoading(s, () => {
				throw new Error('boom');
			}),
		).rejects.toThrow('boom');
		expect(s.isLoading()).toBe(false);
	});

	test('handles async rejected promise and ensures stopLoading', async () => {
		const s = makeStore();
		try {
			await eventWithLoading(s, async () => Promise.reject(new Error('rej')));
			throw new Error('should not reach');
		} catch (e) {
			expect(e instanceof Error ? e.message : String(e)).toBe('rej');
		}
		expect(s.isLoading()).toBe(false);
	});

	test('awaitLoadingWith wraps async function', async () => {
		const s = makeStore();
		const fn = awaitLoadingWith(s, async () => {
			await new Promise((r) => setTimeout(r, 5));
		});
		await expect(fn()).resolves.toBeUndefined();
		expect(s.isLoading()).toBe(false);
	});
});
