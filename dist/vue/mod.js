import { n as e, r as t, t as n } from "../notificationStore-DkpdYs4k.js";
// vue/features/loading/utils.ts
async function r(e, ...n) {
	let r = t();
	return !r.isLoading && (r.startLoading(), await new Promise((t, i) => {
		setTimeout(() => {
			try {
				let a = e(...n);
				a instanceof Promise || a && typeof a.then == "function" && typeof a.catch == "function" ? a.then((e) => {
					r.stopLoading(), t(e);
				}).catch((e) => {
					r.stopLoading(), i(e);
				}) : (r.stopLoading(), t(a));
			} catch (e) {
				r.stopLoading(), i(e);
			}
		}, 1);
	}));
}
var i = (e) => async () => await r(e);
export { i as awaitLoadingWith, r as eventWithLoading, t as useLoading, e as useModal, n as useNotification };
