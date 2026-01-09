import { defineComponent as h, createElementBlock as l, createCommentVNode as c, openBlock as o, normalizeClass as u, toDisplayString as p, createBlock as k, Transition as C, withCtx as b, unref as n, normalizeStyle as x, createElementVNode as e, computed as S, renderSlot as v, Fragment as z, renderList as H } from "vue";
import { u as L, a as M, b as N } from "../notificationStore-BJ6bZb9t.js";
const B = ["id"], P = /* @__PURE__ */ h({
  __name: "ErrorMessage",
  props: {
    field: {},
    classObj: {},
    id: {}
  },
  setup(a) {
    return (r, d) => a.field?.validator?.message ? (o(), l("div", {
      key: a.field?.id,
      id: a.id ?? a.field?.id,
      class: u(["text-red-500", a.classObj])
    }, p(a.field?.validator?.message), 11, B)) : c("", !0);
  }
}), Q = /* @__PURE__ */ h({
  __name: "Loading",
  props: {
    class: {},
    style: {}
  },
  setup(a) {
    const r = a, d = L();
    return (s, m) => (o(), k(C, { name: "loading-transition" }, {
      default: b(() => [
        n(d).isLoading ? (o(), l("div", {
          key: 0,
          class: u(["loading-page-manual element-animation", r.class]),
          style: x(r.style)
        }, [...m[0] || (m[0] = [
          e("div", { class: "element-animation__inner" }, [
            e("div", { class: "loader" })
          ], -1)
        ])], 6)) : c("", !0)
      ]),
      _: 1
    }));
  }
}), O = {
  key: 0,
  class: "modal-mask"
}, E = { class: "modal-wrapper" }, W = { class: "modal-header" }, T = { class: "modal-body is-size-6" }, j = ["innerHTML"], K = ["textContent"], V = { class: "modal-footer" }, Y = { key: 0 }, D = { key: 1 }, R = /* @__PURE__ */ h({
  __name: "Modal",
  emits: ["yes", "no", "close"],
  setup(a, { emit: r }) {
    const d = r, s = M(), m = S(() => {
      const t = s.state.value, i = t.width, f = t.height, y = t.maxWidth, _ = t.maxHeight, g = t.minWidth, $ = t.minHeight, w = t.isScrollY;
      return (i ? `width:${i};` : "") + (f ? ` height:${f};` : "") + (y ? `max-width:${y};` : "") + (_ ? ` max-height:${_};` : "") + (g ? `min-width:${g};` : "") + ($ ? ` min-height:${$};` : "") + (w ? "overflow-y: scroll;" : "");
    });
    return (t, i) => (o(), k(C, { name: "modal" }, {
      default: b(() => [
        n(s).state.value.isOpen ? (o(), l("div", O, [
          e("div", E, [
            e("div", {
              class: "modal-container",
              style: x(m.value)
            }, [
              e("div", W, [
                v(t.$slots, "header")
              ]),
              e("div", T, [
                v(t.$slots, "body", {}, () => [
                  n(s).state.value.html ? (o(), l("div", {
                    key: 0,
                    innerHTML: n(s).state.value.html
                  }, null, 8, j)) : c("", !0),
                  n(s).state.value.message ? (o(), l("div", {
                    key: 1,
                    style: { "white-space": "pre-wrap" },
                    textContent: p(n(s).state.value.message)
                  }, null, 8, K)) : c("", !0)
                ])
              ]),
              e("div", V, [
                v(t.$slots, "footer", {}, () => [
                  n(s).state.value.isConfirm ? (o(), l("div", Y, [
                    e("a", {
                      class: u(["cursor-pointer modal-default-button", n(s).state.value.reverseButtons ? "is-left" : "is-right"]),
                      onClick: i[0] || (i[0] = (f) => d("yes"))
                    }, [...i[3] || (i[3] = [
                      e("span", { style: { cursor: "pointer" } }, "はい", -1)
                    ])], 2),
                    e("a", {
                      class: u(["cursor-pointer modal-default-button", n(s).state.value.reverseButtons ? "is-right" : "is-left"]),
                      onClick: i[1] || (i[1] = (f) => d("no"))
                    }, [...i[4] || (i[4] = [
                      e("span", { style: { cursor: "pointer" } }, "キャンセル", -1)
                    ])], 2)
                  ])) : c("", !0),
                  n(s).state.value.isConfirm ? c("", !0) : (o(), l("div", D, [
                    e("a", {
                      class: "cursor-pointer modal-default-button is-right",
                      onClick: i[2] || (i[2] = (f) => d("close")),
                      id: "modal_component_OK"
                    }, [...i[5] || (i[5] = [
                      e("span", { style: { cursor: "pointer" } }, "OK", -1)
                    ])])
                  ]))
                ])
              ])
            ], 4)
          ])
        ])) : c("", !0)
      ]),
      _: 3
    }));
  }
}), F = { class: "notifications" }, q = { class: "z-50 position-top-right default-position-style-top-right" }, A = ["onClick"], U = /* @__PURE__ */ h({
  __name: "Notifications",
  setup(a) {
    const r = N(), d = (s) => {
      s && r.remove(s);
    };
    return (s, m) => (o(), l("div", F, [
      e("div", q, [
        (o(!0), l(z, null, H(n(r).notifications, (t) => (o(), l("div", {
          key: t.id,
          class: u(["z-50 notification default-notification-style", `default-notification-${t.type}`])
        }, [
          e("div", {
            class: u(["z-50 notification-content default-notification-style-content", `default-notification-${t.type}`])
          }, [
            v(s.$slots, "default", {}, () => [
              e("div", null, p(t.message), 1)
            ])
          ], 2),
          e("button", {
            class: u(["z-50 notification-button default-notification-style-button", `default-notification-${t.type}`]),
            onClick: (i) => d(t.id),
            "aria-label": "delete notification"
          }, " × ", 10, A)
        ], 2))), 128))
      ])
    ]));
  }
});
export {
  P as ErrorMessage,
  Q as Loading,
  R as Modal,
  U as Notifications
};
