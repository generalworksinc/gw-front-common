import type { JSX } from '@solidjs/web';
import { createMemo, Show } from 'solid-js';
import type { ModalStore } from '../modalStore';

export interface ModalProps {
	store: ModalStore;
}

export function Modal(props: ModalProps): JSX.Element {
	const containerStyle = createMemo(() => {
		const state = props.store.get();
		return [
			state.width ? `width:${state.width};` : '',
			state.height ? `height:${state.height};` : '',
			state.maxWidth ? `max-width:${state.maxWidth};` : '',
			state.maxHeight ? `max-height:${state.maxHeight};` : '',
			state.minWidth ? `min-width:${state.minWidth};` : '',
			state.minHeight ? `min-height:${state.minHeight};` : '',
			state.isScrollY ? 'overflow-y: scroll;' : '',
		].join('');
	});

	return (
		<Show when={props.store.get().isOpen}>
			<div class="modal-mask">
				<div class="modal-wrapper">
					<div class="modal-container" style={containerStyle()}>
						<div class="modal-header"></div>
						<div class="modal-body is-size-6">
							<Show when={props.store.get().html}>
								<div innerHTML={props.store.get().html} />
							</Show>
							<Show when={props.store.get().message}>
								<div style="white-space: pre-wrap;">
									{props.store.get().message}
								</div>
							</Show>
						</div>
						<div class="modal-footer">
							<Show when={props.store.get().isConfirm}>
								<button
									type="button"
									class="cursor-pointer modal-default-button is-right"
									onClick={props.store.yes}
								>
									<span style="cursor: pointer;">はい</span>
								</button>
								<button
									type="button"
									class="cursor-pointer modal-default-button is-left"
									onClick={props.store.no}
								>
									<span style="cursor: pointer;">キャンセル</span>
								</button>
							</Show>
							<Show when={!props.store.get().isConfirm}>
								<button
									type="button"
									class="cursor-pointer modal-default-button is-right"
									onClick={props.store.close}
									id="modal_component_OK"
								>
									<span style="cursor: pointer;">OK</span>
								</button>
							</Show>
						</div>
					</div>
				</div>
			</div>
		</Show>
	);
}
