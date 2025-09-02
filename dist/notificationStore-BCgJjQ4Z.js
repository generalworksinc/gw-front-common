import { getActivePinia as h, defineStore as n } from "pinia";
import { computed as c } from "vue";
function a() {
  const i = h();
  if (i) return i;
  throw new Error(
    "[gw-front-common] Pinia instance is not available. Call setPinia(pinia) once on app init or enable the Nuxt module."
  );
}
const r = n("loading", {
  state: () => ({
    isLoading: !1
  }),
  actions: {
    setLoading(i) {
      this.isLoading = i;
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
});
function d() {
  return r(a());
}
function s(i) {
  return typeof i == "function";
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
}), l = n("modal", {
  state: () => o(),
  actions: {
    open(i) {
      this.isOpen = !0, this.isConfirm = !1, this.message = i?.message ?? "", this.html = i?.html ?? "", this.height = i?.height ?? "", this.width = i?.width ?? "", this.maxHeight = i?.maxHeight ?? "", this.maxWidth = i?.maxWidth ?? "", this.minHeight = i?.minHeight ?? "", this.minWidth = i?.minWidth ?? "", this.isScrollY = i?.isScrollY ?? !1, this.isScrollX = i?.isScrollX ?? !1, this.yesFunc = s(i?.yesFunc) ? i?.yesFunc : () => null, this.noFunc = null;
    },
    confirm(i) {
      this.open(i), this.isConfirm = !0, this.noFunc = s(i?.noFunc) ? i?.noFunc : () => null;
    },
    close() {
      s(this.yesFunc) && this.yesFunc(), this.reset();
    },
    no() {
      s(this.noFunc) && this.noFunc(), this.reset();
    },
    yes() {
      s(this.yesFunc) && this.yesFunc(), this.reset();
    },
    reset() {
      Object.assign(this, o());
    }
  }
});
function g() {
  const i = l(a());
  return {
    state: c(() => ({
      isOpen: i.isOpen,
      isConfirm: i.isConfirm,
      html: i.html,
      message: i.message,
      height: i.height,
      width: i.width,
      maxHeight: i.maxHeight,
      maxWidth: i.maxWidth,
      minHeight: i.minHeight,
      minWidth: i.minWidth,
      isScrollY: i.isScrollY,
      isScrollX: i.isScrollX,
      yesFunc: i.yesFunc,
      noFunc: i.noFunc
    })),
    open: (e) => i.open(e),
    confirm: (e) => i.confirm(e),
    close: () => i.close(),
    yes: () => i.yes(),
    no: () => i.no(),
    reset: () => i.reset()
  };
}
const m = () => Math.random().toString(36).slice(2), F = n("notification", {
  state: () => ({ notifications: [] }),
  actions: {
    add(i) {
      const t = { id: m(), ...i };
      this.notifications = [...this.notifications, t], t.removeAfter && t.removeAfter > 0 && setTimeout(() => this.remove(t.id), t.removeAfter);
    },
    remove(i) {
      this.notifications = this.notifications.filter((t) => t.id !== i);
    },
    clear() {
      this.notifications = [];
    }
  }
});
export {
  g as a,
  F as b,
  d as u
};
