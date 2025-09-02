import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit';

export default defineNuxtModule({
	meta: {
		name: 'gw-front-common-vue',
		configKey: 'gwFrontCommon',
	},
	setup() {
		const { resolve } = createResolver(import.meta.url);
		addPlugin(resolve('./runtime/plugin'));
	},
});
