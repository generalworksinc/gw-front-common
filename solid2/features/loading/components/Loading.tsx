import type { JSX } from '@solidjs/web';
import { Show } from 'solid-js';
import type { LoadingStore } from '../loadingStore';

export interface LoadingProps {
	store: LoadingStore;
}

export function Loading(props: LoadingProps): JSX.Element {
	return (
		<div>
			<Show when={props.store.isLoading()}>
				<div class="loading-page-manual element-animation">
					<div class="element-animation__inner">
						<div class="loader"></div>
					</div>
				</div>
			</Show>
		</div>
	);
}
