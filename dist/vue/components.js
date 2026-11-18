import { n as e, r as t, t as n } from "../notificationStore-DkpdYs4k.js";
import { Fragment as r, Transition as i, computed as a, createBlock as o, createCommentVNode as s, createElementBlock as c, createElementVNode as l, defineComponent as u, normalizeClass as d, normalizeStyle as f, openBlock as p, renderList as m, renderSlot as h, toDisplayString as g, unref as _, withCtx as v } from "vue";
// vue/features/error/components/ErrorMessage.vue?vue&type=script&setup=true&lang.ts
var y = ["id"], b = /* @__PURE__ */ u({
	__name: "ErrorMessage",
	props: {
		field: {},
		classObj: {},
		id: {}
	},
	setup(e) {
		return (t, n) => e.field?.validator?.message ? (p(), c("div", {
			key: e.field?.id,
			id: e.id ?? e.field?.id,
			class: d(["text-red-500", e.classObj])
		}, g(e.field?.validator?.message), 11, y)) : s("", !0);
	}
}), x = /* @__PURE__ */ u({
	__name: "Loading",
	props: {
		class: {},
		style: {}
	},
	setup(e) {
		let n = e, r = t();
		return (e, t) => (p(), o(i, { name: "loading-transition" }, {
			default: v(() => [_(r).isLoading ? (p(), c("div", {
				key: 0,
				class: d(["loading-page-manual element-animation", n.class]),
				style: f(n.style)
			}, [...t[0] ||= [l("div", { class: "element-animation__inner" }, [l("div", { class: "loader" })], -1)]], 6)) : s("", !0)]),
			_: 1
		}));
	}
}), S = {
	key: 0,
	class: "modal-mask"
}, C = { class: "modal-wrapper" }, w = { class: "modal-header" }, T = ["innerHTML"], E = ["textContent"], D = { key: 0 }, O = { key: 1 }, k = /* @__PURE__ */ u({
	__name: "Modal",
	emits: [
		"yes",
		"no",
		"close"
	],
	setup(t, { emit: n }) {
		let r = n, u = e(), m = a(() => {
			let e = u.state.value, t = e.width, n = e.height, r = e.maxWidth, i = e.maxHeight, a = e.minWidth, o = e.minHeight, s = e.isScrollY;
			return (t ? `width:${t};` : "") + (n ? ` height:${n};` : "") + (r ? `max-width:${r};` : "") + (i ? ` max-height:${i};` : "") + (a ? `min-width:${a};` : "") + (o ? ` min-height:${o};` : "") + (s ? "overflow-y: scroll;" : "");
		});
		return (e, t) => (p(), o(i, { name: "modal" }, {
			default: v(() => [_(u).state.value.isOpen ? (p(), c("div", S, [l("div", C, [l("div", {
				class: d(["modal-container", _(u).state.value.containerClass]),
				style: f(m.value)
			}, [
				l("div", w, [h(e.$slots, "header")]),
				l("div", { class: d(["modal-body is-size-6", _(u).state.value.bodyClass]) }, [h(e.$slots, "body", {}, () => [_(u).state.value.html ? (p(), c("div", {
					key: 0,
					innerHTML: _(u).state.value.html
				}, null, 8, T)) : s("", !0), _(u).state.value.message ? (p(), c("div", {
					key: 1,
					style: { "white-space": "pre-wrap" },
					textContent: g(_(u).state.value.message)
				}, null, 8, E)) : s("", !0)])], 2),
				l("div", { class: d(["modal-footer", _(u).state.value.footerClass]) }, [h(e.$slots, "footer", {}, () => [_(u).state.value.isConfirm ? (p(), c("div", D, [l("a", {
					class: d(["cursor-pointer modal-default-button", _(u).state.value.reverseButtons ? "is-left" : "is-right"]),
					onClick: t[0] ||= (e) => r("yes")
				}, [...t[3] ||= [l("span", { style: { cursor: "pointer" } }, "はい", -1)]], 2), l("a", {
					class: d(["cursor-pointer modal-default-button", _(u).state.value.reverseButtons ? "is-right" : "is-left"]),
					onClick: t[1] ||= (e) => r("no")
				}, [...t[4] ||= [l("span", { style: { cursor: "pointer" } }, "キャンセル", -1)]], 2)])) : s("", !0), _(u).state.value.isConfirm ? s("", !0) : (p(), c("div", O, [l("a", {
					class: "cursor-pointer modal-default-button is-right",
					onClick: t[2] ||= (e) => r("close"),
					id: "modal_component_OK"
				}, [...t[5] ||= [l("span", { style: { cursor: "pointer" } }, "OK", -1)]])]))])], 2)
			], 6)])])) : s("", !0)]),
			_: 3
		}));
	}
}), A = { class: "notifications" }, j = ["onClick"], M = /* @__PURE__ */ u({
	__name: "Notifications",
	props: { position: {} },
	setup(e) {
		let t = n(), i = (e) => {
			e && t.remove(e);
		};
		return (n, a) => (p(), c("div", A, [l("div", { class: d(["z-50 position-top-right default-position-style-top-right", e.position ? `position-${e.position}` : ""]) }, [(p(!0), c(r, null, m(_(t).list, (e) => (p(), c("div", {
			key: e.id,
			class: d(["z-50 notification default-notification-style", `default-notification-${e.type}`])
		}, [l("div", { class: d(["z-50 notification-content default-notification-style-content", `default-notification-${e.type}`]) }, [h(n.$slots, "default", {}, () => [l("div", null, g(e.message), 1)])], 2), l("button", {
			class: d(["z-50 notification-button default-notification-style-button", `default-notification-${e.type}`]),
			onClick: (t) => i(e.id),
			"aria-label": "delete notification"
		}, " × ", 10, j)], 2))), 128))], 2)]));
	}
});
export { b as ErrorMessage, x as Loading, k as Modal, M as Notifications };
