import type { LoadingStore } from "./store.ts";

type AsyncFunction = (...args: any[]) => Promise<any>;
type SyncFunction = (...args: any[]) => any;

export const eventWithLoading = async (
  store: Pick<LoadingStore, "isLoading" | "startLoading" | "stopLoading">,
  func: AsyncFunction | SyncFunction,
  ...params: any[]
): Promise<any> => {
  if (store.isLoading) return false;
  store.startLoading();
  return await new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      try {
        const result = func(...params);
        if (result && typeof (result as any).then === "function" && typeof (result as any).catch === "function") {
          (result as Promise<any>)
            .then((res) => {
              store.stopLoading();
              resolve(Promise.resolve(res));
            })
            .catch((err) => {
              store.stopLoading();
              resolve(Promise.reject(err));
            });
        } else {
          store.stopLoading();
          resolve(result);
        }
      } catch (ex) {
        store.stopLoading();
        reject(ex);
      }
    }, 1);
  });
};

export const awaitLoadingWith = (
  store: Pick<LoadingStore, "isLoading" | "startLoading" | "stopLoading">,
  asyncFn: () => Promise<void>
) => {
  return async () => await eventWithLoading(store, asyncFn);
};
