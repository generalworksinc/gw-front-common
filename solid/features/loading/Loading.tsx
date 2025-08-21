/** @jsxImportSource solid-js */
import type { JSX } from "solid-js";
import type { LoadingStore } from "./store.ts";
import { Show } from "solid-js";

export function Loading(props: {
	store?: LoadingStore;
	class?: string;
	style?: string | JSX.CSSProperties;
	show?: boolean;
}): JSX.Element {
	const visible = () => props.show ?? props.store?.isLoading ?? false;
	return (
		<Show when={visible()}>
			<div class={"gw-loading " + (props.class ?? "")} style={props.style as any}>
				<span class="gw-loading__spinner" />
			</div>
		</Show>
	);
}

