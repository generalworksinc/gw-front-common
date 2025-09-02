import { createPinia, setActivePinia } from 'pinia';
import { useLoading, useModal, useNotification } from '../vue/mod.ts';
import { setPinia } from '../vue/pinia.ts';

beforeAll(() => {
	const pinia = createPinia();
	setPinia(pinia);
	setActivePinia(pinia);
});

describe('vue stores (ref)', () => {
	test('useLoading toggles state', () => {
		const s = useLoading();
		expect(s.isLoading).toBe(false);
		s.startLoading();
		expect(s.isLoading).toBe(true);
		s.stopLoading();
		expect(s.isLoading).toBe(false);
	});

	test('useModal open/confirm/yes/no/close/reset', () => {
		const m = useModal();
		expect(m.state.value.isOpen).toBe(false);
		m.open({ message: 'hello' });
		expect(m.state.value.isOpen).toBe(true);
		expect(m.state.value.isConfirm).toBe(false);

		let called = 0;
		m.confirm({ yesFunc: () => (called += 1) });
		expect(m.state.value.isConfirm).toBe(true);
		m.yes();
		expect(called).toBe(1);
		expect(m.state.value.isOpen).toBe(false);

		m.confirm({ noFunc: () => (called += 2) });
		m.no();
		expect(called).toBe(3);

		m.reset();
		expect(m.state.value.isOpen).toBe(false);
		expect(m.state.value.isConfirm).toBe(false);
	});

	test('useNotification add/remove/clear + auto-remove', async () => {
		const n = useNotification();
		expect(n.notifications).toHaveLength(0);

		n.add({ type: 'info', message: 'hi', removeAfter: 30 });
		expect(n.notifications.length).toBe(1);

		const id = n.notifications[0].id;
		n.remove(id);
		expect(n.notifications.length).toBe(0);

		n.add({ type: 'success', message: 'bye', removeAfter: 10 });
		expect(n.notifications.length).toBe(1);
		await new Promise((r) => setTimeout(r, 25));
		expect(n.notifications.length).toBe(0);

		n.add({ type: 'danger', message: 'x' });
		n.add({ type: 'warning', message: 'y' });
		n.clear();
		expect(n.notifications.length).toBe(0);
	});
});
