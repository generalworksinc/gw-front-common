import { createUniqueId as N, untrack as S } from "solid-js";
import { r as p, c as I } from "../notificationStore-DwNojmzH.js";
import { m as P } from "../notificationStore-DwNojmzH.js";
function O(r, o = {}) {
  const s = o.storage || globalThis.localStorage, n = o.name || `storage-${N()}`;
  if (!s)
    return [r[0], r[1], null];
  const l = o.storageOptions, u = o.serialize || JSON.stringify.bind(JSON), m = o.deserialize || JSON.parse.bind(JSON), c = s.getItem(n, l), i = typeof r[0] == "function" ? (t) => {
    try {
      const e = m(t);
      r[1](() => e);
    } catch {
    }
  } : (t) => {
    try {
      const e = m(t);
      r[1](p(e));
    } catch {
    }
  };
  let a = !0;
  if (c instanceof Promise ? c.then((t) => a && t && i(t)) : c && i(c), typeof o.sync?.[0] == "function") {
    const t = typeof r[0] == "function" ? r[0] : () => r[0];
    o.sync[0]((e) => {
      e.key !== n || (e.url || globalThis.location.href) !== globalThis.location.href || e.newValue === u(S(t)) || i(e.newValue);
    });
  }
  return [
    r[0],
    typeof r[0] == "function" ? (t) => {
      const e = r[1](t), f = t != null ? u(e) : t;
      return o.sync?.[1](n, f), f != null ? s.setItem(n, f, l) : s.removeItem(n, l), a = !1, e;
    } : (...t) => {
      r[1](...t);
      const e = u(S(() => r[0]));
      o.sync?.[1](n, e), s.setItem(n, e, l), a = !1;
    },
    c
  ];
}
const y = {
  id: null,
  email: null,
  fullName: null,
  firstName: null,
  lastName: null
}, [b, z] = I(y), [d, h] = O([b, z], { name: "authStore" }), g = () => {
  h({ ...y });
}, J = () => d.id !== null, v = {
  get: () => d,
  set: h,
  reset: g,
  isLoggedIn: J
};
export {
  v as authStore,
  P as modalStore
};
