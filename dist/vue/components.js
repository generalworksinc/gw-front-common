import { defineComponent as _, createElementBlock as i, createCommentVNode as u, openBlock as n, normalizeClass as r, toDisplayString as m, createElementVNode as s, createVNode as f, unref as o, Transition as p, withCtx as v, normalizeStyle as g, Fragment as y, renderList as b, renderSlot as $ } from "vue";
import { u as h, a as k, b as C } from "../notificationStore-Dm6DjWDD.js";
const L = ["id"], B = /* @__PURE__ */ _({
  __name: "ErrorMessage",
  props: {
    field: {},
    classObj: {},
    id: {}
  },
  setup(c) {
    return (t, e) => t.field?.validator?.message ? (n(), i("div", {
      key: t.field?.id,
      id: t.id ?? t.field?.id,
      class: r(["text-red-500", t.classObj])
    }, m(t.field?.validator?.message), 11, L)) : u("", !0);
  }
}), D = /* @__PURE__ */ _({
  __name: "Loading",
  props: {
    class: {},
    style: {},
    store: {}
  },
  setup(c) {
    const t = c, e = t.store ?? h();
    return (d, a) => (n(), i("div", null, [
      s("div", null, "loading: " + m(o(e).isLoading), 1),
      f(p, { name: "loading-transition" }, {
        default: v(() => [
          o(e).isLoading ? (n(), i("div", {
            key: 0,
            class: r(["loading-page-manual element-animation", t.class]),
            style: g(t.style)
          }, [...a[0] || (a[0] = [
            s("div", { class: "element-animation__inner" }, [
              s("div", { class: "loader" })
            ], -1)
          ])], 6)) : u("", !0)
        ]),
        _: 1
      })
    ]));
  }
}), w = { class: "gw-modal__panel" }, M = { class: "gw-modal__body" }, N = { key: 0 }, z = ["innerHTML"], E = { class: "gw-modal__actions" }, F = /* @__PURE__ */ _({
  __name: "Modal",
  props: {
    class: {}
  },
  setup(c) {
    const t = c, e = k();
    return (d, a) => o(e).state.value.isOpen ? (n(), i("div", {
      key: 0,
      class: r(["gw-modal", t.class])
    }, [
      s("div", w, [
        s("div", M, [
          o(e).state.value.message ? (n(), i("div", N, m(o(e).state.value.message), 1)) : o(e).state.value.html ? (n(), i("div", {
            key: 1,
            innerHTML: o(e).state.value.html
          }, null, 8, z)) : u("", !0)
        ]),
        s("div", E, [
          s("button", {
            type: "button",
            class: "gw-modal__btn",
            onClick: a[0] || (a[0] = (l) => o(e).yes())
          }, "OK"),
          s("button", {
            type: "button",
            class: "gw-modal__btn",
            onClick: a[1] || (a[1] = (l) => o(e).no())
          }, "Cancel")
        ])
      ])
    ], 2)) : u("", !0);
  }
}), O = { class: "notifications" }, S = { class: "z-50 position-top-right default-position-style-top-right" }, H = ["onClick"], K = /* @__PURE__ */ _({
  __name: "Notifications",
  setup(c) {
    const t = C(), e = (d) => {
      d && t.remove(d);
    };
    return (d, a) => (n(), i("div", O, [
      s("div", S, [
        (n(!0), i(y, null, b(o(t).notifications, (l) => (n(), i("div", {
          key: l.id,
          class: r(["z-50 notification default-notification-style", `default-notification-${l.type}`]),
          role: "status",
          "aria-live": "polite"
        }, [
          s("div", {
            class: r(["z-50 notification-content default-notification-style-content", `default-notification-${l.type}`])
          }, [
            $(d.$slots, "default", {}, () => [
              s("pre", null, m(l.message), 1)
            ])
          ], 2),
          s("button", {
            class: r(["z-50 notification-button default-notification-style-button", `default-notification-${l.type}`]),
            onClick: (T) => e(l.id),
            "aria-label": "delete notification"
          }, " × ", 10, H)
        ], 2))), 128))
      ])
    ]));
  }
});
export {
  B as ErrorMessage,
  D as Loading,
  F as Modal,
  K as Notifications
};
