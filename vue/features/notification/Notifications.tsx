import { defineComponent, computed } from "vue";
import type { PropType } from "vue";
import type { NotificationStore } from "./store.ts";

const Notifications = defineComponent({
	name: "Notifications",
	props: {
		store: { type: Object as PropType<NotificationStore>, required: true },
		position: {
			type: String as PropType<
				"top-right" | "top-left" | "bottom-right" | "bottom-left"
			>,
			default: "top-right",
		},
		class: String,
	},
	setup(props) {
		const items = computed(() => props.store.notifications.value);
		const positionClass = computed(() => `pos-${props.position}`);
		return () => (
			<div class={[props.class as any, "gw-notifications", positionClass.value]}>
				{items.value.map((n) => (
					<div class="gw-notification" data-type={n.type} key={n.id}>
						{n.message}
					</div>
				))}
			</div>
		);
	},
});

export default Notifications;
