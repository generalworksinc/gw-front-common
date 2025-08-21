/** @jsxImportSource solid-js */
import type { JSX } from 'solid-js';
import type { NotificationStore } from '../store.ts';

export function Notifications(props: {
	store: NotificationStore;
	class?: string;
	position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}): JSX.Element {
	const items = () => props.store.state.items;
	const positionClass = () => `pos-${props.position ?? 'top-right'}`;
	return (
		<div class={`${props.class ?? ''} gw-notifications ${positionClass()}`}>
			{items().map((n) => (
				<div class="gw-notification" data-type={n.type} key={n.id}>
					{n.message}
				</div>
			))}
		</div>
	);
}
