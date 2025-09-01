import { ref as i } from "vue";
const c = i(!1), s = (e) => {
  c.value = e;
}, m = () => s(!0), v = () => s(!1), d = {
  isLoading: c,
  setLoading: s,
  startLoading: m,
  stopLoading: v
};
function A() {
  return d;
}
const o = () => ({
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
function l(e) {
  return typeof e == "function";
}
const n = i(o()), r = (e) => {
  n.value.isOpen = !0, n.value.isConfirm = !1, n.value.message = e?.message ?? "", n.value.html = e?.html ?? "", n.value.height = e?.height ?? "", n.value.width = e?.width ?? "", n.value.maxHeight = e?.maxHeight ?? "", n.value.maxWidth = e?.maxWidth ?? "", n.value.minHeight = e?.minHeight ?? "", n.value.minWidth = e?.minWidth ?? "", n.value.isScrollY = e?.isScrollY ?? !1, n.value.isScrollX = e?.isScrollX ?? !1, n.value.yesFunc = l(e?.yesFunc) ? e?.yesFunc : () => null, n.value.noFunc = null;
}, h = (e) => {
  r(e), n.value.isConfirm = !0, n.value.noFunc = l(e?.noFunc) ? e?.noFunc : () => null;
}, g = () => {
  l(n.value.yesFunc) && n.value.yesFunc(), u();
}, F = () => {
  l(n.value.noFunc) && n.value.noFunc(), u();
}, y = () => {
  l(n.value.yesFunc) && n.value.yesFunc(), u();
}, u = () => {
  n.value = o();
}, S = { state: n, open: r, confirm: h, close: g, yes: y, no: F, reset: u };
function C() {
  return S;
}
const x = () => Math.random().toString(36).slice(2), a = i([]), f = (e) => {
  a.value = a.value.filter((t) => t.id !== e);
}, H = (e) => {
  const t = { id: x(), ...e };
  a.value = [...a.value, t], t.removeAfter && t.removeAfter > 0 && setTimeout(() => f(t.id), t.removeAfter);
}, W = () => a.value = [], L = {
  notifications: a,
  add: H,
  remove: f,
  clear: W
};
function X() {
  return L;
}
export {
  C as a,
  X as b,
  A as u
};
