/** @jsxImportSource solid-js */
import type { JSX } from 'solid-js';
import { Show } from 'solid-js';
import loadingStore from '../loadingStore';

export function Loading(): JSX.Element {
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
