import { isServer as N, createComponent as O } from "@solidjs/web";
import { createStore as d, reconcile as v, snapshot as I, createSignal as L, createContext as P, useContext as X } from "solid-js";
function Y(t, e) {
  const n = structuredClone(t), [r, o] = d(
    structuredClone(n)
  ), s = e?.persist, c = s ? s.storage ?? (N ? void 0 : globalThis.localStorage) : void 0;
  if (s && c)
    try {
      const i = c.getItem(s.name);
      i != null && o(v({ ...n, ...JSON.parse(i) }));
    } catch {
    }
  let a = !1;
  const l = () => {
    !s || !c || a || (a = !0, queueMicrotask(() => {
      a = !1;
      try {
        c.setItem(s.name, JSON.stringify(I(r)));
      } catch (i) {
        console.warn("Failed to persist resettable store.", i);
      }
    }));
  };
  return { store: r, set: (i) => {
    o(i), l();
  }, reset: () => {
    o(v(structuredClone(n))), l();
  } };
}
const J = {
  id: null,
  email: null,
  fullName: null,
  firstName: null,
  lastName: null
}, { store: C, set: M, reset: q } = Y(J, {
  persist: { name: "authStore" }
}), R = () => C.id !== null, f = {
  get: () => C,
  set: M,
  reset: q,
  isLoggedIn: R
}, tt = (t) => {
  const e = async (s, c, a, l, w, F = "") => {
    await t.setToken(s), f.set((i) => {
      Object.assign(i, {
        id: c,
        email: a,
        fullName: l,
        firstName: w,
        lastName: F
      });
    });
  }, n = async (s) => {
    await t.removeToken(), f.reset(), s && s("/signin");
  }, r = async () => await t.getToken();
  return { $login: e, $logout: n, authCheck: async () => {
    const s = await r();
    return s ? { accessToken: s } : (f.reset(), { accessToken: null });
  }, getAccessTokenFromApp: r };
}, [U, k] = L(!1);
let m = !1;
const T = () => m ? !1 : (m = !0, k(!0), !0), W = () => (m = !1, k(!1), !1), z = () => m ? W() : T(), u = { isLoading: U, start: T, stop: W, toggle: z }, B = async (t, ...e) => u.start() ? await new Promise((n, r) => {
  setTimeout(() => {
    try {
      Promise.resolve(t(...e)).then(
        (o) => {
          u.stop(), n(o);
        },
        (o) => {
          u.stop(), r(o);
        }
      );
    } catch (o) {
      u.stop(), r(o);
    }
  }, 1);
}) : !1, et = (t) => async () => await B(t), g = {
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
}, x = (t) => typeof t == "function", [S, A] = d({ ...g }), $ = (t, e) => ({
  ...g,
  isOpen: !0,
  isConfirm: e,
  message: t?.message ?? "",
  html: t?.html ?? "",
  height: t?.height ?? "",
  width: t?.width ?? "",
  maxHeight: t?.maxHeight ?? "",
  maxWidth: t?.maxWidth ?? "",
  minHeight: t?.minHeight ?? "",
  minWidth: t?.minWidth ?? "",
  isScrollY: t?.isScrollY ?? !1,
  isScrollX: t?.isScrollX ?? !1,
  yesFunc: x(t?.yesFunc) ? t.yesFunc : null,
  noFunc: e && x(t?.noFunc) ? t.noFunc : null
}), p = (t) => {
  A((e) => {
    Object.assign(e, t);
  });
}, D = (t) => p($(t, !1)), E = (t) => p($(t, !0)), h = () => p({ ...g }), G = () => {
  S.yesFunc?.(), h();
}, K = () => {
  S.noFunc?.(), h();
}, st = {
  get: () => S,
  set: A,
  open: D,
  confirm: E,
  close: h,
  yes: G,
  no: K,
  reset: h
}, Q = () => Math.random().toString(36).slice(2), [V, y] = d({ list: [] }), H = (t) => {
  y((e) => {
    e.list = e.list.filter((n) => n.id !== t);
  });
}, Z = (t) => {
  const e = {
    ...t,
    id: Q(),
    removeAfter: t.removeAfter ?? 3e3
  };
  y((n) => {
    n.list.push(e);
  }), e.removeAfter > 0 && setTimeout(() => H(e.id), e.removeAfter);
}, _ = () => {
  y((t) => {
    t.list = [];
  });
}, nt = {
  get: () => ({ list: V.list }),
  add: Z,
  remove: H,
  reset: _
};
function ot(t) {
  const e = P();
  return {
    Provider: (r) => {
      const o = t();
      return O(e, {
        value: o,
        get children() {
          return r.children;
        }
      });
    },
    useStore: () => X(e),
    Context: e
  };
}
export {
  f as authStore,
  et as awaitLoadingWith,
  tt as createAuthUser,
  Y as createResettableStore,
  ot as createStoreContext,
  B as eventWithLoading,
  u as loadingStore,
  st as modalStore,
  nt as notificationStore
};
