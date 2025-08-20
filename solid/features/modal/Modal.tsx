/** @jsxImportSource solid-js */
import type { JSX } from "solid-js";
import type { ModalStore } from "./store.ts";
import { Show } from "solid-js";

export function Modal(props: {
	store: ModalStore;
	class?: string;
}): JSX.Element {
	const state = () => props.store.state;
	return (
		<Show when={state().isOpen}>
			<div class={"gw-modal " + (props.class ?? "")}> 
				<div class="gw-modal__panel">
					<div class="gw-modal__body">
						{state().options.message ? (
							<div>{state().options.message}</div>
						) : state().options.html ? (
							<div innerHTML={state().options.html} />
						) : (
							<></>
						)}
					</div>
					<div class="gw-modal__actions">
						<button class="gw-modal__btn" onClick={() => props.store.yes()}>OK</button>
						<button class="gw-modal__btn" onClick={() => props.store.no()}>Cancel</button>
					</div>
				</div>
			</div>
		</Show>
	);
}
