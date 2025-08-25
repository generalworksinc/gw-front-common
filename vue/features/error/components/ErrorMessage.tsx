import type { Component, PropType } from 'vue';
import { defineComponent } from 'vue';

const ErrorMessage: Component = defineComponent({
	name: 'ErrorMessage',
	props: {
		error: String as PropType<string | null | undefined>,
		class: String,
	},
	setup(props) {
		return () =>
			props.error ? (
				<div class={['text-red-500', (props as any).class]}>{props.error}</div>
			) : null;
	},
});

export default ErrorMessage;
