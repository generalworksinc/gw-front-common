import { defineComponent as p, createElementBlock as r, createCommentVNode as u, openBlock as a, normalizeClass as l, toDisplayString as h, createBlock as k, Transition as C, withCtx as b, unref as o, normalizeStyle as x, createElementVNode as s, computed as S, renderSlot as v, Fragment as z, renderList as H } from "vue";
import { u as L, a as M, b as N } from "../notificationStore-CM2HcRFy.js";
const B = ["id"], G = /* @__PURE__ */ p({
  __name: "ErrorMessage",
  props: {
    field: {},
    classObj: {},
    id: {}
  },
  setup(n) {
    return (d, c) => n.field?.validator?.message ? (a(), r("div", {
      key: n.field?.id,
      id: n.id ?? n.field?.id,
      class: l(["text-red-500", n.classObj])
    }, h(n.field?.validator?.message), 11, B)) : u("", !0);
  }
}), I = /* @__PURE__ */ p({
  __name: "Loading",
  props: {
    class: {},
    style: {}
  },
  setup(n) {
    const d = n, c = L();
    return (t, m) => (a(), k(C, { name: "loading-transition" }, {
      default: b(() => [
        o(c).isLoading ? (a(), r("div", {
          key: 0,
          class: l(["loading-page-manual element-animation", d.class]),
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
}, E = { class: "modal-wrapper" }, W = { class: "modal-header" }, T = ["innerHTML"], j = ["textContent"], K = { key: 0 }, V = { key: 1 }, J = /* @__PURE__ */ p({
  __name: "Modal",
  emits: ["yes", "no", "close"],
  setup(n, { emit: d }) {
    const c = d, t = M(), m = S(() => {
      const e = t.state.value, i = e.width, f = e.height, y = e.maxWidth, g = e.maxHeight, $ = e.minWidth, _ = e.minHeight, w = e.isScrollY;
      return (i ? `width:${i};` : "") + (f ? ` height:${f};` : "") + (y ? `max-width:${y};` : "") + (g ? ` max-height:${g};` : "") + ($ ? `min-width:${$};` : "") + (_ ? ` min-height:${_};` : "") + (w ? "overflow-y: scroll;" : "");
    });
    return (e, i) => (a(), k(C, { name: "modal" }, {
      default: b(() => [
        o(t).state.value.isOpen ? (a(), r("div", O, [
          s("div", E, [
            s("div", {
              class: l(["modal-container", o(t).state.value.containerClass]),
              style: x(m.value)
            }, [
              s("div", W, [
                v(e.$slots, "header")
              ]),
              s("div", {
                class: l(["modal-body is-size-6", o(t).state.value.bodyClass])
              }, [
                v(e.$slots, "body", {}, () => [
                  o(t).state.value.html ? (a(), r("div", {
                    key: 0,
                    innerHTML: o(t).state.value.html
                  }, null, 8, T)) : u("", !0),
                  o(t).state.value.message ? (a(), r("div", {
                    key: 1,
                    style: { "white-space": "pre-wrap" },
                    textContent: h(o(t).state.value.message)
                  }, null, 8, j)) : u("", !0)
                ])
              ], 2),
              s("div", {
                class: l(["modal-footer", o(t).state.value.footerClass])
              }, [
                v(e.$slots, "footer", {}, () => [
                  o(t).state.value.isConfirm ? (a(), r("div", K, [
                    s("a", {
                      class: l(["cursor-pointer modal-default-button", o(t).state.value.reverseButtons ? "is-left" : "is-right"]),
                      onClick: i[0] || (i[0] = (f) => c("yes"))
                    }, [...i[3] || (i[3] = [
                      s("span", { style: { cursor: "pointer" } }, "はい", -1)
                    ])], 2),
                    s("a", {
                      class: l(["cursor-pointer modal-default-button", o(t).state.value.reverseButtons ? "is-right" : "is-left"]),
                      onClick: i[1] || (i[1] = (f) => c("no"))
                    }, [...i[4] || (i[4] = [
                      s("span", { style: { cursor: "pointer" } }, "キャンセル", -1)
                    ])], 2)
                  ])) : u("", !0),
                  o(t).state.value.isConfirm ? u("", !0) : (a(), r("div", V, [
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
}), Y = { class: "notifications" }, D = ["onClick"], P = /* @__PURE__ */ p({
  __name: "Notifications",
  props: {
    position: {}
  },
  setup(n) {
    const d = N(), c = (t) => {
      t && d.remove(t);
    };
    return (t, m) => (a(), r("div", Y, [
      s("div", {
        class: l(["z-50 position-top-right default-position-style-top-right", n.position ? `position-${n.position}` : ""])
      }, [
        (a(!0), r(z, null, H(o(d).notifications, (e) => (a(), r("div", {
          key: e.id,
          class: l(["z-50 notification default-notification-style", `default-notification-${e.type}`])
        }, [
          s("div", {
            class: l(["z-50 notification-content default-notification-style-content", `default-notification-${e.type}`])
          }, [
            v(t.$slots, "default", {}, () => [
              s("div", null, h(e.message), 1)
            ])
          ], 2),
          s("button", {
            class: l(["z-50 notification-button default-notification-style-button", `default-notification-${e.type}`]),
            onClick: (i) => c(e.id),
            "aria-label": "delete notification"
          }, " × ", 10, D)
        ], 2))), 128))
      ], 2)
    ]));
  }
});
export {
  G as ErrorMessage,
  I as Loading,
  J as Modal,
  P as Notifications
};
