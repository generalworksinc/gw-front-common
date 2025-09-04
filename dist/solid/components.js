import { createRenderEffect as $, sharedConfig as T, createComponent as y, Show as _, createMemo as E, For as B } from "solid-js";
import { l as M, m as a, n as H } from "../notificationStore-C3twEqoD.js";
function O(i, t, e) {
  let s = e.length, l = t.length, o = s, f = 0, n = 0, d = t[l - 1].nextSibling, h = null;
  for (; f < l || n < o; ) {
    if (t[f] === e[n]) {
      f++, n++;
      continue;
    }
    for (; t[l - 1] === e[o - 1]; )
      l--, o--;
    if (l === f) {
      const r = o < s ? n ? e[n - 1].nextSibling : e[o - n] : d;
      for (; n < o; ) i.insertBefore(e[n++], r);
    } else if (o === n)
      for (; f < l; )
        (!h || !h.has(t[f])) && t[f].remove(), f++;
    else if (t[f] === e[o - 1] && e[n] === t[l - 1]) {
      const r = t[--l].nextSibling;
      i.insertBefore(e[n++], t[f++].nextSibling), i.insertBefore(e[--o], r), t[l] = e[o];
    } else {
      if (!h) {
        h = /* @__PURE__ */ new Map();
        let c = n;
        for (; c < o; ) h.set(e[c], c++);
      }
      const r = h.get(t[f]);
      if (r != null)
        if (n < r && r < o) {
          let c = f, g = 1, w;
          for (; ++c < l && c < o && !((w = h.get(t[c])) == null || w !== r + g); )
            g++;
          if (g > r - n) {
            const x = t[f];
            for (; n < r; ) i.insertBefore(e[n++], x);
          } else i.replaceChild(e[n++], t[f++]);
        } else f++;
      else t[f++].remove();
    }
  }
}
function u(i, t, e, s) {
  let l;
  const o = () => {
    const n = document.createElement("template");
    return n.innerHTML = i, n.content.firstChild;
  }, f = () => (l || (l = o())).cloneNode(!0);
  return f.cloneNode = f, f;
}
function P(i, t, e) {
  v(i) || i.removeAttribute(t);
}
function C(i, t) {
  v(i) || (t == null ? i.removeAttribute("class") : i.className = t);
}
function A(i, t, e, s) {
  if (Array.isArray(e)) {
    const l = e[0];
    i.addEventListener(t, e[0] = (o) => l.call(i, e[1], o));
  } else i.addEventListener(t, e, typeof e != "function" && e);
}
function j(i, t, e) {
  if (!t) return e ? P(i, "style") : t;
  const s = i.style;
  if (typeof t == "string") return s.cssText = t;
  typeof e == "string" && (s.cssText = e = void 0), e || (e = {}), t || (t = {});
  let l, o;
  for (o in e)
    t[o] == null && s.removeProperty(o), delete e[o];
  for (o in t)
    l = t[o], l !== e[o] && (s.setProperty(o, l), e[o] = l);
  return e;
}
function m(i, t, e, s) {
  if (e !== void 0 && !s && (s = []), typeof t != "function") return b(i, t, s, e);
  $((l) => b(i, t(), l, e), s);
}
function v(i) {
  return !!T.context && !T.done && (!i || i.isConnected);
}
function b(i, t, e, s, l) {
  const o = v(i);
  if (o) {
    !e && (e = [...i.childNodes]);
    let d = [];
    for (let h = 0; h < e.length; h++) {
      const r = e[h];
      r.nodeType === 8 && r.data.slice(0, 2) === "!$" ? r.remove() : d.push(r);
    }
    e = d;
  }
  for (; typeof e == "function"; ) e = e();
  if (t === e) return e;
  const f = typeof t, n = s !== void 0;
  if (i = n && e[0] && e[0].parentNode || i, f === "string" || f === "number") {
    if (o || f === "number" && (t = t.toString(), t === e))
      return e;
    if (n) {
      let d = e[0];
      d && d.nodeType === 3 ? d.data !== t && (d.data = t) : d = document.createTextNode(t), e = p(i, e, s, d);
    } else
      e !== "" && typeof e == "string" ? e = i.firstChild.data = t : e = i.textContent = t;
  } else if (t == null || f === "boolean") {
    if (o) return e;
    e = p(i, e, s);
  } else {
    if (f === "function")
      return $(() => {
        let d = t();
        for (; typeof d == "function"; ) d = d();
        e = b(i, d, e, s);
      }), () => e;
    if (Array.isArray(t)) {
      const d = [], h = e && Array.isArray(e);
      if (S(d, t, e, l))
        return $(() => e = b(i, d, e, s, !0)), () => e;
      if (o) {
        if (!d.length) return e;
        if (s === void 0) return e = [...i.childNodes];
        let r = d[0];
        if (r.parentNode !== i) return e;
        const c = [r];
        for (; (r = r.nextSibling) !== s; ) c.push(r);
        return e = c;
      }
      if (d.length === 0) {
        if (e = p(i, e, s), n) return e;
      } else h ? e.length === 0 ? L(i, d, s) : O(i, e, d) : (e && p(i), L(i, d));
      e = d;
    } else if (t.nodeType) {
      if (o && t.parentNode) return e = n ? [t] : t;
      if (Array.isArray(e)) {
        if (n) return e = p(i, e, s, t);
        p(i, e, null, t);
      } else e == null || e === "" || !i.firstChild ? i.appendChild(t) : i.replaceChild(t, i.firstChild);
      e = t;
    }
  }
  return e;
}
function S(i, t, e, s) {
  let l = !1;
  for (let o = 0, f = t.length; o < f; o++) {
    let n = t[o], d = e && e[i.length], h;
    if (!(n == null || n === !0 || n === !1)) if ((h = typeof n) == "object" && n.nodeType)
      i.push(n);
    else if (Array.isArray(n))
      l = S(i, n, d) || l;
    else if (h === "function")
      if (s) {
        for (; typeof n == "function"; ) n = n();
        l = S(i, Array.isArray(n) ? n : [n], Array.isArray(d) ? d : [d]) || l;
      } else
        i.push(n), l = !0;
    else {
      const r = String(n);
      d && d.nodeType === 3 && d.data === r ? i.push(d) : i.push(document.createTextNode(r));
    }
  }
  return l;
}
function L(i, t, e = null) {
  for (let s = 0, l = t.length; s < l; s++) i.insertBefore(t[s], e);
}
function p(i, t, e, s) {
  if (e === void 0) return i.textContent = "";
  const l = s || document.createTextNode("");
  if (t.length) {
    let o = !1;
    for (let f = t.length - 1; f >= 0; f--) {
      const n = t[f];
      if (l !== n) {
        const d = n.parentNode === i;
        !o && !f ? d ? i.replaceChild(l, n) : i.insertBefore(l, e) : d && n.remove();
      } else o = !0;
    }
  } else i.insertBefore(l, e);
  return [l];
}
var F = /* @__PURE__ */ u('<div class="loading-page-manual element-animation"><div class=element-animation__inner><div class=loader>'), I = /* @__PURE__ */ u("<div>");
function Q() {
  return (() => {
    var i = I();
    return m(i, y(_, {
      get when() {
        return M.isLoading();
      },
      get children() {
        return F();
      }
    })), i;
  })();
}
var K = /* @__PURE__ */ u("<div>"), W = /* @__PURE__ */ u("<div style=white-space:pre-wrap>"), q = /* @__PURE__ */ u('<button type=button class="cursor-pointer modal-default-button is-right"><span style=cursor:pointer>はい'), G = /* @__PURE__ */ u('<button type=button class="cursor-pointer modal-default-button is-left"><span style=cursor:pointer>キャンセル'), R = /* @__PURE__ */ u('<button type=button class="cursor-pointer modal-default-button is-right"id=modal_component_OK><span style=cursor:pointer>OK'), V = /* @__PURE__ */ u('<div class=modal-mask><div class=modal-wrapper><div class=modal-container><div class=modal-header></div><div class="modal-body is-size-6"></div><div class=modal-footer>');
function U() {
  const i = E(() => {
    const {
      width: t,
      height: e,
      maxWidth: s,
      maxHeight: l,
      minWidth: o,
      minHeight: f,
      isScrollY: n
    } = a.get();
    return [t ? `width:${t};` : "", e ? `height:${e};` : "", s ? `max-width:${s};` : "", l ? `max-height:${l};` : "", o ? `min-width:${o};` : "", f ? `min-height:${f};` : "", n ? "overflow-y: scroll;" : ""].join("");
  });
  return y(_, {
    get when() {
      return a.get().isOpen;
    },
    get children() {
      var t = V(), e = t.firstChild, s = e.firstChild, l = s.firstChild, o = l.nextSibling, f = o.nextSibling;
      return m(o, y(_, {
        get when() {
          return a.get().html;
        },
        get children() {
          var n = K();
          return $(() => n.innerHTML = a.get().html), n;
        }
      }), null), m(o, y(_, {
        get when() {
          return a.get().message;
        },
        get children() {
          var n = W();
          return m(n, () => a.get().message), n;
        }
      }), null), m(f, y(_, {
        get when() {
          return a.get().isConfirm;
        },
        get children() {
          return [(() => {
            var n = q();
            return A(n, "click", a.yes), n;
          })(), (() => {
            var n = G();
            return A(n, "click", a.no), n;
          })()];
        }
      }), null), m(f, y(_, {
        get when() {
          return !a.get().isConfirm;
        },
        get children() {
          var n = R();
          return A(n, "click", a.close), n;
        }
      }), null), $((n) => j(s, i(), n)), t;
    }
  });
}
var Y = /* @__PURE__ */ u("<div class=notifications><div>"), z = /* @__PURE__ */ u('<div><div><pre></pre></div><button type=button aria-label="delete notification">&times;');
function X(i) {
  const t = () => i.store ?? H, e = () => t()?.get?.()?.list ?? [], s = () => i.position ?? "top-right", l = (o) => {
    o != null && t().remove?.(o);
  };
  return (() => {
    var o = Y(), f = o.firstChild;
    return m(f, y(B, {
      get each() {
        return e();
      },
      children: (n) => (() => {
        var d = z(), h = d.firstChild, r = h.firstChild, c = h.nextSibling;
        return m(r, () => n.message), c.addEventListener("click", () => l(n.id)), $((g) => {
          var w = `z-50 notification default-notification-style default-notification-${n.type}`, x = `z-50 notification-content default-notification-style-content default-notification-${n.type}`, N = `z-50 notification-button default-notification-style-button default-notification-${n.type}`;
          return w !== g.e && C(d, g.e = w), x !== g.t && C(h, g.t = x), N !== g.a && C(c, g.a = N), g;
        }, {
          e: void 0,
          t: void 0,
          a: void 0
        }), d;
      })()
    })), $(() => C(f, `z-50 position-${s()} default-position-style-${s()}`)), o;
  })();
}
export {
  Q as Loading,
  U as Modal,
  X as Notifications
};
