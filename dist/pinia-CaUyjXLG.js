import { getActivePinia as e } from "pinia";
// vue/pinia.ts
var t = null;
function n(e) {
	t = e;
}
function r() {
	if (t) return t;
	let n = e();
	if (n) return n;
	throw Error("[gw-front-common] Pinia instance is not available. Call setPinia(pinia) once on app init or enable the Nuxt module.");
}
export { n, r as t };
