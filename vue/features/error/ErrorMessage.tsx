import { defineComponent } from 'vue';
import type { PropType, Component } from 'vue';

interface FieldLike {
	validator: { message: string };
}

const ErrorMessage: Component = defineComponent({
	name: 'ErrorMessage',
	props: {
		field: { type: Object as PropType<FieldLike>, required: true },
		classObj: { type: [String, Object] as PropType<any>, default: '' },
	},
	setup(props) {
		return () =>
			props.field?.validator?.message ? (
				<div class={['text-red-500', props.classObj]}>
					{props.field.validator.message}
				</div>
			) : null;
	},
});

export default ErrorMessage;
