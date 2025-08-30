// createLoadingStore removed (global-only)
import modalStore from '../solid/features/modal/modalStore.ts';
import notificationStore from '../solid/features/notification/notificationStore.ts';

describe('solid stores (no runtime dep)', () => {
	// loading store is global-only now

	test('modalStore default export open/confirm/yes/no/close/reset', () => {
		expect(modalStore.get().isOpen).toBe(false);
		modalStore.open({ message: 'hello' });
		expect(modalStore.get().isOpen).toBe(true);
		expect(modalStore.get().isConfirm).toBe(false);

		let called = 0;
		modalStore.confirm({ yesFunc: () => (called += 1) });
		expect(modalStore.get().isConfirm).toBe(true);
		modalStore.yes();
		expect(called).toBe(1);
		expect(modalStore.get().isOpen).toBe(false);

		modalStore.confirm({ noFunc: () => (called += 2) });
		modalStore.no();
		expect(called).toBe(3);

		modalStore.reset();
		expect(modalStore.get().isOpen).toBe(false);
		expect(modalStore.get().isConfirm).toBe(false);
	});

	test('notificationStore default export add/remove/reset + auto-remove', async () => {
		expect(notificationStore.get().list.length).toBe(0);

		notificationStore.add({ type: 'info', message: 'hi', removeAfter: 30 });
		expect(notificationStore.get().list.length).toBe(1);

		const id = notificationStore.get().list[0].id;
		notificationStore.remove(id);
		expect(notificationStore.get().list.length).toBe(0);

		notificationStore.add({ type: 'success', message: 'bye', removeAfter: 10 });
		expect(notificationStore.get().list.length).toBe(1);
		await new Promise((r) => setTimeout(r, 25));
		expect(notificationStore.get().list.length).toBe(0);

		notificationStore.add({ type: 'danger', message: 'x' });
		notificationStore.add({ type: 'warning', message: 'y' });
		notificationStore.reset();
		expect(notificationStore.get().list.length).toBe(0);
	});
});
