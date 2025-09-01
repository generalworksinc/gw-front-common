/** @jsxImportSource vue */
import type { Component, CSSProperties, PropType } from 'vue';
import { Transition, computed, defineComponent } from 'vue';
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
		const visible = computed(() => store.isLoading.value);
		return () => (
			<Transition name="loading-transition">
				{visible.value ? (
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
