import type { Component } from 'vue';
import { defineComponent } from 'vue';
import { useModal } from '../modalStore';
import { classLikeProp } from '../../../types';

const Modal: Component = defineComponent({
	name: 'Modal',
	props: { class: classLikeProp },
	setup(props) {
		const store = useModal();
		return () =>
			store.state.value.isOpen ? (
				<div class={['gw-modal', (props as any).class] as any}>
					<div class="gw-modal__panel">
						<div class="gw-modal__body">
							{store.state.value.message ? (
								<div>{store.state.value.message}</div>
							) : store.state.value.html ? (
								<div innerHTML={store.state.value.html as any} />
							) : null}
						</div>
						<div class="gw-modal__actions">
							<button
								type="button"
								class="gw-modal__btn"
								onClick={() => store.yes()}
							>
								OK
							</button>
							<button
								type="button"
								class="gw-modal__btn"
								onClick={() => store.no()}
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
