import { afterEach, describe, expect, test } from 'bun:test';
import { cleanup, fireEvent, render } from '@solidjs/testing-library';
import { createComponent, flush } from 'solid-js';
import { createStoreContext, modalStore } from '../dist/solid2/mod.js';

const canRenderComponents = typeof document !== 'undefined';

afterEach(() => {
	cleanup();
	modalStore.reset();
	flush();
});

describe('Solid 2 components', () => {
	test.skipIf(!canRenderComponents)(
		'Modal open/closeをDOMへ反映する',
		async () => {
			const { Modal } = await import('../dist/solid2/components.js');
			const view = render(() => createComponent(Modal, { store: modalStore }));

			modalStore.open({ message: 'hello' });
			flush();
			expect(view.getByText('hello')).toBeTruthy();

			fireEvent.click(view.getByText('OK'));
			flush();
			expect(view.queryByText('hello')).toBeNull();
		},
	);

	test.skipIf(!canRenderComponents)(
		'Modal confirmはyes callbackを実行して閉じる',
		async () => {
			const { Modal } = await import('../dist/solid2/components.js');
			let confirmed = false;
			const view = render(() => createComponent(Modal, { store: modalStore }));
			modalStore.confirm({
				message: 'continue?',
				yesFunc: () => {
					confirmed = true;
				},
			});
			flush();

			fireEvent.click(view.getByText('はい'));
			flush();
			expect(confirmed).toBe(true);
			expect(view.queryByText('continue?')).toBeNull();
		},
	);

	test.skipIf(!canRenderComponents)(
		'createStoreContextはProvider配下へstoreを渡す',
		() => {
			const { Provider, useStore } = createStoreContext(() => ({
				label: 'context-value',
			}));
			const Consumer = () => {
				const node = document.createElement('span');
				node.textContent = useStore().label;
				return node;
			};

			const view = render(() =>
				createComponent(Provider, {
					get children() {
						return createComponent(Consumer, {});
					},
				}),
			);
			expect(view.getByText('context-value')).toBeTruthy();
		},
	);
});
