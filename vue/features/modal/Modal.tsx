import { defineComponent } from "vue";
import type { PropType } from "vue";
import type { ModalStore } from "./store.ts";

const Modal = defineComponent({
	name: "Modal",
	props: {
		store: { type: Object as PropType<ModalStore>, required: true },
		class: String,
	},
	setup(props) {
		const state = () => props.store.state.value;
		return () => (
			state().isOpen ? (
				<div class={["gw-modal", (props as any).class]}> 
					<div class="gw-modal__panel">
						<div class="gw-modal__body">
							{state().options.message ? (
								<div>{state().options.message}</div>
							) : state().options.html ? (
								<div innerHTML={state().options.html}></div>
							) : null}
						</div>
						<div class="gw-modal__actions">
							<button class="gw-modal__btn" onClick={() => props.store.yes()}>OK</button>
							<button class="gw-modal__btn" onClick={() => props.store.no()}>Cancel</button>
						</div>
					</div>
				</div>
			) : null
		);
	},
});

export default Modal;
