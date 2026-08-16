import { template as l, insert as a, effect as g, className as u, createComponent as d, delegateEvents as w, addEvent as b, style as p } from "@solidjs/web";
import { Show as v, createMemo as x, For as C } from "solid-js";
var S = /* @__PURE__ */ l("<div>");
function T(t) {
  return t.error ? (() => {
    var r = S();
    return a(r, () => t.error), g(() => `text-red-500 ${t.class ?? ""}`, (e, n) => {
      u(r, e, n);
    }), r;
  })() : null;
}
var k = /* @__PURE__ */ l('<div class="loading-page-manual element-animation"><div class=element-animation__inner><div class=loader>'), z = /* @__PURE__ */ l("<div>");
function Y(t) {
  var r = z();
  return a(r, d(v, {
    get when() {
      return t.store.isLoading();
    },
    get children() {
      return k();
    }
  })), r;
}
var H = /* @__PURE__ */ l("<div>"), L = /* @__PURE__ */ l("<div style=white-space:pre-wrap>"), M = /* @__PURE__ */ l('<button type=button class="cursor-pointer modal-default-button is-right"><span style=cursor:pointer>はい'), O = /* @__PURE__ */ l('<button type=button class="cursor-pointer modal-default-button is-left"><span style=cursor:pointer>キャンセル'), W = /* @__PURE__ */ l('<button type=button class="cursor-pointer modal-default-button is-right"id=modal_component_OK><span style=cursor:pointer>OK'), E = /* @__PURE__ */ l('<div class=modal-mask><div class=modal-wrapper><div class=modal-container><div class=modal-header></div><div class="modal-body is-size-6"><!><!></div><div class=modal-footer><!><!>');
function q(t) {
  const r = x(() => {
    const e = t.store.get();
    return [
      e.width ? `width:${e.width};` : "",
      e.height ? `height:${e.height};` : "",
      e.maxWidth ? `max-width:${e.maxWidth};` : "",
      e.maxHeight ? `max-height:${e.maxHeight};` : "",
      e.minWidth ? `min-width:${e.minWidth};` : "",
      e.minHeight ? `min-height:${e.minHeight};` : "",
      e.isScrollY ? "overflow-y: scroll;" : ""
    ].join("");
  });
  return d(v, {
    get when() {
      return t.store.get().isOpen;
    },
    get children() {
      var e = E(), n = e.firstChild, o = n.firstChild, s = o.firstChild, c = s.nextSibling, m = c.firstChild, _ = m.nextSibling, h = c.nextSibling, f = h.firstChild, $ = f.nextSibling;
      return a(c, d(v, {
        get when() {
          return t.store.get().html;
        },
        get children() {
          var i = H();
          return g(() => t.store.get().html, (y) => {
            i.innerHTML = y;
          }), i;
        }
      }), m), a(c, d(v, {
        get when() {
          return t.store.get().message;
        },
        get children() {
          var i = L();
          return a(i, () => t.store.get().message), i;
        }
      }), _), a(h, d(v, {
        get when() {
          return t.store.get().isConfirm;
        },
        get children() {
          return [(() => {
            var i = M();
            return b(i, "click", t.store.yes, !0), i;
          })(), (() => {
            var i = O();
            return b(i, "click", t.store.no, !0), i;
          })()];
        }
      }), f), a(h, d(v, {
        get when() {
          return !t.store.get().isConfirm;
        },
        get children() {
          var i = W();
          return b(i, "click", t.store.close, !0), i;
        }
      }), $), g(() => r(), (i, y) => {
        p(o, i, y);
      }), e;
    }
  });
}
w(["click"]);
var K = /* @__PURE__ */ l("<div><div>"), N = /* @__PURE__ */ l('<div aria-live=polite><div><div></div></div><button type=button aria-label="delete notification">&times;');
function A(t) {
  var r = K(), e = r.firstChild;
  return a(e, d(C, {
    get each() {
      return t.store.get().list;
    },
    children: (n) => (() => {
      var o = N(), s = o.firstChild, c = s.firstChild, m = s.nextSibling;
      return a(c, () => n.message), m.$$click = () => {
        n.id && t.store.remove(n.id);
      }, g(() => ({
        e: `z-50 notification default-notification-style default-notification-${n.type}`,
        t: `z-50 notification-content default-notification-style-content default-notification-${n.type}`,
        a: `z-50 notification-button default-notification-style-button default-notification-${n.type}`
      }), ({ e: _, t: h, a: f }, $) => {
        u(o, _, $?.e), u(s, h, $?.t), u(m, f, $?.a);
      }), o;
    })()
  })), g(() => ({
    e: `notifications ${t.class || ""}`,
    t: `z-50 position-top-right default-position-style-top-right ${t.position ? `position-${t.position}` : ""}`
  }), ({ e: n, t: o }, s) => {
    u(r, n, s?.e), u(e, o, s?.t);
  }), r;
}
w(["click"]);
export {
  T as ErrorMessage,
  Y as Loading,
  Y as LoadingOverlay,
  q as Modal,
  A as Notifications
};
