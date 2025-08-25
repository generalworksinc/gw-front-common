import loadingStore from '../solid/features/loading/store.ts';
import modalStore from '../solid/features/modal/store.ts';
import notificationStore from '../solid/features/notification/store.ts';
import {
	eventWithLoading,
	awaitLoadingWithScheduler,
} from '../solid/features/loading/utils.ts';

describe('solid scheduler compatibility (singleton wrappers)', () => {
	test('loadingStore default export behaves like scheduler store', async () => {
		// initial
		expect(loadingStore.isLoading()).toBe(false);
		loadingStore.start();
		expect(loadingStore.isLoading()).toBe(true);
		loadingStore.stop();
		expect(loadingStore.isLoading()).toBe(false);
		loadingStore.toggle();
		expect(loadingStore.isLoading()).toBe(true);
		loadingStore.toggle();
		expect(loadingStore.isLoading()).toBe(false);

		// utils without store (overload)
		const result = await eventWithLoading(() => 123);
		expect(result).toBe(123);

		const wrap = awaitLoadingWithScheduler(async () => {
			await new Promise((r) => setTimeout(r, 2));
		});
		await wrap();
	});

	test('modalStore default export APIs', () => {
		// baseline check via singleton
		expect(modalStore.get().isOpen).toBe(false);
		modalStore.open({ message: 'hello' });
		expect(modalStore.get().isOpen).toBe(true);
		expect(modalStore.get().isConfirm).toBe(false);
		modalStore.confirm({});
		expect(modalStore.get().isConfirm).toBe(true);
		modalStore.reset();
		expect(modalStore.get().isOpen).toBe(false);

		// singleton wrapper should delegate
		modalStore.open({ message: 'x' });
		expect(modalStore.get().isOpen).toBe(true);
		modalStore.confirm({});
		modalStore.yes();
		expect(modalStore.get().isOpen).toBe(false);
		modalStore.confirm({});
		modalStore.no();
		expect(modalStore.get().isOpen).toBe(false);
		modalStore.reset();
		expect(modalStore.get().isOpen).toBe(false);
	});

	test('notificationStore default export APIs', async () => {
		expect(notificationStore.get().list).toHaveLength(0);
		notificationStore.add({ type: 'info', message: 'hi', removeAfter: 5 });
		expect(notificationStore.get().list.length).toBe(1);

		// reset before wrapper add to isolate singleton store state
		notificationStore.reset();
		expect(notificationStore.get().list.length).toBe(0);

		// wrapper add with text
		notificationStore.add({ text: 'bye', type: 'success', removeAfter: 5 });
		expect(notificationStore.get().list.length).toBe(1);
		const id = notificationStore.get().list[0].id;
		notificationStore.remove(id);
		expect(notificationStore.get().list.length).toBe(0);

		// auto remove path
		notificationStore.add({ text: 'auto', type: 'warning', removeAfter: 10 });
		expect(notificationStore.get().list.length).toBe(1);
		await new Promise((r) => setTimeout(r, 20));
		expect(notificationStore.get().list.length).toBe(0);
	});
});
