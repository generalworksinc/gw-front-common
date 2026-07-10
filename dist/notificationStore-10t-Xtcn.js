import { defineStore as n } from "pinia";
import { r as a } from "./pinia-CXsK1c83.js";
import { computed as r } from "vue";
const h = n("loading", {
  state: () => ({
    isLoading: !1
  }),
  actions: {
    setLoading(s) {
      this.isLoading = s;
    },
    startLoading() {
      this.setLoading(!0);
    },
    stopLoading() {
      this.setLoading(!1);
    }
  }
});
function g() {
  return h(a());
}
function i(s) {
  return typeof s == "function";
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
  containerClass: "",
  bodyClass: "",
  footerClass: "",
  reverseButtons: !1,
  yesFunc: null,
  noFunc: null
}), l = n("modal", {
  state: () => o(),
  actions: {
    open(s) {
      this.isOpen = !0, this.isConfirm = !1, this.message = s?.message ?? "", this.html = s?.html ?? "", this.height = s?.height ?? "", this.width = s?.width ?? "", this.maxHeight = s?.maxHeight ?? "", this.maxWidth = s?.maxWidth ?? "", this.minHeight = s?.minHeight ?? "", this.minWidth = s?.minWidth ?? "", this.isScrollY = s?.isScrollY ?? !1, this.isScrollX = s?.isScrollX ?? !1, this.containerClass = s?.containerClass ?? "", this.bodyClass = s?.bodyClass ?? "", this.footerClass = s?.footerClass ?? "", this.reverseButtons = s?.reverseButtons ?? !1, this.yesFunc = i(s?.yesFunc) ? s?.yesFunc : () => null, this.noFunc = null;
    },
    confirm(s) {
      this.open(s), this.isConfirm = !0, this.noFunc = i(s?.noFunc) ? s?.noFunc : () => null;
    },
    close() {
      i(this.yesFunc) && this.yesFunc(), this.reset();
    },
    no() {
      i(this.noFunc) && this.noFunc(), this.reset();
    },
    yes() {
      i(this.yesFunc) && this.yesFunc(), this.reset();
    },
    reset() {
      Object.assign(this, o());
    }
  }
});
function C() {
  const s = l(a());
  return {
    state: r(() => ({
      isOpen: s.isOpen,
      isConfirm: s.isConfirm,
      html: s.html,
      message: s.message,
      height: s.height,
      width: s.width,
      maxHeight: s.maxHeight,
      maxWidth: s.maxWidth,
      minHeight: s.minHeight,
      minWidth: s.minWidth,
      isScrollY: s.isScrollY,
      isScrollX: s.isScrollX,
      containerClass: s.containerClass,
      bodyClass: s.bodyClass,
      footerClass: s.footerClass,
      reverseButtons: s.reverseButtons,
      yesFunc: s.yesFunc,
      noFunc: s.noFunc
    })),
    open: (e) => s.open(e),
    confirm: (e) => s.confirm(e),
    close: () => s.close(),
    yes: () => s.yes(),
    no: () => s.no(),
    reset: () => s.reset()
  };
}
const c = () => Math.random().toString(36).slice(2), m = n("notification", {
  state: () => ({ list: [] }),
  actions: {
    add(s) {
      const t = {
        id: c(),
        ...s,
        removeAfter: s.removeAfter ?? 3e3
      };
      this.list = [...this.list, t], t.removeAfter && t.removeAfter > 0 && setTimeout(() => this.remove(t.id), t.removeAfter);
    },
    remove(s) {
      this.list = this.list.filter((t) => t.id !== s);
    },
    clear() {
      this.list = [];
    }
  }
});
function F() {
  return m(a());
}
export {
  C as a,
  F as b,
  g as u
};
