/** @jsxImportSource solid-js */
import type { JSX } from 'solid-js';
import { Show, createMemo } from 'solid-js';
import modalStore from '../modalStore';

export default function Modal(): JSX.Element {
	const containerStyle = createMemo(() => {
		const { width, height, maxWidth, maxHeight, minWidth, minHeight, isScrollY } = modalStore.get();
		return [
			width ? `width:${width};` : '',
			height ? `height:${height};` : '',
			maxWidth ? `max-width:${maxWidth};` : '',
			maxHeight ? `max-height:${maxHeight};` : '',
			minWidth ? `min-width:${minWidth};` : '',
			minHeight ? `min-height:${minHeight};` : '',
			isScrollY ? 'overflow-y: scroll;' : '',
		].join('');
	});

	return (
		<Show when={modalStore.get().isOpen}>
			<div class="modal-mask">
				<div class="modal-wrapper">
					<div class="modal-container" style={containerStyle()}>
						<div class="modal-header"></div>
						<div class="modal-body is-size-6">
							<Show when={modalStore.get().html}>
								<div innerHTML={modalStore.get().html} />
							</Show>
							<Show when={modalStore.get().message}>
								<div style="white-space: pre-wrap;">{modalStore.get().message}</div>
							</Show>
						</div>
						<div class="modal-footer">
							<Show when={modalStore.get().isConfirm}>
								<a class="cursor-pointer modal-default-button is-right" onClick={modalStore.yes}>
									<span style="cursor: pointer;">はい</span>
								</a>
								<a class="cursor-pointer modal-default-button is-left" onClick={modalStore.no}>
									<span style="cursor: pointer;">キャンセル</span>
								</a>
							</Show>
							<Show when={!modalStore.get().isConfirm}>
								<a class="cursor-pointer modal-default-button is-right" onClick={modalStore.close} id="modal_component_OK">
									<span style="cursor: pointer;">OK</span>
								</a>
							</Show>
						</div>
					</div>
				</div>
			</div>
		</Show>
	);
}
