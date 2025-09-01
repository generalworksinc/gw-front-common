/** @jsxImportSource vue */
import { defineComponent, type PropType } from 'vue';
import type { ClassLike } from '../../../types';

type FieldProp = { validator?: { message?: string }; id?: string };

export default defineComponent({
	name: 'ErrorMessage',
	props: {
		field: Object as PropType<FieldProp>,
		classObj: [String, Object, Array] as PropType<ClassLike>,
		id: String,
	},
	setup(props) {
		return () => {
			const message = props.field?.validator?.message;
			if (!message) return null;
			return (
				<div
					key={props.field?.id as any}
					id={props.id ?? props.field?.id}
					class={['text-red-500', props.classObj]}
				>
					{message}
				</div>
			);
		};
	},
});
