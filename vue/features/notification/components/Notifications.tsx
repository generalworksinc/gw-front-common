import type { Component, PropType } from 'vue';
import { defineComponent } from 'vue';
import type { NotificationStore } from '../store';

const Notifications: Component = defineComponent({
	name: 'Notifications',
	props: {
		store: Object as PropType<NotificationStore>,
		class: String,
		position: {
			type: String as PropType<
				'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
			>,
			default: 'top-right',
		},
	},
	setup(props) {
		return () => (
			<div
				class={`${(props.class ?? '') as any} gw-notifications pos-${props.position}`}
			>
				{props.store.notifications.value.map((n) => (
					<div class="gw-notification" data-type={n.type}>
						{n.message}
					</div>
				))}
			</div>
		);
	},
});

export default Notifications;
