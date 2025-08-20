import { defineComponent, computed } from "vue";
import type { PropType, CSSProperties } from "vue";
import type { LoadingStore } from "./store.ts";

const Loading = defineComponent({
	name: "Loading",
	props: {
		store: Object as PropType<LoadingStore | undefined>,
		class: String,
		style: [String, Object] as PropType<string | CSSProperties>,
		show: Boolean,
	},
	setup(props) {
		const visible = computed(
			() => (props as any).show ?? props.store?.isLoading.value ?? false,
		);
		return () => (
			visible.value ? (
				<div class={["gw-loading", (props as any).class]} style={props.style as any}>
					<span class="gw-loading__spinner" />
				</div>
			) : null
		);
	},
});

export default Loading;
