import { createComponent as e, createContext as t, createSignal as n, createStore as r, reconcile as i, snapshot as a, useContext as o } from "solid-js";
// solid2/features/store/resettableStore.ts
function s(e, t) {
	let n = structuredClone(e), [o, s] = r(structuredClone(n)), c = t?.persist, l = c ? c.storage ?? (typeof window > "u" ? void 0 : globalThis.localStorage) : void 0;
	if (c && l) try {
		let e = l.getItem(c.name);
		e != null && s(i({
			...n,
			...JSON.parse(e)
		}));
	} catch {}
	let u = !1, d = () => {
		c && l && !u && (u = !0, queueMicrotask(() => {
			u = !1;
			try {
				l.setItem(c.name, JSON.stringify(a(o)));
			} catch (e) {
				console.warn("Failed to persist resettable store.", e);
			}
		}));
	};
	return {
		store: o,
		set: (e) => {
			s(e), d();
		},
		reset: () => {
			s(i(structuredClone(n))), d();
		}
	};
}
// solid2/features/auth/authStore.ts
var { store: c, set: l, reset: u } = s({
	id: null,
	email: null,
	fullName: null,
	firstName: null,
	lastName: null
}, { persist: { name: "authStore" } }), d = {
	get: () => c,
	set: l,
	reset: u,
	isLoggedIn: () => c.id !== null
}, f = (e) => {
	let t = async (t, n, r, i, a, o = "") => {
		await e.setToken(t), d.set((e) => {
			Object.assign(e, {
				id: n,
				email: r,
				fullName: i,
				firstName: a,
				lastName: o
			});
		});
	}, n = async (t) => {
		await e.removeToken(), d.reset(), t && t("/signin");
	}, r = async () => await e.getToken();
	return {
		$login: t,
		$logout: n,
		authCheck: async () => {
			let e = await r();
			return e ? { accessToken: e } : (d.reset(), { accessToken: null });
		},
		getAccessTokenFromApp: r
	};
}, [p, m] = n(!1), h = !1, g = () => !h && (h = !0, m(!0), !0), _ = () => (h = !1, m(!1), !1), v = {
	isLoading: p,
	start: g,
	stop: _,
	toggle: () => h ? _() : g()
}, y = async (e, ...t) => v.start() ? await new Promise((n, r) => {
	setTimeout(() => {
		try {
			Promise.resolve(e(...t)).then((e) => {
				v.stop(), n(e);
			}, (e) => {
				v.stop(), r(e);
			});
		} catch (e) {
			v.stop(), r(e);
		}
	}, 1);
}) : !1, b = (e) => async () => await y(e), x = {
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
}, S = (e) => typeof e == "function", [C, w] = r({ ...x }), T = (e, t) => ({
	...x,
	isOpen: !0,
	isConfirm: t,
	message: e?.message ?? "",
	html: e?.html ?? "",
	height: e?.height ?? "",
	width: e?.width ?? "",
	maxHeight: e?.maxHeight ?? "",
	maxWidth: e?.maxWidth ?? "",
	minHeight: e?.minHeight ?? "",
	minWidth: e?.minWidth ?? "",
	isScrollY: e?.isScrollY ?? !1,
	isScrollX: e?.isScrollX ?? !1,
	yesFunc: S(e?.yesFunc) ? e.yesFunc : null,
	noFunc: t && S(e?.noFunc) ? e.noFunc : null
}), E = (e) => {
	w((t) => {
		Object.assign(t, e);
	});
}, D = (e) => E(T(e, !1)), O = (e) => E(T(e, !0)), k = () => E({ ...x }), A = {
	get: () => C,
	set: w,
	open: D,
	confirm: O,
	close: k,
	yes: () => {
		C.yesFunc?.(), k();
	},
	no: () => {
		C.noFunc?.(), k();
	},
	reset: k
}, j = () => Math.random().toString(36).slice(2), [M, N] = r({ list: [] }), P = (e) => {
	N((t) => {
		t.list = t.list.filter((t) => t.id !== e);
	});
}, F = {
	get: () => ({ list: M.list }),
	add: (e) => {
		let t = {
			...e,
			id: j(),
			removeAfter: e.removeAfter ?? 3e3
		};
		N((e) => {
			e.list.push(t);
		}), t.removeAfter > 0 && setTimeout(() => P(t.id), t.removeAfter);
	},
	remove: P,
	reset: () => {
		N((e) => {
			e.list = [];
		});
	}
};
// solid2/features/util/createStoreContext.tsx
function I(n) {
	let r = t();
	return {
		Provider: (t) => {
			let i = n();
			return e(r, {
				value: i,
				get children() {
					return t.children;
				}
			});
		},
		useStore: () => o(r),
		Context: r
	};
}
export { d as authStore, b as awaitLoadingWith, f as createAuthUser, s as createResettableStore, I as createStoreContext, y as eventWithLoading, v as loadingStore, A as modalStore, F as notificationStore };
