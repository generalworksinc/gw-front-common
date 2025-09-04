import { defineNuxtModule as o, createResolver as t, addPlugin as m } from "@nuxt/kit";
const r = o({
  meta: {
    name: "gw-front-common-vue",
    configKey: "gwFrontCommon"
  },
  setup() {
    const { resolve: e } = t(import.meta.url);
    m(e("./runtime/plugin"));
  }
});
export {
  r as default
};
