import { addPlugin as e, createResolver as t, defineNuxtModule as n } from "@nuxt/kit";
// vue/nuxt/module.ts
var r = n({
	meta: {
		name: "gw-front-common-vue",
		configKey: "gwFrontCommon"
	},
	setup() {
		let { resolve: n } = t(import.meta.url);
		e(n("./runtime/plugin"));
	}
});
export { r as default };
