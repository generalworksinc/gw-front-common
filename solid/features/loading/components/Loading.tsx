/** @jsxImportSource solid-js */
import type { JSX } from 'solid-js';
import { Show } from 'solid-js';
import loadingStore from '../store.ts';

export function Loading(props: {
	class?: string;
	style?: string | JSX.CSSProperties;
	show?: boolean;
}): JSX.Element {
	const visible = () => props.show ?? loadingStore.isLoading() ?? false;
	return (
		<Show when={visible()}>
			<div class={`gw-loading ${props.class ?? ''}`} style={props.style as any}>
				<span class="gw-loading__spinner" />
			</div>
		</Show>
	);
}
