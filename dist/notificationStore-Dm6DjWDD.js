import { defineStore as s } from "pinia";
import { ref as u } from "vue";
const F = s("loading", {
  state: () => ({
    isLoading: !1
  }),
  actions: {
    setLoading(e) {
      this.isLoading = e;
    },
    startLoading() {
      this.setLoading(!0);
    },
    stopLoading() {
      this.setLoading(!1);
    },
    // compatibility with legacy API
    LOADING() {
      this.startLoading();
    },
    NOT_LOADING() {
      this.stopLoading();
    }
  }
}), l = () => ({
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
function n(e) {
  return typeof e == "function";
}
const i = u(l()), o = (e) => {
  i.value.isOpen = !0, i.value.isConfirm = !1, i.value.message = e?.message ?? "", i.value.html = e?.html ?? "", i.value.height = e?.height ?? "", i.value.width = e?.width ?? "", i.value.maxHeight = e?.maxHeight ?? "", i.value.maxWidth = e?.maxWidth ?? "", i.value.minHeight = e?.minHeight ?? "", i.value.minWidth = e?.minWidth ?? "", i.value.isScrollY = e?.isScrollY ?? !1, i.value.isScrollX = e?.isScrollX ?? !1, i.value.yesFunc = n(e?.yesFunc) ? e?.yesFunc : () => null, i.value.noFunc = null;
}, c = (e) => {
  o(e), i.value.isConfirm = !0, i.value.noFunc = n(e?.noFunc) ? e?.noFunc : () => null;
}, r = () => {
  n(i.value.yesFunc) && i.value.yesFunc(), a();
}, f = () => {
  n(i.value.noFunc) && i.value.noFunc(), a();
}, h = () => {
  n(i.value.yesFunc) && i.value.yesFunc(), a();
}, a = () => {
  i.value = l();
}, m = { state: i, open: o, confirm: c, close: r, yes: h, no: f, reset: a };
function L() {
  return m;
}
const d = () => Math.random().toString(36).slice(2), y = s("notification", {
  state: () => ({ notifications: [] }),
  actions: {
    add(e) {
      const t = { id: d(), ...e };
      this.notifications = [...this.notifications, t], t.removeAfter && t.removeAfter > 0 && setTimeout(() => this.remove(t.id), t.removeAfter);
    },
    remove(e) {
      this.notifications = this.notifications.filter((t) => t.id !== e);
    },
    clear() {
      this.notifications = [];
    }
  }
});
export {
  L as a,
  y as b,
  F as u
};
