function v() {
  const e = { value: !1 }, n = (u) => {
    e.value = u;
  };
  return { isLoading: e, setLoading: n, startLoading: () => n(!0), stopLoading: () => n(!1) };
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
function t(e) {
  return typeof e == "function";
}
function f() {
  const e = {
    value: o()
  }, n = (a) => {
    e.value.isOpen = !0, e.value.isConfirm = !1, e.value.message = a?.message ?? "", e.value.html = a?.html ?? "", e.value.height = a?.height ?? "", e.value.width = a?.width ?? "", e.value.maxHeight = a?.maxHeight ?? "", e.value.maxWidth = a?.maxWidth ?? "", e.value.minHeight = a?.minHeight ?? "", e.value.minWidth = a?.minWidth ?? "", e.value.isScrollY = a?.isScrollY ?? !1, e.value.isScrollX = a?.isScrollX ?? !1, e.value.yesFunc = t(a?.yesFunc) ? a?.yesFunc : () => null, e.value.noFunc = null;
  }, s = (a) => {
    n(a), e.value.isConfirm = !0, e.value.noFunc = t(a?.noFunc) ? a?.noFunc : () => null;
  }, c = () => {
    t(e.value.yesFunc) && e.value.yesFunc(), i();
  }, u = () => {
    t(e.value.noFunc) && e.value.noFunc(), i();
  }, l = () => {
    t(e.value.yesFunc) && e.value.yesFunc(), i();
  }, i = () => {
    e.value = o();
  };
  return { state: e, open: n, confirm: s, close: c, yes: l, no: u, reset: i };
}
const r = () => Math.random().toString(36).slice(2);
function m() {
  const e = { value: [] }, n = (u) => {
    e.value = e.value.filter((l) => l.id !== u);
  };
  return { notifications: e, add: (u) => {
    const l = { id: r(), ...u };
    e.value = [...e.value, l], l.removeAfter && l.removeAfter > 0 && setTimeout(() => n(l.id), l.removeAfter);
  }, remove: n, clear: () => e.value = [] };
}
export {
  f as a,
  m as b,
  v as u
};
