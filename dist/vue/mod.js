function v() {
  const e = { value: !1 }, l = (u) => {
    e.value = u;
  };
  return { isLoading: e, setLoading: l, startLoading: () => l(!0), stopLoading: () => l(!1) };
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
  }, l = (n) => {
    e.value.isOpen = !0, e.value.isConfirm = !1, e.value.message = n?.message ?? "", e.value.html = n?.html ?? "", e.value.height = n?.height ?? "", e.value.width = n?.width ?? "", e.value.maxHeight = n?.maxHeight ?? "", e.value.maxWidth = n?.maxWidth ?? "", e.value.minHeight = n?.minHeight ?? "", e.value.minWidth = n?.minWidth ?? "", e.value.isScrollY = n?.isScrollY ?? !1, e.value.isScrollX = n?.isScrollX ?? !1, e.value.yesFunc = t(n?.yesFunc) ? n?.yesFunc : () => null, e.value.noFunc = null;
  }, s = (n) => {
    l(n), e.value.isConfirm = !0, e.value.noFunc = t(n?.noFunc) ? n?.noFunc : () => null;
  }, c = () => {
    t(e.value.yesFunc) && e.value.yesFunc(), i();
  }, u = () => {
    t(e.value.noFunc) && e.value.noFunc(), i();
  }, a = () => {
    t(e.value.yesFunc) && e.value.yesFunc(), i();
  }, i = () => {
    e.value = o();
  };
  return { state: e, open: l, confirm: s, close: c, yes: a, no: u, reset: i };
}
const r = () => Math.random().toString(36).slice(2);
function m() {
  const e = { value: [] }, l = (u) => {
    e.value = e.value.filter((a) => a.id !== u);
  };
  return { notifications: e, add: (u) => {
    const a = { id: r(), ...u };
    e.value = [...e.value, a], a.removeAfter && a.removeAfter > 0 && setTimeout(() => l(a.id), a.removeAfter);
  }, remove: l, clear: () => e.value = [] };
}
export {
  v as useLoading,
  f as useModal,
  m as useNotification
};
