import type { Component, PropType } from 'vue';
import { defineComponent } from 'vue';
import { useNotification } from '../notificationStore';

const Notifications: Component = defineComponent({
	name: 'Notifications',
	props: {
		class: String,
		position: {
			type: String as PropType<
				'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
			>,
			default: 'top-right',
		},
	},
	setup(props) {
		const store = useNotification();
		return () => (
			<div
				class={`${(props.class ?? '') as any} gw-notifications pos-${props.position}`}
			>
				{store.notifications.value.map((n) => (
					<div class="gw-notification" data-type={n.type}>
						{n.message}
					</div>
				))}
			</div>
		);
	},
});

export default Notifications;
