import { sharedConfig as y, createRenderEffect as p, createComponent as m, Show as w, createMemo as H, For as M } from "solid-js";
import { l as P, m as g, d as O } from "../notificationStore-Cd0iqrIM.js";
function j(i, t, e) {
  let s = e.length, f = t.length, o = s, r = 0, n = 0, l = t[f - 1].nextSibling, d = null;
  for (; r < f || n < o; ) {
    if (t[r] === e[n]) {
      r++, n++;
      continue;
    }
    for (; t[f - 1] === e[o - 1]; )
      f--, o--;
    if (f === r) {
      const c = o < s ? n ? e[n - 1].nextSibling : e[o - n] : l;
      for (; n < o; ) i.insertBefore(e[n++], c);
    } else if (o === n)
      for (; r < f; )
        (!d || !d.has(t[r])) && t[r].remove(), r++;
    else if (t[r] === e[o - 1] && e[n] === t[f - 1]) {
      const c = t[--f].nextSibling;
      i.insertBefore(e[n++], t[r++].nextSibling), i.insertBefore(e[--o], c), t[f] = e[o];
    } else {
      if (!d) {
        d = /* @__PURE__ */ new Map();
        let a = n;
        for (; a < o; ) d.set(e[a], a++);
      }
      const c = d.get(t[r]);
      if (c != null)
        if (n < c && c < o) {
          let a = r, h = 1, b;
          for (; ++a < f && a < o && !((b = d.get(t[a])) == null || b !== c + h); )
            h++;
          if (h > c - n) {
            const x = t[r];
            for (; n < c; ) i.insertBefore(e[n++], x);
          } else i.replaceChild(e[n++], t[r++]);
        } else r++;
      else t[r++].remove();
    }
  }
}
const E = "_$DX_DELEGATE";
function u(i, t, e, s) {
  let f;
  const o = () => {
    const n = document.createElement("template");
    return n.innerHTML = i, n.content.firstChild;
  }, r = () => (f || (f = o())).cloneNode(!0);
  return r.cloneNode = r, r;
}
function B(i, t = window.document) {
  const e = t[E] || (t[E] = /* @__PURE__ */ new Set());
  for (let s = 0, f = i.length; s < f; s++) {
    const o = i[s];
    e.has(o) || (e.add(o), t.addEventListener(o, I));
  }
}
function D(i, t, e) {
  v(i) || i.removeAttribute(t);
}
function C(i, t) {
  v(i) || (t == null ? i.removeAttribute("class") : i.className = t);
}
function A(i, t, e, s) {
  Array.isArray(e) ? (i[`$$${t}`] = e[0], i[`$$${t}Data`] = e[1]) : i[`$$${t}`] = e;
}
function G(i, t, e) {
  if (!t) return e ? D(i, "style") : t;
  const s = i.style;
  if (typeof t == "string") return s.cssText = t;
  typeof e == "string" && (s.cssText = e = void 0), e || (e = {}), t || (t = {});
  let f, o;
  for (o in e)
    t[o] == null && s.removeProperty(o), delete e[o];
  for (o in t)
    f = t[o], f !== e[o] && (s.setProperty(o, f), e[o] = f);
  return e;
}
function $(i, t, e, s) {
  if (e !== void 0 && !s && (s = []), typeof t != "function") return S(i, t, s, e);
  p((f) => S(i, t(), f, e), s);
}
function v(i) {
  return !!y.context && !y.done && (!i || i.isConnected);
}
function I(i) {
  if (y.registry && y.events && y.events.find(([l, d]) => d === i))
    return;
  let t = i.target;
  const e = `$$${i.type}`, s = i.target, f = i.currentTarget, o = (l) => Object.defineProperty(i, "target", {
    configurable: !0,
    value: l
  }), r = () => {
    const l = t[e];
    if (l && !t.disabled) {
      const d = t[`${e}Data`];
      if (d !== void 0 ? l.call(t, d, i) : l.call(t, i), i.cancelBubble) return;
    }
    return t.host && typeof t.host != "string" && !t.host._$host && t.contains(i.target) && o(t.host), !0;
  }, n = () => {
    for (; r() && (t = t._$host || t.parentNode || t.host); ) ;
  };
  if (Object.defineProperty(i, "currentTarget", {
    configurable: !0,
    get() {
      return t || document;
    }
  }), y.registry && !y.done && (y.done = _$HY.done = !0), i.composedPath) {
    const l = i.composedPath();
    o(l[0]);
    for (let d = 0; d < l.length - 2 && (t = l[d], !!r()); d++) {
      if (t._$host) {
        t = t._$host, n();
        break;
      }
      if (t.parentNode === f)
        break;
    }
  } else n();
  o(s);
}
function S(i, t, e, s, f) {
  const o = v(i);
  if (o) {
    !e && (e = [...i.childNodes]);
    let l = [];
    for (let d = 0; d < e.length; d++) {
      const c = e[d];
      c.nodeType === 8 && c.data.slice(0, 2) === "!$" ? c.remove() : l.push(c);
    }
    e = l;
  }
  for (; typeof e == "function"; ) e = e();
  if (t === e) return e;
  const r = typeof t, n = s !== void 0;
  if (i = n && e[0] && e[0].parentNode || i, r === "string" || r === "number") {
    if (o || r === "number" && (t = t.toString(), t === e))
      return e;
    if (n) {
      let l = e[0];
      l && l.nodeType === 3 ? l.data !== t && (l.data = t) : l = document.createTextNode(t), e = _(i, e, s, l);
    } else
      e !== "" && typeof e == "string" ? e = i.firstChild.data = t : e = i.textContent = t;
  } else if (t == null || r === "boolean") {
    if (o) return e;
    e = _(i, e, s);
  } else {
    if (r === "function")
      return p(() => {
        let l = t();
        for (; typeof l == "function"; ) l = l();
        e = S(i, l, e, s);
      }), () => e;
    if (Array.isArray(t)) {
      const l = [], d = e && Array.isArray(e);
      if (T(l, t, e, f))
        return p(() => e = S(i, l, e, s, !0)), () => e;
      if (o) {
        if (!l.length) return e;
        if (s === void 0) return e = [...i.childNodes];
        let c = l[0];
        if (c.parentNode !== i) return e;
        const a = [c];
        for (; (c = c.nextSibling) !== s; ) a.push(c);
        return e = a;
      }
      if (l.length === 0) {
        if (e = _(i, e, s), n) return e;
      } else d ? e.length === 0 ? L(i, l, s) : j(i, e, l) : (e && _(i), L(i, l));
      e = l;
    } else if (t.nodeType) {
      if (o && t.parentNode) return e = n ? [t] : t;
      if (Array.isArray(e)) {
        if (n) return e = _(i, e, s, t);
        _(i, e, null, t);
      } else e == null || e === "" || !i.firstChild ? i.appendChild(t) : i.replaceChild(t, i.firstChild);
      e = t;
    }
  }
  return e;
}
function T(i, t, e, s) {
  let f = !1;
  for (let o = 0, r = t.length; o < r; o++) {
    let n = t[o], l = e && e[i.length], d;
    if (!(n == null || n === !0 || n === !1)) if ((d = typeof n) == "object" && n.nodeType)
      i.push(n);
    else if (Array.isArray(n))
      f = T(i, n, l) || f;
    else if (d === "function")
      if (s) {
        for (; typeof n == "function"; ) n = n();
        f = T(i, Array.isArray(n) ? n : [n], Array.isArray(l) ? l : [l]) || f;
      } else
        i.push(n), f = !0;
    else {
      const c = String(n);
      l && l.nodeType === 3 && l.data === c ? i.push(l) : i.push(document.createTextNode(c));
    }
  }
  return f;
}
function L(i, t, e = null) {
  for (let s = 0, f = t.length; s < f; s++) i.insertBefore(t[s], e);
}
function _(i, t, e, s) {
  if (e === void 0) return i.textContent = "";
  const f = s || document.createTextNode("");
  if (t.length) {
    let o = !1;
    for (let r = t.length - 1; r >= 0; r--) {
      const n = t[r];
      if (f !== n) {
        const l = n.parentNode === i;
        !o && !r ? l ? i.replaceChild(f, n) : i.insertBefore(f, e) : l && n.remove();
      } else o = !0;
    }
  } else i.insertBefore(f, e);
  return [f];
}
var K = /* @__PURE__ */ u('<div class="loading-page-manual element-animation"><div class=element-animation__inner><div class=loader>'), V = /* @__PURE__ */ u("<div>");
function Q() {
  return (() => {
    var i = V();
    return $(i, m(w, {
      get when() {
        return P.isLoading();
      },
      get children() {
        return K();
      }
    })), i;
  })();
}
var W = /* @__PURE__ */ u("<div>"), Y = /* @__PURE__ */ u("<div style=white-space:pre-wrap>"), q = /* @__PURE__ */ u('<button type=button class="cursor-pointer modal-default-button is-right"><span style=cursor:pointer>はい'), F = /* @__PURE__ */ u('<button type=button class="cursor-pointer modal-default-button is-left"><span style=cursor:pointer>キャンセル'), R = /* @__PURE__ */ u('<button type=button class="cursor-pointer modal-default-button is-right"id=modal_component_OK><span style=cursor:pointer>OK'), U = /* @__PURE__ */ u('<div class=modal-mask><div class=modal-wrapper><div class=modal-container><div class=modal-header></div><div class="modal-body is-size-6"></div><div class=modal-footer>');
function Z() {
  const i = H(() => {
    const {
      width: t,
      height: e,
      maxWidth: s,
      maxHeight: f,
      minWidth: o,
      minHeight: r,
      isScrollY: n
    } = g.get();
    return [t ? `width:${t};` : "", e ? `height:${e};` : "", s ? `max-width:${s};` : "", f ? `max-height:${f};` : "", o ? `min-width:${o};` : "", r ? `min-height:${r};` : "", n ? "overflow-y: scroll;" : ""].join("");
  });
  return m(w, {
    get when() {
      return g.get().isOpen;
    },
    get children() {
      var t = U(), e = t.firstChild, s = e.firstChild, f = s.firstChild, o = f.nextSibling, r = o.nextSibling;
      return $(o, m(w, {
        get when() {
          return g.get().html;
        },
        get children() {
          var n = W();
          return p(() => n.innerHTML = g.get().html), n;
        }
      }), null), $(o, m(w, {
        get when() {
          return g.get().message;
        },
        get children() {
          var n = Y();
          return $(n, () => g.get().message), n;
        }
      }), null), $(r, m(w, {
        get when() {
          return g.get().isConfirm;
        },
        get children() {
          return [(() => {
            var n = q();
            return A(n, "click", g.yes), n;
          })(), (() => {
            var n = F();
            return A(n, "click", g.no), n;
          })()];
        }
      }), null), $(r, m(w, {
        get when() {
          return !g.get().isConfirm;
        },
        get children() {
          var n = R();
          return A(n, "click", g.close), n;
        }
      }), null), p((n) => G(s, i(), n)), t;
    }
  });
}
B(["click"]);
var X = /* @__PURE__ */ u("<div class=notifications><div>"), k = /* @__PURE__ */ u('<div><div><pre></pre></div><button type=button aria-label="delete notification">&times;');
function ee(i) {
  const t = () => i.store ?? O, e = () => t()?.get?.()?.list ?? [], s = () => i.position ?? "top-right", f = (o) => {
    o != null && t().remove?.(o);
  };
  return (() => {
    var o = X(), r = o.firstChild;
    return $(r, m(M, {
      get each() {
        return e();
      },
      children: (n) => (() => {
        var l = k(), d = l.firstChild, c = d.firstChild, a = d.nextSibling;
        return $(c, () => n.message), a.$$click = () => f(n.id), p((h) => {
          var b = `z-50 notification default-notification-style default-notification-${n.type}`, x = `z-50 notification-content default-notification-style-content default-notification-${n.type}`, N = `z-50 notification-button default-notification-style-button default-notification-${n.type}`;
          return b !== h.e && C(l, h.e = b), x !== h.t && C(d, h.t = x), N !== h.a && C(a, h.a = N), h;
        }, {
          e: void 0,
          t: void 0,
          a: void 0
        }), l;
      })()
    })), p(() => C(r, `z-50 position-${s()} default-position-style-${s()}`)), o;
  })();
}
B(["click"]);
export {
  Q as Loading,
  Z as Modal,
  ee as Notifications
};
