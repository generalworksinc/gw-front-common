function r() {
  const e = { value: !1 }, a = (u) => {
    e.value = u;
  };
  return { isLoading: e, setLoading: a, startLoading: () => a(!0), stopLoading: () => a(!1) };
}
async function f(e, ...a) {
  const i = r();
  return i.isLoading.value ? !1 : (i.startLoading(), await new Promise((s, u) => {
    setTimeout(() => {
      try {
        const n = e(...a);
        n instanceof Promise || n && typeof n.then == "function" && typeof n.catch == "function" ? n.then((l) => {
          i.stopLoading(), s(Promise.resolve(l));
        }).catch((l) => {
          i.stopLoading(), s(Promise.reject(l));
        }) : (i.stopLoading(), s(n));
      } catch (n) {
        i.stopLoading(), u(n);
      }
    }, 1);
  }));
}
const v = (e) => async () => await f(e), o = () => ({
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
});
function c(e) {
  return typeof e == "function";
}
function m() {
  const e = {
    value: o()
  }, a = (t) => {
    e.value.isOpen = !0, e.value.isConfirm = !1, e.value.message = t?.message ?? "", e.value.html = t?.html ?? "", e.value.height = t?.height ?? "", e.value.width = t?.width ?? "", e.value.maxHeight = t?.maxHeight ?? "", e.value.maxWidth = t?.maxWidth ?? "", e.value.minHeight = t?.minHeight ?? "", e.value.minWidth = t?.minWidth ?? "", e.value.isScrollY = t?.isScrollY ?? !1, e.value.isScrollX = t?.isScrollX ?? !1, e.value.yesFunc = c(t?.yesFunc) ? t?.yesFunc : () => null, e.value.noFunc = null;
  }, i = (t) => {
    a(t), e.value.isConfirm = !0, e.value.noFunc = c(t?.noFunc) ? t?.noFunc : () => null;
  }, s = () => {
    c(e.value.yesFunc) && e.value.yesFunc(), l();
  }, u = () => {
    c(e.value.noFunc) && e.value.noFunc(), l();
  }, n = () => {
    c(e.value.yesFunc) && e.value.yesFunc(), l();
  }, l = () => {
    e.value = o();
  };
  return { state: e, open: a, confirm: i, close: s, yes: n, no: u, reset: l };
}
const d = () => Math.random().toString(36).slice(2);
function h() {
  const e = { value: [] }, a = (u) => {
    e.value = e.value.filter((n) => n.id !== u);
  };
  return { notifications: e, add: (u) => {
    const n = { id: d(), ...u };
    e.value = [...e.value, n], n.removeAfter && n.removeAfter > 0 && setTimeout(() => a(n.id), n.removeAfter);
  }, remove: a, clear: () => e.value = [] };
}
export {
  v as awaitLoadingWith,
  f as eventWithLoading,
  r as useLoading,
  m as useModal,
  h as useNotification
};
