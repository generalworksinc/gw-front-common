import type { Component, PropType } from 'vue';
import { defineComponent } from 'vue';
import type { ModalStore } from '../store';

const Modal: Component = defineComponent({
	name: 'Modal',
	props: { store: Object as PropType<ModalStore>, class: String },
	setup(props) {
		return () =>
			props.store.state.value.isOpen ? (
				<div class={`gw-modal ${((props as any).class ?? '').toString()}`}>
					<div class="gw-modal__panel">
						<div class="gw-modal__body">
							{props.store.state.value.options.message ? (
								<div>{props.store.state.value.options.message}</div>
							) : props.store.state.value.options.html ? (
								<div innerHTML={props.store.state.value.options.html as any} />
							) : (
								<></>
							)}
						</div>
						<div class="gw-modal__actions">
							<button
								type="button"
								class="gw-modal__btn"
								onClick={() => props.store.yes()}
							>
								OK
							</button>
							<button
								type="button"
								class="gw-modal__btn"
								onClick={() => props.store.no()}
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			) : null;
	},
});

export default Modal;
