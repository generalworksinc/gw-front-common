import type { Component } from 'vue';
import { defineComponent } from 'vue';

const Modal: Component = defineComponent({
	name: 'Modal',
	props: { store: Object as any, class: String },
	setup(props) {
		return () =>
			props.store.state.value.isOpen ? (
				<div class={`gw-modal ${((props as any).class ?? '').toString()}`}>
					<div class="gw-modal__panel">
						<div class="gw-modal__body">
							{props.store.state.value.message ? (
								<div>{props.store.state.value.message}</div>
							) : props.store.state.value.html ? (
								<div innerHTML={props.store.state.value.html as any} />
							) : null}
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
