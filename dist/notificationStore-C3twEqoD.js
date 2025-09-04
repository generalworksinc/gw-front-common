import { $PROXY as y, batch as G, $TRACK as E, getListener as N, createSignal as L } from "solid-js";
const T = Symbol("store-raw"), F = Symbol("store-node"), m = Symbol("store-has"), M = Symbol("store-self");
function z(n) {
  let e = n[y];
  if (!e && (Object.defineProperty(n, y, {
    value: e = new Proxy(n, U)
  }), !Array.isArray(n))) {
    const l = Object.keys(n), t = Object.getOwnPropertyDescriptors(n);
    for (let s = 0, i = l.length; s < i; s++) {
      const f = l[s];
      t[f].get && Object.defineProperty(n, f, {
        enumerable: t[f].enumerable,
        get: t[f].get.bind(e)
      });
    }
  }
  return e;
}
function S(n) {
  let e;
  return n != null && typeof n == "object" && (n[y] || !(e = Object.getPrototypeOf(n)) || e === Object.prototype || Array.isArray(n));
}
function $(n, e = /* @__PURE__ */ new Set()) {
  let l, t, s, i;
  if (l = n != null && n[T]) return l;
  if (!S(n) || e.has(n)) return n;
  if (Array.isArray(n)) {
    Object.isFrozen(n) ? n = n.slice(0) : e.add(n);
    for (let f = 0, h = n.length; f < h; f++)
      s = n[f], (t = $(s, e)) !== s && (n[f] = t);
  } else {
    Object.isFrozen(n) ? n = Object.assign({}, n) : e.add(n);
    const f = Object.keys(n), h = Object.getOwnPropertyDescriptors(n);
    for (let u = 0, c = f.length; u < c; u++)
      i = f[u], !h[i].get && (s = n[i], (t = $(s, e)) !== s && (n[i] = t));
  }
  return n;
}
function K(n, e) {
  let l = n[e];
  return l || Object.defineProperty(n, e, {
    value: l = /* @__PURE__ */ Object.create(null)
  }), l;
}
function H(n, e, l) {
  if (n[e]) return n[e];
  const [t, s] = L(l, {
    equals: !1,
    internal: !0
  });
  return t.$ = s, n[e] = t;
}
function J(n, e) {
  const l = Reflect.getOwnPropertyDescriptor(n, e);
  return !l || l.get || !l.configurable || e === y || e === F || (delete l.value, delete l.writable, l.get = () => n[y][e]), l;
}
function q(n) {
  N() && H(K(n, F), M)();
}
function Q(n) {
  return q(n), Reflect.ownKeys(n);
}
const U = {
  get(n, e, l) {
    if (e === T) return n;
    if (e === y) return l;
    if (e === E)
      return q(n), l;
    const t = K(n, F), s = t[e];
    let i = s ? s() : n[e];
    if (e === F || e === m || e === "__proto__") return i;
    if (!s) {
      const f = Object.getOwnPropertyDescriptor(n, e);
      N() && (typeof i != "function" || n.hasOwnProperty(e)) && !(f && f.get) && (i = H(t, e, i)());
    }
    return S(i) ? z(i) : i;
  },
  has(n, e) {
    return e === T || e === y || e === E || e === F || e === m || e === "__proto__" ? !0 : (N() && H(K(n, m), e)(), e in n);
  },
  set() {
    return !0;
  },
  deleteProperty() {
    return !0;
  },
  ownKeys: Q,
  getOwnPropertyDescriptor: J
};
function g(n, e, l, t = !1) {
  if (!t && n[e] === l) return;
  const s = n[e], i = n.length;
  l === void 0 ? (delete n[e], n[m] && n[m][e] && s !== void 0 && n[m][e].$()) : (n[e] = l, n[m] && n[m][e] && s === void 0 && n[m][e].$());
  let f = K(n, F), h;
  if ((h = H(f, e, s)) && h.$(() => l), Array.isArray(n) && n.length !== i) {
    for (let u = n.length; u < i; u++) (h = f[u]) && h.$();
    (h = H(f, "length", i)) && h.$(n.length);
  }
  (h = f[M]) && h.$();
}
function v(n, e) {
  const l = Object.keys(e);
  for (let t = 0; t < l.length; t += 1) {
    const s = l[t];
    g(n, s, e[s]);
  }
}
function Z(n, e) {
  if (typeof e == "function" && (e = e(n)), e = $(e), Array.isArray(e)) {
    if (n === e) return;
    let l = 0, t = e.length;
    for (; l < t; l++) {
      const s = e[l];
      n[l] !== s && g(n, l, s);
    }
    g(n, "length", t);
  } else v(n, e);
}
function W(n, e, l = []) {
  let t, s = n;
  if (e.length > 1) {
    t = e.shift();
    const f = typeof t, h = Array.isArray(n);
    if (Array.isArray(t)) {
      for (let u = 0; u < t.length; u++)
        W(n, [t[u]].concat(e), l);
      return;
    } else if (h && f === "function") {
      for (let u = 0; u < n.length; u++)
        t(n[u], u) && W(n, [u].concat(e), l);
      return;
    } else if (h && f === "object") {
      const {
        from: u = 0,
        to: c = n.length - 1,
        by: o = 1
      } = t;
      for (let r = u; r <= c; r += o)
        W(n, [r].concat(e), l);
      return;
    } else if (e.length > 1) {
      W(n[t], e, [t].concat(l));
      return;
    }
    s = n[t], l = [t].concat(l);
  }
  let i = e[0];
  typeof i == "function" && (i = i(s, l), i === s) || t === void 0 && i == null || (i = $(i), t === void 0 || S(s) && S(i) && !Array.isArray(i) ? v(s, i) : g(n, t, i));
}
function p(...[n, e]) {
  const l = $(n || {}), t = Array.isArray(l), s = z(l);
  function i(...f) {
    G(() => {
      t && f.length === 1 ? Z(l, f[0]) : W(l, f);
    });
  }
  return [s, i];
}
const C = Symbol("store-root");
function w(n, e, l, t, s) {
  const i = e[l];
  if (n === i) return;
  const f = Array.isArray(n);
  if (l !== C && (!S(n) || !S(i) || f !== Array.isArray(i) || s && n[s] !== i[s])) {
    g(e, l, n);
    return;
  }
  if (f) {
    if (n.length && i.length && (!t || s && n[0] && n[0][s] != null)) {
      let c, o, r, d, a, A, Y, O;
      for (r = 0, d = Math.min(i.length, n.length); r < d && (i[r] === n[r] || s && i[r] && n[r] && i[r][s] && i[r][s] === n[r][s]); r++)
        w(n[r], i, r, t, s);
      const P = new Array(n.length), D = /* @__PURE__ */ new Map();
      for (d = i.length - 1, a = n.length - 1; d >= r && a >= r && (i[d] === n[a] || s && i[d] && n[a] && i[d][s] && i[d][s] === n[a][s]); d--, a--)
        P[a] = i[d];
      if (r > a || r > d) {
        for (o = r; o <= a; o++) g(i, o, n[o]);
        for (; o < n.length; o++)
          g(i, o, P[o]), w(n[o], i, o, t, s);
        i.length > n.length && g(i, "length", n.length);
        return;
      }
      for (Y = new Array(a + 1), o = a; o >= r; o--)
        A = n[o], O = s && A ? A[s] : A, c = D.get(O), Y[o] = c === void 0 ? -1 : c, D.set(O, o);
      for (c = r; c <= d; c++)
        A = i[c], O = s && A ? A[s] : A, o = D.get(O), o !== void 0 && o !== -1 && (P[o] = i[c], o = Y[o], D.set(O, o));
      for (o = r; o < n.length; o++)
        o in P ? (g(i, o, P[o]), w(n[o], i, o, t, s)) : g(i, o, n[o]);
    } else
      for (let c = 0, o = n.length; c < o; c++)
        w(n[c], i, c, t, s);
    i.length > n.length && g(i, "length", n.length);
    return;
  }
  const h = Object.keys(n);
  for (let c = 0, o = h.length; c < o; c++)
    w(n[h[c]], i, h[c], t, s);
  const u = Object.keys(i);
  for (let c = 0, o = u.length; c < o; c++)
    n[u[c]] === void 0 && g(i, u[c], void 0);
}
function un(n, e = {}) {
  const {
    merge: l,
    key: t = "id"
  } = e, s = $(n);
  return (i) => {
    if (!S(i) || !S(s)) return s;
    const f = w(s, {
      [C]: i
    }, C, l, t);
    return f === void 0 ? i : f;
  };
}
const [j, I] = L(!1), hn = {
  isLoading: j,
  start: () => I(!0),
  stop: () => I(!1),
  toggle: () => I((n) => !n)
}, V = {
  isOpen: !1,
  isConfirm: !1,
  html: "",
  message: "",
  height: "",
  width: "",
  maxHeight: "",
  maxWidth: "",
  minHeight: "",
  minWidth: "",
  isScrollY: !1,
  isScrollX: !1,
  yesFunc: null,
  noFunc: null
};
function _(n) {
  return typeof n == "function";
}
const [x, R] = p({ ...V }), k = (n) => {
  R({
    isOpen: !0,
    isConfirm: !1,
    message: n?.message ?? "",
    html: n?.html ?? "",
    height: n?.height ?? "",
    width: n?.width ?? "",
    maxHeight: n?.maxHeight ?? "",
    maxWidth: n?.maxWidth ?? "",
    minHeight: n?.minHeight ?? "",
    minWidth: n?.minWidth ?? "",
    isScrollY: n?.isScrollY ?? !1,
    isScrollX: n?.isScrollX ?? !1,
    yesFunc: _(n?.yesFunc) ? n?.yesFunc : null,
    noFunc: null
  });
}, nn = (n) => {
  R({
    isOpen: !0,
    isConfirm: !0,
    message: n?.message ?? "",
    html: n?.html ?? "",
    height: n?.height ?? "",
    width: n?.width ?? "",
    maxHeight: n?.maxHeight ?? "",
    maxWidth: n?.maxWidth ?? "",
    minHeight: n?.minHeight ?? "",
    minWidth: n?.minWidth ?? "",
    isScrollY: n?.isScrollY ?? !1,
    isScrollX: n?.isScrollX ?? !1,
    yesFunc: _(n?.yesFunc) ? n?.yesFunc : null,
    noFunc: _(n?.noFunc) ? n?.noFunc : null
  });
}, X = () => {
  R({ ...V });
}, en = () => {
  _(x.yesFunc) && x.yesFunc(), X();
}, sn = () => {
  _(x.noFunc) && x.noFunc(), X();
}, ln = X, dn = {
  get: () => x,
  set: R,
  open: k,
  confirm: nn,
  close: X,
  yes: en,
  no: sn,
  reset: ln
}, tn = () => Math.random().toString(36).slice(2), [on, b] = L([]);
function fn(n) {
  const e = {
    id: tn(),
    message: n.message ?? n.text ?? "",
    type: n.type,
    removeAfter: n.removeAfter
  };
  b((l) => [...l, e]), e.removeAfter && e.removeAfter > 0 && setTimeout(() => B(e.id), e.removeAfter);
}
function B(n) {
  b((e) => e.filter((l) => l.id !== String(n)));
}
function cn() {
  b([]);
}
const gn = {
  get: () => ({ list: on() }),
  add: fn,
  remove: B,
  reset: cn
};
export {
  p as c,
  hn as l,
  dn as m,
  gn as n,
  un as r
};
