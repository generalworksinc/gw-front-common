import { describe, expect, test } from 'bun:test';
import { loadingStore } from '../solid2/features/loading/loadingStore';
import { eventWithLoading } from '../solid2/features/loading/utils';

const flush = async () => await Promise.resolve();

describe('Solid 2 loading helpers', () => {
	test('guards a second event before staged signal writes commit', async () => {
		loadingStore.stop();
		await flush();

		let calls = 0;
		const first = eventWithLoading(async () => {
			calls += 1;
			return 'done';
		});
		const second = await eventWithLoading(() => {
			calls += 1;
		});

		expect(second).toBe(false);
		expect(calls).toBe(0);
		await flush();
		expect(loadingStore.isLoading()).toBe(true);
		expect(await first).toBe('done');
		expect(calls).toBe(1);
		await flush();
		expect(loadingStore.isLoading()).toBe(false);
	});

	test('releases the guard after rejection', async () => {
		await expect(
			eventWithLoading(() => {
				throw new Error('boom');
			}),
		).rejects.toThrow('boom');

		expect(await eventWithLoading(() => 'next')).toBe('next');
	});
});
