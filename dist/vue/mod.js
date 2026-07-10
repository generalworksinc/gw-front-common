import { u as c } from "../notificationStore-Vvcg5RhZ.js";
import { a as p, b as L } from "../notificationStore-Vvcg5RhZ.js";
async function r(n, ...e) {
  const o = c();
  return o.isLoading ? !1 : (o.startLoading(), await new Promise((i, s) => {
    setTimeout(() => {
      try {
        const t = n(...e);
        t instanceof Promise || t && typeof t.then == "function" && typeof t.catch == "function" ? t.then((a) => {
          o.stopLoading(), i(a);
        }).catch((a) => {
          o.stopLoading(), s(a);
        }) : (o.stopLoading(), i(t));
      } catch (t) {
        o.stopLoading(), s(t);
      }
    }, 1);
  }));
}
const u = (n) => async () => await r(n);
export {
  u as awaitLoadingWith,
  r as eventWithLoading,
  c as useLoading,
  p as useModal,
  L as useNotification
};
