import type { JSX } from '@solidjs/web';
import { Show } from 'solid-js';
import type { LoadingStore } from '../loadingStore';

export interface LoadingOverlayProps {
	store: LoadingStore;
}

/** @deprecated Use LoadingOverlayProps instead. */
export type LoadingProps = LoadingOverlayProps;

export function LoadingOverlay(props: LoadingOverlayProps): JSX.Element {
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
