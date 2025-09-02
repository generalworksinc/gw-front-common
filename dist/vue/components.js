import { defineComponent as _, createElementBlock as a, createCommentVNode as d, openBlock as n, normalizeClass as m, toDisplayString as v, createBlock as k, Transition as C, withCtx as b, unref as l, normalizeStyle as w, createElementVNode as e, computed as z, renderSlot as p, Fragment as H, renderList as L } from "vue";
import { u as M, a as N, b as x } from "../notificationStore-Ceh-rjGw.js";
const O = ["id"], P = /* @__PURE__ */ _({
  __name: "ErrorMessage",
  props: {
    field: {},
    classObj: {},
    id: {}
  },
  setup(f) {
    return (o, r) => o.field?.validator?.message ? (n(), a("div", {
      key: o.field?.id,
      id: o.id ?? o.field?.id,
      class: m(["text-red-500", o.classObj])
    }, v(o.field?.validator?.message), 11, O)) : d("", !0);
  }
}), Q = /* @__PURE__ */ _({
  __name: "Loading",
  props: {
    class: {},
    style: {}
  },
  setup(f) {
    const o = f, r = M();
    return (i, c) => (n(), k(C, { name: "loading-transition" }, {
      default: b(() => [
        l(r).isLoading ? (n(), a("div", {
          key: 0,
          class: m(["loading-page-manual element-animation", o.class]),
          style: w(o.style)
        }, [...c[0] || (c[0] = [
          e("div", { class: "element-animation__inner" }, [
            e("div", { class: "loader" })
          ], -1)
        ])], 6)) : d("", !0)
      ]),
      _: 1
    }));
  }
}), E = {
  key: 0,
  class: "modal-mask"
}, W = { class: "modal-wrapper" }, B = { class: "modal-header" }, T = { class: "modal-body is-size-6" }, j = ["innerHTML"], K = ["textContent"], V = { class: "modal-footer" }, Y = { key: 0 }, D = { key: 1 }, R = /* @__PURE__ */ _({
  __name: "Modal",
  emits: ["yes", "no", "close"],
  setup(f, { emit: o }) {
    const r = o, i = N(), c = z(() => {
      const t = i.state.value, s = t.width, u = t.height, h = t.maxWidth, y = t.maxHeight, g = t.minWidth, $ = t.minHeight, S = t.isScrollY;
      return (s ? "width:" + s + ";" : "") + (u ? " height:" + u + ";" : "") + (h ? "max-width:" + h + ";" : "") + (y ? " max-height:" + y + ";" : "") + (g ? "min-width:" + g + ";" : "") + ($ ? " min-height:" + $ + ";" : "") + (S ? "overflow-y: scroll;" : "");
    });
    return (t, s) => (n(), k(C, { name: "modal" }, {
      default: b(() => [
        l(i).state.value.isOpen ? (n(), a("div", E, [
          e("div", W, [
            e("div", {
              class: "modal-container",
              style: w(c.value)
            }, [
              e("div", B, [
                p(t.$slots, "header")
              ]),
              e("div", T, [
                p(t.$slots, "body", {}, () => [
                  l(i).state.value.html ? (n(), a("div", {
                    key: 0,
                    innerHTML: l(i).state.value.html
                  }, null, 8, j)) : d("", !0),
                  l(i).state.value.message ? (n(), a("div", {
                    key: 1,
                    style: { "white-space": "pre-wrap" },
                    textContent: v(l(i).state.value.message)
                  }, null, 8, K)) : d("", !0)
                ])
              ]),
              e("div", V, [
                p(t.$slots, "footer", {}, () => [
                  l(i).state.value.isConfirm ? (n(), a("div", Y, [
                    e("a", {
                      class: "cursor-pointer modal-default-button is-right",
                      onClick: s[0] || (s[0] = (u) => r("yes"))
                    }, [...s[3] || (s[3] = [
                      e("span", { style: { cursor: "pointer" } }, "はい", -1)
                    ])]),
                    e("a", {
                      class: "cursor-pointer modal-default-button is-left",
                      onClick: s[1] || (s[1] = (u) => r("no"))
                    }, [...s[4] || (s[4] = [
                      e("span", { style: { cursor: "pointer" } }, "キャンセル", -1)
                    ])])
                  ])) : d("", !0),
                  l(i).state.value.isConfirm ? d("", !0) : (n(), a("div", D, [
                    e("a", {
                      class: "cursor-pointer modal-default-button is-right",
                      onClick: s[2] || (s[2] = (u) => r("close")),
                      id: "modal_component_OK"
                    }, [...s[5] || (s[5] = [
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
}), F = { class: "notifications" }, q = { class: "z-50 position-top-right default-position-style-top-right" }, A = ["onClick"], U = /* @__PURE__ */ _({
  __name: "Notifications",
  setup(f) {
    const o = x(), r = (i) => {
      i && o.remove(i);
    };
    return (i, c) => (n(), a("div", F, [
      e("div", q, [
        (n(!0), a(H, null, L(l(o).notifications, (t) => (n(), a("div", {
          key: t.id,
          class: m(["z-50 notification default-notification-style", `default-notification-${t.type}`]),
          role: "status",
          "aria-live": "polite"
        }, [
          e("div", {
            class: m(["z-50 notification-content default-notification-style-content", `default-notification-${t.type}`])
          }, [
            p(i.$slots, "default", {}, () => [
              e("pre", null, v(t.message), 1)
            ])
          ], 2),
          e("button", {
            class: m(["z-50 notification-button default-notification-style-button", `default-notification-${t.type}`]),
            onClick: (s) => r(t.id),
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
