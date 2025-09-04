import { ssr, ssrHydrationKey, escape, createComponent, ssrStyle } from "solid-js/web";
import { createSignal, Show, createMemo, For } from "solid-js";
import { createStore } from "solid-js/store";
const [isLoading, setIsLoading] = createSignal(false);
const loadingStore = {
  isLoading,
  start: () => setIsLoading(true),
  stop: () => setIsLoading(false),
  toggle: () => setIsLoading((v) => !v)
};
var _tmpl$$2 = ["<div", ' class="loading-page-manual element-animation"><div class="element-animation__inner"><div class="loader"></div></div></div>'], _tmpl$2$2 = ["<div", ">", "</div>"];
function Loading() {
  return ssr(_tmpl$2$2, ssrHydrationKey(), escape(createComponent(Show, {
    get when() {
      return loadingStore.isLoading();
    },
    get children() {
      return ssr(_tmpl$$2, ssrHydrationKey());
    }
  })));
}
const defaultState = {
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
const [store, setStore] = createStore({ ...defaultState });
const open = (obj) => {
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
const confirm = (obj) => {
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
const close = () => {
  setStore({ ...defaultState });
};
const yes = () => {
  if (isFunction(store.yesFunc)) store.yesFunc();
  close();
};
const no = () => {
  if (isFunction(store.noFunc)) store.noFunc();
  close();
};
const reset$1 = close;
const modalStore = {
  get: () => store,
  set: setStore,
  open,
  confirm,
  close,
  yes,
  no,
  reset: reset$1
};
var _tmpl$$1 = ["<div", ">", "</div>"], _tmpl$2$1 = ["<div", ' style="white-space:pre-wrap;">', "</div>"], _tmpl$3 = ["<button", ' type="button" class="cursor-pointer modal-default-button is-right"><span style="cursor:pointer;">はい</span></button>'], _tmpl$4 = ["<button", ' type="button" class="cursor-pointer modal-default-button is-left"><span style="cursor:pointer;">キャンセル</span></button>'], _tmpl$5 = ["<button", ' type="button" class="cursor-pointer modal-default-button is-right" id="modal_component_OK"><span style="cursor:pointer;">OK</span></button>'], _tmpl$6 = ["<div", ' class="modal-mask"><div class="modal-wrapper"><div class="modal-container" style="', '"><div class="modal-header"></div><div class="modal-body is-size-6"><!--$-->', "<!--/--><!--$-->", '<!--/--></div><div class="modal-footer"><!--$-->', "<!--/--><!--$-->", "<!--/--></div></div></div></div>"];
function Modal() {
  const containerStyle = createMemo(() => {
    const {
      width,
      height,
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
      isScrollY
    } = modalStore.get();
    return [width ? `width:${width};` : "", height ? `height:${height};` : "", maxWidth ? `max-width:${maxWidth};` : "", maxHeight ? `max-height:${maxHeight};` : "", minWidth ? `min-width:${minWidth};` : "", minHeight ? `min-height:${minHeight};` : "", isScrollY ? "overflow-y: scroll;" : ""].join("");
  });
  return createComponent(Show, {
    get when() {
      return modalStore.get().isOpen;
    },
    get children() {
      return ssr(_tmpl$6, ssrHydrationKey(), ssrStyle(containerStyle()), escape(createComponent(Show, {
        get when() {
          return modalStore.get().html;
        },
        get children() {
          return ssr(_tmpl$$1, ssrHydrationKey(), modalStore.get().html);
        }
      })), escape(createComponent(Show, {
        get when() {
          return modalStore.get().message;
        },
        get children() {
          return ssr(_tmpl$2$1, ssrHydrationKey(), escape(modalStore.get().message));
        }
      })), escape(createComponent(Show, {
        get when() {
          return modalStore.get().isConfirm;
        },
        get children() {
          return [ssr(_tmpl$3, ssrHydrationKey()), ssr(_tmpl$4, ssrHydrationKey())];
        }
      })), escape(createComponent(Show, {
        get when() {
          return !modalStore.get().isConfirm;
        },
        get children() {
          return ssr(_tmpl$5, ssrHydrationKey());
        }
      })));
    }
  });
}
const randomId = () => Math.random().toString(36).slice(2);
const [items, setItems] = createSignal([]);
function add(n) {
  const item = {
    id: randomId(),
    message: n.message ?? n.text ?? "",
    type: n.type,
    removeAfter: n.removeAfter
  };
  setItems((prev) => [...prev, item]);
  if (item.removeAfter && item.removeAfter > 0) {
    setTimeout(() => remove(item.id), item.removeAfter);
  }
}
function remove(id) {
  setItems((prev) => prev.filter((n) => n.id !== String(id)));
}
function reset() {
  setItems([]);
}
const notificationStore = {
  get: () => ({ list: items() }),
  add,
  remove,
  reset
};
var _tmpl$ = ["<div", ' class="notifications"><div class="', '">', "</div></div>"], _tmpl$2 = ["<div", ' class="', '"><div class="', '"><pre>', '</pre></div><button type="button" class="', '" aria-label="delete notification">&times;</button></div>'];
function Notifications(props) {
  const store2 = () => props.store ?? notificationStore;
  const items2 = () => store2()?.get?.()?.list ?? [];
  const pos = () => props.position ?? "top-right";
  return ssr(_tmpl$, ssrHydrationKey(), `z-50 position-${escape(pos(), true)} default-position-style-${escape(pos(), true)}`, escape(createComponent(For, {
    get each() {
      return items2();
    },
    children: (notification) => ssr(_tmpl$2, ssrHydrationKey(), `z-50 notification default-notification-style default-notification-${escape(notification.type, true)}`, `z-50 notification-content default-notification-style-content default-notification-${escape(notification.type, true)}`, escape(notification.message), `z-50 notification-button default-notification-style-button default-notification-${escape(notification.type, true)}`)
  })));
}
export {
  Loading,
  Modal,
  Notifications
};
