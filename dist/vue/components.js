import { defineComponent as v, createElementBlock as l, createCommentVNode as d, openBlock as n, normalizeClass as c, toDisplayString as _, createBlock as k, Transition as C, withCtx as b, unref as a, normalizeStyle as w, createElementVNode as e, computed as z, renderSlot as p, Fragment as H, renderList as L } from "vue";
import { u as M, a as N, b as x } from "../notificationStore-BJ6bZb9t.js";
const B = ["id"], P = /* @__PURE__ */ v({
  __name: "ErrorMessage",
  props: {
    field: {},
    classObj: {},
    id: {}
  },
  setup(f) {
    return (i, r) => i.field?.validator?.message ? (n(), l("div", {
      key: i.field?.id,
      id: i.id ?? i.field?.id,
      class: c(["text-red-500", i.classObj])
    }, _(i.field?.validator?.message), 11, B)) : d("", !0);
  }
}), Q = /* @__PURE__ */ v({
  __name: "Loading",
  props: {
    class: {},
    style: {}
  },
  setup(f) {
    const i = f, r = M();
    return (s, u) => (n(), k(C, { name: "loading-transition" }, {
      default: b(() => [
        a(r).isLoading ? (n(), l("div", {
          key: 0,
          class: c(["loading-page-manual element-animation", i.class]),
          style: w(i.style)
        }, [...u[0] || (u[0] = [
          e("div", { class: "element-animation__inner" }, [
            e("div", { class: "loader" })
          ], -1)
        ])], 6)) : d("", !0)
      ]),
      _: 1
    }));
  }
}), O = {
  key: 0,
  class: "modal-mask"
}, E = { class: "modal-wrapper" }, W = { class: "modal-header" }, T = { class: "modal-body is-size-6" }, j = ["innerHTML"], K = ["textContent"], V = { class: "modal-footer" }, Y = { key: 0 }, D = { key: 1 }, R = /* @__PURE__ */ v({
  __name: "Modal",
  emits: ["yes", "no", "close"],
  setup(f, { emit: i }) {
    const r = i, s = N(), u = z(() => {
      const t = s.state.value, o = t.width, m = t.height, h = t.maxWidth, y = t.maxHeight, g = t.minWidth, $ = t.minHeight, S = t.isScrollY;
      return (o ? `width:${o};` : "") + (m ? ` height:${m};` : "") + (h ? `max-width:${h};` : "") + (y ? ` max-height:${y};` : "") + (g ? `min-width:${g};` : "") + ($ ? ` min-height:${$};` : "") + (S ? "overflow-y: scroll;" : "");
    });
    return (t, o) => (n(), k(C, { name: "modal" }, {
      default: b(() => [
        a(s).state.value.isOpen ? (n(), l("div", O, [
          e("div", E, [
            e("div", {
              class: "modal-container",
              style: w(u.value)
            }, [
              e("div", W, [
                p(t.$slots, "header")
              ]),
              e("div", T, [
                p(t.$slots, "body", {}, () => [
                  a(s).state.value.html ? (n(), l("div", {
                    key: 0,
                    innerHTML: a(s).state.value.html
                  }, null, 8, j)) : d("", !0),
                  a(s).state.value.message ? (n(), l("div", {
                    key: 1,
                    style: { "white-space": "pre-wrap" },
                    textContent: _(a(s).state.value.message)
                  }, null, 8, K)) : d("", !0)
                ])
              ]),
              e("div", V, [
                p(t.$slots, "footer", {}, () => [
                  a(s).state.value.isConfirm ? (n(), l("div", Y, [
                    e("a", {
                      class: c(["cursor-pointer modal-default-button", a(s).state.value.reverseButtons ? "is-left" : "is-right"]),
                      onClick: o[0] || (o[0] = (m) => r("yes"))
                    }, [...o[3] || (o[3] = [
                      e("span", { style: { cursor: "pointer" } }, "はい", -1)
                    ])], 2),
                    e("a", {
                      class: c(["cursor-pointer modal-default-button", a(s).state.value.reverseButtons ? "is-right" : "is-left"]),
                      onClick: o[1] || (o[1] = (m) => r("no"))
                    }, [...o[4] || (o[4] = [
                      e("span", { style: { cursor: "pointer" } }, "キャンセル", -1)
                    ])], 2)
                  ])) : d("", !0),
                  a(s).state.value.isConfirm ? d("", !0) : (n(), l("div", D, [
                    e("a", {
                      class: "cursor-pointer modal-default-button is-right",
                      onClick: o[2] || (o[2] = (m) => r("close")),
                      id: "modal_component_OK"
                    }, [...o[5] || (o[5] = [
                      e("span", { style: { cursor: "pointer" } }, "OK", -1)
                    ])])
                  ]))
                ])
              ])
            ], 4)
          ])
        ])) : d("", !0)
      ]),
      _: 3
    }));
  }
}), F = { class: "notifications" }, q = { class: "z-50 position-top-right default-position-style-top-right" }, A = ["onClick"], U = /* @__PURE__ */ v({
  __name: "Notifications",
  setup(f) {
    const i = x(), r = (s) => {
      s && i.remove(s);
    };
    return (s, u) => (n(), l("div", F, [
      e("div", q, [
        (n(!0), l(H, null, L(a(i).notifications, (t) => (n(), l("div", {
          key: t.id,
          class: c(["z-50 notification default-notification-style", `default-notification-${t.type}`])
        }, [
          e("div", {
            class: c(["z-50 notification-content default-notification-style-content", `default-notification-${t.type}`])
          }, [
            p(s.$slots, "default", {}, () => [
              e("div", null, _(t.message), 1)
            ])
          ], 2),
          e("button", {
            class: c(["z-50 notification-button default-notification-style-button", `default-notification-${t.type}`]),
            onClick: (o) => r(t.id),
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
