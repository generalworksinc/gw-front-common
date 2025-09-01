import { u as r } from "../loadingStore-DFAXCLyM.js";
async function f(e, ...u) {
  const a = r();
  return a.isLoading.value ? !1 : (a.startLoading(), await new Promise((s, l) => {
    setTimeout(() => {
      try {
        const n = e(...u);
        n instanceof Promise || n && typeof n.then == "function" && typeof n.catch == "function" ? n.then((i) => {
          a.stopLoading(), s(Promise.resolve(i));
        }).catch((i) => {
          a.stopLoading(), s(Promise.reject(i));
        }) : (a.stopLoading(), s(n));
      } catch (n) {
        a.stopLoading(), l(n);
      }
    }, 1);
  }));
}
const h = (e) => async () => await f(e), o = () => ({
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
function d() {
  const e = {
    value: o()
  }, u = (t) => {
    e.value.isOpen = !0, e.value.isConfirm = !1, e.value.message = t?.message ?? "", e.value.html = t?.html ?? "", e.value.height = t?.height ?? "", e.value.width = t?.width ?? "", e.value.maxHeight = t?.maxHeight ?? "", e.value.maxWidth = t?.maxWidth ?? "", e.value.minHeight = t?.minHeight ?? "", e.value.minWidth = t?.minWidth ?? "", e.value.isScrollY = t?.isScrollY ?? !1, e.value.isScrollX = t?.isScrollX ?? !1, e.value.yesFunc = c(t?.yesFunc) ? t?.yesFunc : () => null, e.value.noFunc = null;
  }, a = (t) => {
    u(t), e.value.isConfirm = !0, e.value.noFunc = c(t?.noFunc) ? t?.noFunc : () => null;
  }, s = () => {
    c(e.value.yesFunc) && e.value.yesFunc(), i();
  }, l = () => {
    c(e.value.noFunc) && e.value.noFunc(), i();
  }, n = () => {
    c(e.value.yesFunc) && e.value.yesFunc(), i();
  }, i = () => {
    e.value = o();
  };
  return { state: e, open: u, confirm: a, close: s, yes: n, no: l, reset: i };
}
const m = () => Math.random().toString(36).slice(2);
function g() {
  const e = { value: [] }, u = (l) => {
    e.value = e.value.filter((n) => n.id !== l);
  };
  return { notifications: e, add: (l) => {
    const n = { id: m(), ...l };
    e.value = [...e.value, n], n.removeAfter && n.removeAfter > 0 && setTimeout(() => u(n.id), n.removeAfter);
  }, remove: u, clear: () => e.value = [] };
}
export {
  h as awaitLoadingWith,
  f as eventWithLoading,
  r as useLoading,
  d as useModal,
  g as useNotification
};
