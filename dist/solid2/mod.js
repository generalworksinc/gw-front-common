import { createStore as f, reconcile as v, snapshot as N, createSignal as O, createContext as I, useContext as L, createComponent as P } from "solid-js";
function X(t, e) {
  const n = structuredClone(t), [r, o] = f(
    structuredClone(n)
  ), s = e?.persist, c = s ? s.storage ?? (typeof window > "u" ? void 0 : globalThis.localStorage) : void 0;
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
        c.setItem(s.name, JSON.stringify(N(r)));
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
const Y = {
  id: null,
  email: null,
  fullName: null,
  firstName: null,
  lastName: null
}, { store: C, set: J, reset: M } = X(Y, {
  persist: { name: "authStore" }
}), q = () => C.id !== null, d = {
  get: () => C,
  set: J,
  reset: M,
  isLoggedIn: q
}, b = (t) => {
  const e = async (s, c, a, l, w, F = "") => {
    await t.setToken(s), d.set((i) => {
      Object.assign(i, {
        id: c,
        email: a,
        fullName: l,
        firstName: w,
        lastName: F
      });
    });
  }, n = async (s) => {
    await t.removeToken(), d.reset(), s && s("/signin");
  }, r = async () => await t.getToken();
  return { $login: e, $logout: n, authCheck: async () => {
    const s = await r();
    return s ? { accessToken: s } : (d.reset(), { accessToken: null });
  }, getAccessTokenFromApp: r };
}, [R, k] = O(!1);
let h = !1;
const T = () => h ? !1 : (h = !0, k(!0), !0), W = () => (h = !1, k(!1), !1), U = () => h ? W() : T(), u = { isLoading: R, start: T, stop: W, toggle: U }, z = async (t, ...e) => u.start() ? await new Promise((n, r) => {
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
}) : !1, j = (t) => async () => await z(t), g = {
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
}, x = (t) => typeof t == "function", [S, A] = f({ ...g }), $ = (t, e) => ({
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
}, B = (t) => p($(t, !1)), D = (t) => p($(t, !0)), m = () => p({ ...g }), E = () => {
  S.yesFunc?.(), m();
}, G = () => {
  S.noFunc?.(), m();
}, tt = {
  get: () => S,
  set: A,
  open: B,
  confirm: D,
  close: m,
  yes: E,
  no: G,
  reset: m
}, K = () => Math.random().toString(36).slice(2), [Q, y] = f({ list: [] }), H = (t) => {
  y((e) => {
    e.list = e.list.filter((n) => n.id !== t);
  });
}, V = (t) => {
  const e = {
    ...t,
    id: K(),
    removeAfter: t.removeAfter ?? 3e3
  };
  y((n) => {
    n.list.push(e);
  }), e.removeAfter > 0 && setTimeout(() => H(e.id), e.removeAfter);
}, Z = () => {
  y((t) => {
    t.list = [];
  });
}, et = {
  get: () => ({ list: Q.list }),
  add: V,
  remove: H,
  reset: Z
};
function st(t) {
  const e = I();
  return {
    Provider: (r) => {
      const o = t();
      return P(e, {
        value: o,
        get children() {
          return r.children;
        }
      });
    },
    useStore: () => L(e),
    Context: e
  };
}
export {
  d as authStore,
  j as awaitLoadingWith,
  b as createAuthUser,
  X as createResettableStore,
  st as createStoreContext,
  z as eventWithLoading,
  u as loadingStore,
  tt as modalStore,
  et as notificationStore
};
