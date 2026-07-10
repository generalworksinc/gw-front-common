import { createStore, reconcile, unwrap } from 'solid-js/store';
import { isServer, createComponent } from 'solid-js/web';
import { createSignal, createContext, useContext } from 'solid-js';

// solid/features/store/resettableStore.ts
function createResettableStore(defaultState4, options) {
  const snapshot = structuredClone(defaultState4);
  const [store4, setStore3] = createStore(structuredClone(snapshot));
  const persist = options?.persist;
  const storage = persist ? persist.storage ?? (isServer ? void 0 : globalThis.localStorage) : void 0;
  if (persist && storage) {
    try {
      const raw = storage.getItem(persist.name);
      if (raw != null) {
        setStore3(reconcile({ ...snapshot, ...JSON.parse(raw) }));
      }
    } catch {
    }
  }
  let scheduled = false;
  const schedulePersist = () => {
    if (!persist || !storage || scheduled) return;
    scheduled = true;
    queueMicrotask(() => {
      scheduled = false;
      try {
        storage.setItem(persist.name, JSON.stringify(unwrap(store4)));
      } catch (err) {
        console.warn("Failed to persist resettable store.", err);
      }
    });
  };
  const set2 = ((...args) => {
    setStore3(...args);
    schedulePersist();
  });
  const reset4 = () => {
    setStore3(reconcile(structuredClone(snapshot)));
    schedulePersist();
  };
  return { store: store4, set: set2, reset: reset4 };
}

// solid/features/auth/authStore.ts
var defaultState = {
  id: null,
  email: null,
  fullName: null,
  firstName: null,
  lastName: null
};
var { store, set, reset } = createResettableStore(defaultState, {
  persist: { name: "authStore" }
});
var isLoggedIn = () => store.id !== null;
var authStore = {
  get: () => store,
  set,
  reset,
  isLoggedIn
};
var [isLoading, setIsLoading] = createSignal(false);
var loadingStore = {
  isLoading,
  start: () => setIsLoading(true),
  stop: () => setIsLoading(false),
  toggle: () => setIsLoading((v) => !v)
};

// solid/features/loading/utils.ts
var eventWithLoading = async (func, ...params) => {
  if (loadingStore.isLoading()) {
    return false;
  }
  loadingStore.start();
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const result = func(...params);
        if (result instanceof Promise || result && typeof result.then === "function" && typeof result.catch === "function") {
          result.then((res) => {
            loadingStore.stop();
            resolve(res);
          }).catch((err) => {
            loadingStore.stop();
            reject(err);
          });
        } else {
          loadingStore.stop();
          resolve(result);
        }
      } catch (ex) {
        loadingStore.stop();
        reject(ex);
      }
    }, 1);
  });
};
var awaitLoadingWith = (asyncFn) => {
  return async () => await eventWithLoading(asyncFn);
};
var defaultState2 = {
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
var [store2, setStore] = createStore({ ...defaultState2 });
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
  setStore({ ...defaultState2 });
};
var yes = () => {
  if (isFunction(store2.yesFunc)) store2.yesFunc();
  close();
};
var no = () => {
  if (isFunction(store2.noFunc)) store2.noFunc();
  close();
};
var reset2 = close;
var modalStore = {
  get: () => store2,
  set: setStore,
  open,
  confirm,
  close,
  yes,
  no,
  reset: reset2
};
var randomId = () => Math.random().toString(36).slice(2);
var defaultState3 = {
  list: []
};
var [store3, setStore2] = createStore({ ...defaultState3 });
var add = (payload) => {
  const id = randomId();
  const notification = {
    ...payload,
    id,
    removeAfter: payload.removeAfter ?? 3e3
  };
  setStore2("list", (list) => [...list, notification]);
  if (notification.removeAfter > 0) {
    setTimeout(() => {
      remove(id);
    }, notification.removeAfter);
  }
};
var remove = (id) => {
  setStore2("list", (list) => list.filter((n) => n.id !== id));
};
var reset3 = () => {
  setStore2({ ...defaultState3 });
};
var notificationStore = {
  get: () => ({ list: store3.list }),
  add,
  remove,
  reset: reset3
};
function createStoreContext(createStore4) {
  const Ctx = createContext();
  const Provider = (props) => {
    const store4 = createStore4();
    return createComponent(Ctx.Provider, {
      value: store4,
      get children() {
        return props.children;
      }
    });
  };
  const useStore = () => {
    const v = useContext(Ctx);
    if (!v) throw new Error("StoreContext must be used within its Provider");
    return v;
  };
  return {
    Provider,
    useStore,
    Context: Ctx
  };
}

export { authStore, awaitLoadingWith, createResettableStore, createStoreContext, eventWithLoading, loadingStore, modalStore, notificationStore };
