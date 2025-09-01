/** @jsxImportSource vue */
import type { Component, CSSProperties, PropType } from 'vue';
import { defineComponent, Transition } from 'vue';
import { classLikeProp, styleLikeProp } from '../../../types';
import { useLoading } from '../loadingStore';
import './loading.css';

const Loading: Component = defineComponent({
	name: 'Loading',
	props: {
		class: classLikeProp,
		style: styleLikeProp as PropType<string | CSSProperties>,
	},
	setup(props) {
		const store = useLoading();
		return () => (
			<Transition name="loading-transition">
				{store.isLoading.value ? (
					<div
						class={[
							'loading-page-manual element-animation',
							(props as any).class,
						]}
						style={props.style as any}
					>
						<div class="element-animation__inner">
							<div class="loader"></div>
						</div>
					</div>
				) : null}
			</Transition>
		);
	},
});

export default Loading;
