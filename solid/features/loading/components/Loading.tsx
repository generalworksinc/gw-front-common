/** @jsxImportSource solid-js */
import type { JSX } from 'solid-js';
import { Show } from 'solid-js';
import type { LoadingStore } from '../loadingStore';

export interface LoadingProps {
	store: LoadingStore;
}

export function Loading(props: LoadingProps): JSX.Element {
	const loadingStore = props.store;
	return (
		<div>
			<Show when={loadingStore.isLoading()}>
				<div class="loading-page-manual element-animation">
					<div class="element-animation__inner">
						<div class="loader"></div>
					</div>
				</div>
			</Show>
		</div>
	);
}
