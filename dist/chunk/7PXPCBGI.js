import { createSignal } from 'solid-js';
import { createStore } from 'solid-js/store';

// solid/features/loading/loadingStore.ts
var [isLoading, setIsLoading] = createSignal(false);
var loadingStore = {
  isLoading,
  start: () => setIsLoading(true),
  stop: () => setIsLoading(false),
  toggle: () => setIsLoading((v) => !v)
};
var defaultState = {
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
};
function isFunction(fn) {
  return typeof fn === "function";
}
var [store, setStore] = createStore({ ...defaultState });
var open = (obj) => {
  setStore({
    isOpen: true,
    isConfirm: false,
    message: obj?.message ?? "",
    html: obj?.html ?? "",
    height: obj?.height ?? "",
    width: obj?.width ?? "",
    maxHeight: obj?.maxHeight ?? "",
    maxWidth: obj?.maxWidth ?? "",
    minHeight: obj?.minHeight ?? "",
    minWidth: obj?.minWidth ?? "",
    isScrollY: obj?.isScrollY ?? false,
    isScrollX: obj?.isScrollX ?? false,
    yesFunc: isFunction(obj?.yesFunc) ? obj?.yesFunc : null,
    noFunc: null
  });
};
var confirm = (obj) => {
  setStore({
    isOpen: true,
    isConfirm: true,
    message: obj?.message ?? "",
    html: obj?.html ?? "",
    height: obj?.height ?? "",
    width: obj?.width ?? "",
    maxHeight: obj?.maxHeight ?? "",
    maxWidth: obj?.maxWidth ?? "",
    minHeight: obj?.minHeight ?? "",
    minWidth: obj?.minWidth ?? "",
    isScrollY: obj?.isScrollY ?? false,
    isScrollX: obj?.isScrollX ?? false,
    yesFunc: isFunction(obj?.yesFunc) ? obj?.yesFunc : null,
    noFunc: isFunction(obj?.noFunc) ? obj?.noFunc : null
  });
};
var close = () => {
  setStore({ ...defaultState });
};
var yes = () => {
  if (isFunction(store.yesFunc)) store.yesFunc();
  close();
};
var no = () => {
  if (isFunction(store.noFunc)) store.noFunc();
  close();
};
var reset = close;
var modalStore = {
  get: () => store,
  set: setStore,
  open,
  confirm,
  close,
  yes,
  no,
  reset
};

export { loadingStore, modalStore };
