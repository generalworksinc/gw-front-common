import { createSignal, createUniqueId, untrack } from 'solid-js';
import { isServer, isDev } from 'solid-js/web';
import { createStore, reconcile } from 'solid-js/store';

// node_modules/@solid-primitives/storage/dist/persisted.js
function makePersisted(signal, options = {}) {
  const storage = options.storage || globalThis.localStorage;
  const name = options.name || `storage-${createUniqueId()}`;
  if (!storage) {
    return [signal[0], signal[1], null];
  }
  const storageOptions = options.storageOptions;
  const serialize = options.serialize || JSON.stringify.bind(JSON);
  const deserialize = options.deserialize || JSON.parse.bind(JSON);
  const init = storage.getItem(name, storageOptions);
  const set = typeof signal[0] === "function" ? (data) => {
    try {
      const value = deserialize(data);
      signal[1](() => value);
    } catch (e) {
      if (isDev)
        console.warn(e);
    }
  } : (data) => {
    try {
      const value = deserialize(data);
      signal[1](reconcile(value));
    } catch (e) {
      if (isDev)
        console.warn(e);
    }
  };
  let unchanged = true;
  if (init instanceof Promise)
    init.then((data) => unchanged && data && set(data));
  else if (init)
    set(init);
  if (typeof options.sync?.[0] === "function") {
    const get = typeof signal[0] === "function" ? signal[0] : () => signal[0];
    options.sync[0]((data) => {
      if (data.key !== name || !isServer && (data.url || globalThis.location.href) !== globalThis.location.href || data.newValue === serialize(untrack(get))) {
        return;
      }
      set(data.newValue);
    });
  }
  return [
    signal[0],
    typeof signal[0] === "function" ? (value) => {
      const output = signal[1](value);
      const serialized = value != null ? serialize(output) : value;
      options.sync?.[1](name, serialized);
      if (serialized != null)
        storage.setItem(name, serialized, storageOptions);
      else
        storage.removeItem(name, storageOptions);
      unchanged = false;
      return output;
    } : (...args) => {
      signal[1](...args);
      const value = serialize(untrack(() => signal[0]));
      options.sync?.[1](name, value);
      storage.setItem(name, value, storageOptions);
      unchanged = false;
    },
    init
  ];
}
var defaultState = {
  id: null,
  email: null,
  fullName: null,
  firstName: null,
  lastName: null
};
var [store, setStore] = createStore(defaultState);
var [persistedStore, persistedSetStore] = isServer ? [store, setStore] : makePersisted([store, setStore], { name: "authStore" });
var reset = () => {
  persistedSetStore({ ...defaultState });
};
var isLoggedIn = () => persistedStore.id !== null;
var authStore = {
  get: () => persistedStore,
  set: persistedSetStore,
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
            resolve(Promise.resolve(res));
          }).catch((err) => {
            loadingStore.stop();
            resolve(Promise.reject(err));
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
var [store2, setStore2] = createStore({ ...defaultState2 });
var open = (obj) => {
  setStore2({
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
  setStore2({
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
  setStore2({ ...defaultState2 });
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
  set: setStore2,
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
var [store3, setStore3] = createStore({ ...defaultState3 });
var add = (payload) => {
  const id = randomId();
  const notification = { ...payload, id };
  setStore3("list", (list) => [...list, notification]);
  if (notification.removeAfter) {
    setTimeout(() => {
      remove(id);
    }, notification.removeAfter);
  }
};
var remove = (id) => {
  setStore3("list", (list) => list.filter((n) => n.id !== id));
};
var reset3 = () => {
  setStore3({ ...defaultState3 });
};
var notificationStore = {
  get: () => ({ list: store3.list }),
  add,
  remove,
  reset: reset3
};

export { authStore, awaitLoadingWith, eventWithLoading, loadingStore, modalStore, notificationStore };
