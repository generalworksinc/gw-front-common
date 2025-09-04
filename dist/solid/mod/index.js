import { loadingStore } from '../../chunk/4D7U5E3B.js';
export { loadingStore, modalStore, notificationStore } from '../../chunk/4D7U5E3B.js';
import { createUniqueId, untrack } from 'solid-js';
import { isServer, isDev } from 'solid-js/web';
import { createStore, reconcile } from 'solid-js/store';

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

// solid/features/loading/utils.ts
async function eventWithLoading(arg1, arg2, ...rest) {
  const store2 = typeof arg1 === "function" ? {
    isLoading: () => loadingStore.isLoading(),
    start: () => loadingStore.start(),
    stop: () => loadingStore.stop()
  } : arg1;
  const func = typeof arg1 === "function" ? arg1 : arg2;
  const params = rest;
  if (typeof store2.isLoading === "function") {
    if (store2.isLoading()) return false;
  } else if (store2.isLoading) {
    return false;
  }
  store2.start();
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const result = func(...params);
        if (result && typeof result.then === "function" && typeof result.catch === "function") {
          result.then((res) => {
            store2.stop();
            resolve(Promise.resolve(res));
          }).catch((err) => {
            store2.stop();
            resolve(Promise.reject(err));
          });
        } else {
          store2.stop();
          resolve(result);
        }
      } catch (ex) {
        store2.stop();
        reject(ex);
      }
    }, 1);
  });
}
var awaitLoadingWith = (store2, asyncFn) => {
  return async () => await eventWithLoading(store2, asyncFn);
};
var awaitLoadingWithScheduler = (asyncFn) => {
  return async () => await eventWithLoading(asyncFn);
};

export { authStore, awaitLoadingWith, awaitLoadingWithScheduler, eventWithLoading };
