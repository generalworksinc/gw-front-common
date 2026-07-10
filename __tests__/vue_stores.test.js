import { createPinia, setActivePinia } from 'pinia';
import { useLoading, useModal, useNotification } from '../vue/mod.ts';
import { setPinia } from '../vue/pinia.ts';

beforeEach(() => {
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
		expect(n.list).toHaveLength(0);

		n.add({ type: 'info', message: 'hi', removeAfter: 30 });
		expect(n.list.length).toBe(1);

		const id = n.list[0].id;
		n.remove(id);
		expect(n.list.length).toBe(0);

		n.add({ type: 'success', message: 'bye', removeAfter: 10 });
		expect(n.list.length).toBe(1);
		await new Promise((r) => setTimeout(r, 25));
		expect(n.list.length).toBe(0);

		n.add({ type: 'danger', message: 'x' });
		n.add({ type: 'warning', message: 'y' });
		n.clear();
		expect(n.list.length).toBe(0);
	});

	test('useNotification works outside setup after setPinia without active pinia', () => {
		const pinia = createPinia();
		setPinia(pinia);
		setActivePinia(undefined);

		const n = useNotification();
		expect(n.list).toHaveLength(0);

		n.add({ type: 'info', message: 'outside setup', removeAfter: 0 });
		expect(n.list).toHaveLength(1);

		const id = n.list[0].id;
		n.remove(id);
		expect(n.list).toHaveLength(0);

		n.add({ type: 'success', message: 'clear me', removeAfter: 0 });
		expect(n.list).toHaveLength(1);
		n.clear();
		expect(n.list).toHaveLength(0);
	});

	test('useNotification uses default removeAfter=3000 when omitted', async () => {
		const n = useNotification();
		n.clear();

		const originalSetTimeout = globalThis.setTimeout;
		const delays = [];
		globalThis.setTimeout = (handler, timeout, ...args) => {
			delays.push(timeout);
			return originalSetTimeout(handler, 0, ...args);
		};

		try {
			n.add({ type: 'info', message: 'default timeout' });
			expect(n.list.length).toBe(1);
			await new Promise((r) => originalSetTimeout(r, 10));
			expect(delays[0]).toBe(3000);
			expect(n.list.length).toBe(0);
		} finally {
			globalThis.setTimeout = originalSetTimeout;
			n.clear();
		}
	});
});
