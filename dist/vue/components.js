import { defineComponent as _, createElementBlock as l, createCommentVNode as u, openBlock as i, normalizeClass as d, toDisplayString as m, createBlock as f, Transition as p, withCtx as v, unref as o, normalizeStyle as g, createElementVNode as s, Fragment as y, renderList as b, renderSlot as $ } from "vue";
import { u as k, a as h, b as C } from "../notificationStore-Ceh-rjGw.js";
const w = ["id"], V = /* @__PURE__ */ _({
  __name: "ErrorMessage",
  props: {
    field: {},
    classObj: {},
    id: {}
  },
  setup(c) {
    return (t, e) => t.field?.validator?.message ? (i(), l("div", {
      key: t.field?.id,
      id: t.id ?? t.field?.id,
      class: d(["text-red-500", t.classObj])
    }, m(t.field?.validator?.message), 11, w)) : u("", !0);
  }
}), D = /* @__PURE__ */ _({
  __name: "Loading",
  props: {
    class: {},
    style: {}
  },
  setup(c) {
    const t = c, e = k();
    return (r, n) => (i(), f(p, { name: "loading-transition" }, {
      default: v(() => [
        o(e).isLoading ? (i(), l("div", {
          key: 0,
          class: d(["loading-page-manual element-animation", t.class]),
          style: g(t.style)
        }, [...n[0] || (n[0] = [
          s("div", { class: "element-animation__inner" }, [
            s("div", { class: "loader" })
          ], -1)
        ])], 6)) : u("", !0)
      ]),
      _: 1
    }));
  }
}), L = { class: "gw-modal__panel" }, M = { class: "gw-modal__body" }, z = { key: 0 }, N = ["innerHTML"], E = { class: "gw-modal__actions" }, F = /* @__PURE__ */ _({
  __name: "Modal",
  props: {
    class: {}
  },
  setup(c) {
    const t = c, e = h();
    return (r, n) => o(e).state.value.isOpen ? (i(), l("div", {
      key: 0,
      class: d(["gw-modal", t.class])
    }, [
      s("div", L, [
        s("div", M, [
          o(e).state.value.message ? (i(), l("div", z, m(o(e).state.value.message), 1)) : o(e).state.value.html ? (i(), l("div", {
            key: 1,
            innerHTML: o(e).state.value.html
          }, null, 8, N)) : u("", !0)
        ]),
        s("div", E, [
          s("button", {
            type: "button",
            class: "gw-modal__btn",
            onClick: n[0] || (n[0] = (a) => o(e).yes())
          }, "OK"),
          s("button", {
            type: "button",
            class: "gw-modal__btn",
            onClick: n[1] || (n[1] = (a) => o(e).no())
          }, "Cancel")
        ])
      ])
    ], 2)) : u("", !0);
  }
}), O = { class: "notifications" }, S = { class: "z-50 position-top-right default-position-style-top-right" }, B = ["onClick"], K = /* @__PURE__ */ _({
  __name: "Notifications",
  setup(c) {
    const t = C(), e = (r) => {
      r && t.remove(r);
    };
    return (r, n) => (i(), l("div", O, [
      s("div", S, [
        (i(!0), l(y, null, b(o(t).notifications, (a) => (i(), l("div", {
          key: a.id,
          class: d(["z-50 notification default-notification-style", `default-notification-${a.type}`]),
          role: "status",
          "aria-live": "polite"
        }, [
          s("div", {
            class: d(["z-50 notification-content default-notification-style-content", `default-notification-${a.type}`])
          }, [
            $(r.$slots, "default", {}, () => [
              s("pre", null, m(a.message), 1)
            ])
          ], 2),
          s("button", {
            class: d(["z-50 notification-button default-notification-style-button", `default-notification-${a.type}`]),
            onClick: (H) => e(a.id),
            "aria-label": "delete notification"
          }, " × ", 10, B)
        ], 2))), 128))
      ])
    ]));
  }
});
export {
  V as ErrorMessage,
  D as Loading,
  F as Modal,
  K as Notifications
};
