import { createUniqueId as L, untrack as y } from "solid-js";
import { r as w, c as N, l as d } from "../notificationStore-C3twEqoD.js";
import { m as j, n as q } from "../notificationStore-C3twEqoD.js";
function I(t, s = {}) {
  const c = s.storage || globalThis.localStorage, e = s.name || `storage-${L()}`;
  if (!c)
    return [t[0], t[1], null];
  const u = s.storageOptions, l = s.serialize || JSON.stringify.bind(JSON), f = s.deserialize || JSON.parse.bind(JSON), i = c.getItem(e, u), r = typeof t[0] == "function" ? (o) => {
    try {
      const n = f(o);
      t[1](() => n);
    } catch {
    }
  } : (o) => {
    try {
      const n = f(o);
      t[1](w(n));
    } catch {
    }
  };
  let a = !0;
  if (i instanceof Promise ? i.then((o) => a && o && r(o)) : i && r(i), typeof s.sync?.[0] == "function") {
    const o = typeof t[0] == "function" ? t[0] : () => t[0];
    s.sync[0]((n) => {
      n.key !== e || (n.url || globalThis.location.href) !== globalThis.location.href || n.newValue === l(y(o)) || r(n.newValue);
    });
  }
  return [
    t[0],
    typeof t[0] == "function" ? (o) => {
      const n = t[1](o), m = o != null ? l(n) : o;
      return s.sync?.[1](e, m), m != null ? c.setItem(e, m, u) : c.removeItem(e, u), a = !1, n;
    } : (...o) => {
      t[1](...o);
      const n = l(y(() => t[0]));
      s.sync?.[1](e, n), c.setItem(e, n, u), a = !1;
    },
    i
  ];
}
const h = {
  id: null,
  email: null,
  fullName: null,
  firstName: null,
  lastName: null
}, [O, b] = N(h), [p, S] = I([O, b], { name: "authStore" }), z = () => {
  S({ ...h });
}, P = () => p.id !== null, k = {
  get: () => p,
  set: S,
  reset: z,
  isLoggedIn: P
};
async function g(t, s, ...c) {
  const e = typeof t == "function" ? {
    isLoading: () => d.isLoading(),
    start: () => d.start(),
    stop: () => d.stop()
  } : t, u = typeof t == "function" ? t : s, l = c;
  if (typeof e.isLoading == "function") {
    if (e.isLoading()) return !1;
  } else if (e.isLoading)
    return !1;
  return e.start(), await new Promise((f, i) => {
    setTimeout(() => {
      try {
        const r = u(...l);
        r && typeof r.then == "function" && typeof r.catch == "function" ? r.then((a) => {
          e.stop(), f(Promise.resolve(a));
        }).catch((a) => {
          e.stop(), f(Promise.reject(a));
        }) : (e.stop(), f(r));
      } catch (r) {
        e.stop(), i(r);
      }
    }, 1);
  });
}
const x = (t, s) => async () => await g(t, s), W = (t) => async () => await g(t);
export {
  k as authStore,
  x as awaitLoadingWith,
  W as awaitLoadingWithScheduler,
  g as eventWithLoading,
  d as loadingStore,
  j as modalStore,
  q as notificationStore
};
