import { u as r } from "../notificationStore-DgRNrhSb.js";
import { a as p, b as L } from "../notificationStore-DgRNrhSb.js";
async function c(a, ...e) {
  const o = r();
  return o.isLoading.value ? !1 : (o.startLoading(), await new Promise((i, s) => {
    setTimeout(() => {
      try {
        const t = a(...e);
        t instanceof Promise || t && typeof t.then == "function" && typeof t.catch == "function" ? t.then((n) => {
          o.stopLoading(), i(Promise.resolve(n));
        }).catch((n) => {
          o.stopLoading(), i(Promise.reject(n));
        }) : (o.stopLoading(), i(t));
      } catch (t) {
        o.stopLoading(), s(t);
      }
    }, 1);
  }));
}
const f = (a) => async () => await c(a);
export {
  f as awaitLoadingWith,
  c as eventWithLoading,
  r as useLoading,
  p as useModal,
  L as useNotification
};
