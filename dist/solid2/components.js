import { For as e, createMemo as t } from "solid-js";
import { addEvent as n, className as r, createComponent as i, delegateEvents as a, effect as o, insert as s, memo as c, readShallow as l, style as u, template as d } from "@solidjs/web";
// solid2/features/error/components/ErrorMessage.tsx
var f = /* @__PURE__ */ d("<div>");
function p(e) {
	return e.error ? (() => {
		var t = f();
		return s(t, () => e.error), o(() => `text-red-500 ${e.class ?? ""}`, (e, n) => {
			r(t, e, n);
		}), t;
	})() : null;
}
// solid2/features/loading/components/LoadingOverlay.tsx
var m = /* @__PURE__ */ d("<div>"), h = /* @__PURE__ */ d("<div class=\"loading-page-manual element-animation\"><div class=element-animation__inner><div class=loader>");
function g(e) {
	var t = m();
	return s(t, (() => {
		var t = c(() => !!e.store.isLoading());
		return () => t() ? h() : void 0;
	})()), t;
}
// solid2/features/modal/components/Modal.tsx
var _ = /* @__PURE__ */ d("<div class=modal-mask><div class=modal-wrapper><div class=modal-container><div class=modal-header></div><div class=\"modal-body is-size-6\"><!><!></div><div class=modal-footer><!><!>"), v = /* @__PURE__ */ d("<div>"), y = /* @__PURE__ */ d("<div style=white-space:pre-wrap>"), b = /* @__PURE__ */ d("<button type=button class=\"cursor-pointer modal-default-button is-right\"><span style=cursor:pointer>はい"), x = /* @__PURE__ */ d("<button type=button class=\"cursor-pointer modal-default-button is-left\"><span style=cursor:pointer>キャンセル"), S = /* @__PURE__ */ d("<button type=button class=\"cursor-pointer modal-default-button is-right\"id=modal_component_OK><span style=cursor:pointer>OK");
function C(e) {
	let r = t(() => {
		let t = e.store.get();
		return [
			t.width ? `width:${t.width};` : "",
			t.height ? `height:${t.height};` : "",
			t.maxWidth ? `max-width:${t.maxWidth};` : "",
			t.maxHeight ? `max-height:${t.maxHeight};` : "",
			t.minWidth ? `min-width:${t.minWidth};` : "",
			t.minHeight ? `min-height:${t.minHeight};` : "",
			t.isScrollY ? "overflow-y: scroll;" : ""
		].join("");
	});
	return c(() => c(() => !!e.store.get().isOpen)() ? (() => {
		var t = _(), i = t.firstChild.firstChild, a = i.firstChild.nextSibling, d = a.firstChild, f = d.nextSibling, p = a.nextSibling, m = p.firstChild, h = m.nextSibling;
		return s(a, (() => {
			var t = c(() => !!e.store.get().html);
			return () => t() ? (() => {
				var t = v();
				return o(() => e.store.get().html, (e) => {
					t.innerHTML = e;
				}), t;
			})() : void 0;
		})(), d), s(a, (() => {
			var t = c(() => !!e.store.get().message);
			return () => t() ? (() => {
				var t = y();
				return s(t, () => e.store.get().message), t;
			})() : void 0;
		})(), f), s(p, (() => {
			var t = c(() => !!e.store.get().isConfirm);
			return () => t() ? [(() => {
				var t = b();
				return n(t, "click", e.store.yes, !0), t;
			})(), (() => {
				var t = x();
				return n(t, "click", e.store.no, !0), t;
			})()] : void 0;
		})(), m), s(p, (() => {
			var t = c(() => !e.store.get().isConfirm);
			return () => t() ? (() => {
				var t = S();
				return n(t, "click", e.store.close, !0), t;
			})() : void 0;
		})(), h), o(() => l(r()), (e, t) => {
			u(i, e, t);
		}), t;
	})() : void 0);
}
a(["click"]);
// solid2/features/notification/components/Notifications.tsx
var w = /* @__PURE__ */ d("<div><div>"), T = /* @__PURE__ */ d("<div aria-live=polite><div><div></div></div><button type=button aria-label=\"delete notification\">&times;");
function E(t) {
	var n = w(), a = n.firstChild;
	return s(a, i(e, {
		get each() {
			return t.store.get().list;
		},
		children: (e) => (() => {
			var n = T(), i = n.firstChild, a = i.firstChild, c = i.nextSibling;
			return s(a, () => e.message), c._$$click = () => {
				e.id && t.store.remove(e.id);
			}, o(() => ({
				e: `z-50 notification default-notification-style default-notification-${e.type}`,
				t: `z-50 notification-content default-notification-style-content default-notification-${e.type}`,
				a: `z-50 notification-button default-notification-style-button default-notification-${e.type}`
			}), ({ e, t, a }, o) => {
				r(n, e, o?.e), r(i, t, o?.t), r(c, a, o?.a);
			}), n;
		})()
	})), o(() => ({
		e: `notifications ${t.class || ""}`,
		t: `z-50 position-top-right default-position-style-top-right ${t.position ? `position-${t.position}` : ""}`
	}), ({ e, t }, i) => {
		r(n, e, i?.e), r(a, t, i?.t);
	}), n;
}
a(["click"]);
export { p as ErrorMessage, g as Loading, g as LoadingOverlay, C as Modal, E as Notifications };
