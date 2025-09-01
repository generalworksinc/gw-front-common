import { defineStore } from "pinia";
import { ref } from "vue";
const useLoading = defineStore("loading", {
  state: () => ({
    isLoading: false
  }),
  actions: {
    setLoading(loading) {
      this.isLoading = loading;
    },
    startLoading() {
      this.setLoading(true);
    },
    stopLoading() {
      this.setLoading(false);
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
const defaultState = () => ({
  isOpen: false,
  isConfirm: false,
  html: "",
  message: "",
  height: "",
  width: "",
  maxHeight: "",
  maxWidth: "",
  minHeight: "",
  minWidth: "",
  isScrollY: false,
  isScrollX: false,
  yesFunc: null,
  noFunc: null
});
function isFunction(fn) {
  return typeof fn === "function";
}
const state = ref(defaultState());
const open = (options) => {
  state.value.isOpen = true;
  state.value.isConfirm = false;
  state.value.message = options?.message ?? "";
  state.value.html = options?.html ?? "";
  state.value.height = options?.height ?? "";
  state.value.width = options?.width ?? "";
  state.value.maxHeight = options?.maxHeight ?? "";
  state.value.maxWidth = options?.maxWidth ?? "";
  state.value.minHeight = options?.minHeight ?? "";
  state.value.minWidth = options?.minWidth ?? "";
  state.value.isScrollY = options?.isScrollY ?? false;
  state.value.isScrollX = options?.isScrollX ?? false;
  state.value.yesFunc = isFunction(options?.yesFunc) ? options?.yesFunc : () => null;
  state.value.noFunc = null;
};
const confirm = (options) => {
  open(options);
  state.value.isConfirm = true;
  state.value.noFunc = isFunction(options?.noFunc) ? options?.noFunc : () => null;
};
const close = () => {
  if (isFunction(state.value.yesFunc)) state.value.yesFunc();
  reset();
};
const no = () => {
  if (isFunction(state.value.noFunc)) state.value.noFunc();
  reset();
};
const yes = () => {
  if (isFunction(state.value.yesFunc)) state.value.yesFunc();
  reset();
};
const reset = () => {
  state.value = defaultState();
};
const modalStore = { state, open, confirm, close, yes, no, reset };
function useModal() {
  return modalStore;
}
const randomId = () => Math.random().toString(36).slice(2);
const useNotification = defineStore("notification", {
  state: () => ({ notifications: [] }),
  actions: {
    add(n) {
      const item = { id: randomId(), ...n };
      this.notifications = [...this.notifications, item];
      if (item.removeAfter && item.removeAfter > 0) {
        setTimeout(() => this.remove(item.id), item.removeAfter);
      }
    },
    remove(id) {
      this.notifications = this.notifications.filter((n) => n.id !== id);
    },
    clear() {
      this.notifications = [];
    }
  }
});
export {
  useModal as a,
  useNotification as b,
  useLoading as u
};
