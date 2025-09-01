import { u as useLoading } from "../notificationStore-DWRD-bq7.js";
import { a, b } from "../notificationStore-DWRD-bq7.js";
async function eventWithLoading(func, ...params) {
  const loading = useLoading();
  if (loading.isLoading) {
    return false;
  }
  loading.startLoading();
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const result = func(...params);
        if (result instanceof Promise || result && typeof result.then === "function" && typeof result.catch === "function") {
          result.then((res) => {
            loading.stopLoading();
            resolve(Promise.resolve(res));
          }).catch((err) => {
            loading.stopLoading();
            resolve(Promise.reject(err));
          });
        } else {
          loading.stopLoading();
          resolve(result);
        }
      } catch (ex) {
        loading.stopLoading();
        reject(ex);
      }
    }, 1);
  });
}
const awaitLoadingWith = (asyncFn) => {
  return async () => await eventWithLoading(asyncFn);
};
export {
  awaitLoadingWith,
  eventWithLoading,
  useLoading,
  a as useModal,
  b as useNotification
};
