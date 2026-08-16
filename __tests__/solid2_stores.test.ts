import { describe, expect, test } from 'bun:test';
import { modalStore } from '../solid2/features/modal/modalStore';
import { notificationStore } from '../solid2/features/notification/notificationStore';
import { createResettableStore } from '../solid2/features/store/resettableStore';

const flush = async () => await Promise.resolve();

describe('Solid 2 stores', () => {
	test('modal actions commit on the next microtask', async () => {
		modalStore.reset();
		await flush();

		let confirmed = false;
		modalStore.confirm({
			message: 'continue?',
			yesFunc: () => {
				confirmed = true;
			},
		});
		await flush();
		expect(modalStore.get().isOpen).toBe(true);
		expect(modalStore.get().message).toBe('continue?');

		modalStore.yes();
		expect(confirmed).toBe(true);
		await flush();
		expect(modalStore.get().isOpen).toBe(false);
	});

	test('notification draft writes compose in one tick', async () => {
		notificationStore.reset();
		await flush();
		notificationStore.add({ message: 'one', removeAfter: 0 });
		notificationStore.add({ message: 'two', removeAfter: 0 });
		await flush();
		expect(notificationStore.get().list.map(({ message }) => message)).toEqual([
			'one',
			'two',
		]);

		const id = notificationStore.get().list[0]?.id;
		if (!id) throw new Error('notification id was not assigned');
		notificationStore.remove(id);
		await flush();
		expect(notificationStore.get().list).toHaveLength(1);
	});

	test('resettable store resets and persists committed snapshots', async () => {
		const writes: string[] = [];
		const storage = {
			getItem: () => null,
			setItem: (_name: string, value: string) => {
				writes.push(value);
			},
			removeItem: () => {},
		};
		const { store, set, reset } = createResettableStore(
			{ nested: { value: 0 } },
			{ persist: { name: 'test', storage } },
		);

		set((draft) => {
			draft.nested.value = 2;
		});
		await flush();
		expect(store.nested.value).toBe(2);
		expect(JSON.parse(writes.at(-1) ?? '{}')).toEqual({
			nested: { value: 2 },
		});

		reset();
		await flush();
		expect(store.nested.value).toBe(0);
	});
});
