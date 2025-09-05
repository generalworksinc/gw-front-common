/** @jsxImportSource solid-js */
import { createSignal, type JSX, onMount } from 'solid-js';
import { Dynamic } from 'solid-js/web';

// SSR-safe wrappers without depending on @solidjs/start
const gwMod = () => import('./components_ssr');

type AnyComponent = (props: any) => JSX.Element;

function makeLazy(key: string) {
	return function LazyComponent(props: any): JSX.Element {
		const [Component, setComponent] = createSignal<AnyComponent | null>(null);
		onMount(async () => {
			const mod: any = await gwMod();
			setComponent(() => mod[key] as AnyComponent);
		});
		const C = Component();
		return C ? <Dynamic component={C as any} {...props} /> : null;
	};
}

export const Notifications = makeLazy('Notifications');
export const Modal = makeLazy('Modal');
export const Loading = makeLazy('Loading');
