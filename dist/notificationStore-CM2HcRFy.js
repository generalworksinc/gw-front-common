import { defineStore as n } from "pinia";
import { r as o } from "./pinia-CXsK1c83.js";
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
    },
    /**
     * @deprecated startLoading()/stopLoading() を使うこと。次のメジャーバージョンで削除予定。
     */
    LOADING() {
      this.startLoading();
    },
    /**
     * @deprecated startLoading()/stopLoading() を使うこと。次のメジャーバージョンで削除予定。
     */
    NOT_LOADING() {
      this.stopLoading();
    }
  }
});
function g() {
  return h(o());
}
function t(s) {
  return typeof s == "function";
}
const a = () => ({
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
  state: () => a(),
  actions: {
    open(s) {
      this.isOpen = !0, this.isConfirm = !1, this.message = s?.message ?? "", this.html = s?.html ?? "", this.height = s?.height ?? "", this.width = s?.width ?? "", this.maxHeight = s?.maxHeight ?? "", this.maxWidth = s?.maxWidth ?? "", this.minHeight = s?.minHeight ?? "", this.minWidth = s?.minWidth ?? "", this.isScrollY = s?.isScrollY ?? !1, this.isScrollX = s?.isScrollX ?? !1, this.containerClass = s?.containerClass ?? "", this.bodyClass = s?.bodyClass ?? "", this.footerClass = s?.footerClass ?? "", this.reverseButtons = s?.reverseButtons ?? !1, this.yesFunc = t(s?.yesFunc) ? s?.yesFunc : () => null, this.noFunc = null;
    },
    confirm(s) {
      this.open(s), this.isConfirm = !0, this.noFunc = t(s?.noFunc) ? s?.noFunc : () => null;
    },
    close() {
      t(this.yesFunc) && this.yesFunc(), this.reset();
    },
    no() {
      t(this.noFunc) && this.noFunc(), this.reset();
    },
    yes() {
      t(this.yesFunc) && this.yesFunc(), this.reset();
    },
    reset() {
      Object.assign(this, a());
    }
  }
});
function C() {
  const s = l(o());
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
  state: () => ({ notifications: [] }),
  actions: {
    add(s) {
      const i = {
        id: c(),
        ...s,
        removeAfter: s.removeAfter ?? 3e3
      };
      this.notifications = [...this.notifications, i], i.removeAfter && i.removeAfter > 0 && setTimeout(() => this.remove(i.id), i.removeAfter);
    },
    remove(s) {
      this.notifications = this.notifications.filter((i) => i.id !== s);
    },
    clear() {
      this.notifications = [];
    }
  }
});
function F() {
  return m(o());
}
export {
  C as a,
  F as b,
  g as u
};
