import { u as r } from "../notificationStore-1ySYS_JF.js";
import { a as p, b as L } from "../notificationStore-1ySYS_JF.js";
async function c(i, ...e) {
  const o = r();
  return o.isLoading ? !1 : (o.startLoading(), await new Promise((n, s) => {
    setTimeout(() => {
      try {
        const t = i(...e);
        t instanceof Promise || t && typeof t.then == "function" && typeof t.catch == "function" ? t.then((a) => {
          o.stopLoading(), n(Promise.resolve(a));
        }).catch((a) => {
          o.stopLoading(), n(Promise.reject(a));
        }) : (o.stopLoading(), n(t));
      } catch (t) {
        o.stopLoading(), s(t);
      }
    }, 1);
  }));
}
const u = (i) => async () => await c(i);
export {
  u as awaitLoadingWith,
  c as eventWithLoading,
  r as useLoading,
  p as useModal,
  L as useNotification
};
