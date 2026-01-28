import { defineComponent as h, createElementBlock as l, createCommentVNode as u, openBlock as n, normalizeClass as r, toDisplayString as p, createBlock as k, Transition as C, withCtx as b, unref as o, normalizeStyle as x, createElementVNode as s, computed as S, renderSlot as v, Fragment as z, renderList as H } from "vue";
import { u as L, a as M, b as N } from "../notificationStore-1ySYS_JF.js";
const B = ["id"], I = /* @__PURE__ */ h({
  __name: "ErrorMessage",
  props: {
    field: {},
    classObj: {},
    id: {}
  },
  setup(a) {
    return (d, c) => a.field?.validator?.message ? (n(), l("div", {
      key: a.field?.id,
      id: a.id ?? a.field?.id,
      class: r(["text-red-500", a.classObj])
    }, p(a.field?.validator?.message), 11, B)) : u("", !0);
  }
}), J = /* @__PURE__ */ h({
  __name: "Loading",
  props: {
    class: {},
    style: {}
  },
  setup(a) {
    const d = a, c = L();
    return (t, m) => (n(), k(C, { name: "loading-transition" }, {
      default: b(() => [
        o(c).isLoading ? (n(), l("div", {
          key: 0,
          class: r(["loading-page-manual element-animation", d.class]),
          style: x(d.style)
        }, [...m[0] || (m[0] = [
          s("div", { class: "element-animation__inner" }, [
            s("div", { class: "loader" })
          ], -1)
        ])], 6)) : u("", !0)
      ]),
      _: 1
    }));
  }
}), O = {
  key: 0,
  class: "modal-mask"
}, E = { class: "modal-wrapper" }, W = { class: "modal-header" }, T = ["innerHTML"], j = ["textContent"], K = { key: 0 }, V = { key: 1 }, P = /* @__PURE__ */ h({
  __name: "Modal",
  emits: ["yes", "no", "close"],
  setup(a, { emit: d }) {
    const c = d, t = M(), m = S(() => {
      const e = t.state.value, i = e.width, f = e.height, y = e.maxWidth, g = e.maxHeight, _ = e.minWidth, $ = e.minHeight, w = e.isScrollY;
      return (i ? `width:${i};` : "") + (f ? ` height:${f};` : "") + (y ? `max-width:${y};` : "") + (g ? ` max-height:${g};` : "") + (_ ? `min-width:${_};` : "") + ($ ? ` min-height:${$};` : "") + (w ? "overflow-y: scroll;" : "");
    });
    return (e, i) => (n(), k(C, { name: "modal" }, {
      default: b(() => [
        o(t).state.value.isOpen ? (n(), l("div", O, [
          s("div", E, [
            s("div", {
              class: r(["modal-container", o(t).state.value.containerClass]),
              style: x(m.value)
            }, [
              s("div", W, [
                v(e.$slots, "header")
              ]),
              s("div", {
                class: r(["modal-body is-size-6", o(t).state.value.bodyClass])
              }, [
                v(e.$slots, "body", {}, () => [
                  o(t).state.value.html ? (n(), l("div", {
                    key: 0,
                    innerHTML: o(t).state.value.html
                  }, null, 8, T)) : u("", !0),
                  o(t).state.value.message ? (n(), l("div", {
                    key: 1,
                    style: { "white-space": "pre-wrap" },
                    textContent: p(o(t).state.value.message)
                  }, null, 8, j)) : u("", !0)
                ])
              ], 2),
              s("div", {
                class: r(["modal-footer", o(t).state.value.footerClass])
              }, [
                v(e.$slots, "footer", {}, () => [
                  o(t).state.value.isConfirm ? (n(), l("div", K, [
                    s("a", {
                      class: r(["cursor-pointer modal-default-button", o(t).state.value.reverseButtons ? "is-left" : "is-right"]),
                      onClick: i[0] || (i[0] = (f) => c("yes"))
                    }, [...i[3] || (i[3] = [
                      s("span", { style: { cursor: "pointer" } }, "はい", -1)
                    ])], 2),
                    s("a", {
                      class: r(["cursor-pointer modal-default-button", o(t).state.value.reverseButtons ? "is-right" : "is-left"]),
                      onClick: i[1] || (i[1] = (f) => c("no"))
                    }, [...i[4] || (i[4] = [
                      s("span", { style: { cursor: "pointer" } }, "キャンセル", -1)
                    ])], 2)
                  ])) : u("", !0),
                  o(t).state.value.isConfirm ? u("", !0) : (n(), l("div", V, [
                    s("a", {
                      class: "cursor-pointer modal-default-button is-right",
                      onClick: i[2] || (i[2] = (f) => c("close")),
                      id: "modal_component_OK"
                    }, [...i[5] || (i[5] = [
                      s("span", { style: { cursor: "pointer" } }, "OK", -1)
                    ])])
                  ]))
                ])
              ], 2)
            ], 6)
          ])
        ])) : u("", !0)
      ]),
      _: 3
    }));
  }
}), Y = { class: "notifications" }, D = { class: "z-50 position-top-right default-position-style-top-right" }, F = ["onClick"], Q = /* @__PURE__ */ h({
  __name: "Notifications",
  setup(a) {
    const d = N(), c = (t) => {
      t && d.remove(t);
    };
    return (t, m) => (n(), l("div", Y, [
      s("div", D, [
        (n(!0), l(z, null, H(o(d).notifications, (e) => (n(), l("div", {
          key: e.id,
          class: r(["z-50 notification default-notification-style", `default-notification-${e.type}`])
        }, [
          s("div", {
            class: r(["z-50 notification-content default-notification-style-content", `default-notification-${e.type}`])
          }, [
            v(t.$slots, "default", {}, () => [
              s("div", null, p(e.message), 1)
            ])
          ], 2),
          s("button", {
            class: r(["z-50 notification-button default-notification-style-button", `default-notification-${e.type}`]),
            onClick: (i) => c(e.id),
            "aria-label": "delete notification"
          }, " × ", 10, F)
        ], 2))), 128))
      ])
    ]));
  }
});
export {
  I as ErrorMessage,
  J as Loading,
  P as Modal,
  Q as Notifications
};
