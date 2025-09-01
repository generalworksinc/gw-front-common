import { ref as o } from "vue";
function m() {
  const e = o(!1), a = (t) => {
    e.value = t;
  };
  return { isLoading: e, setLoading: a, startLoading: () => a(!0), stopLoading: () => a(!1) };
}
const r = () => ({
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
function u(e) {
  return typeof e == "function";
}
function d() {
  const e = o(r()), a = (n) => {
    e.value.isOpen = !0, e.value.isConfirm = !1, e.value.message = n?.message ?? "", e.value.html = n?.html ?? "", e.value.height = n?.height ?? "", e.value.width = n?.width ?? "", e.value.maxHeight = n?.maxHeight ?? "", e.value.maxWidth = n?.maxWidth ?? "", e.value.minHeight = n?.minHeight ?? "", e.value.minWidth = n?.minWidth ?? "", e.value.isScrollY = n?.isScrollY ?? !1, e.value.isScrollX = n?.isScrollX ?? !1, e.value.yesFunc = u(n?.yesFunc) ? n?.yesFunc : () => null, e.value.noFunc = null;
  }, s = (n) => {
    a(n), e.value.isConfirm = !0, e.value.noFunc = u(n?.noFunc) ? n?.noFunc : () => null;
  }, c = () => {
    u(e.value.yesFunc) && e.value.yesFunc(), i();
  }, t = () => {
    u(e.value.noFunc) && e.value.noFunc(), i();
  }, l = () => {
    u(e.value.yesFunc) && e.value.yesFunc(), i();
  }, i = () => {
    e.value = r();
  };
  return { state: e, open: a, confirm: s, close: c, yes: l, no: t, reset: i };
}
const v = () => Math.random().toString(36).slice(2);
function h() {
  const e = o([]), a = (t) => {
    e.value = e.value.filter((l) => l.id !== t);
  };
  return { notifications: e, add: (t) => {
    const l = { id: v(), ...t };
    e.value = [...e.value, l], l.removeAfter && l.removeAfter > 0 && setTimeout(() => a(l.id), l.removeAfter);
  }, remove: a, clear: () => e.value = [] };
}
export {
  d as a,
  h as b,
  m as u
};
