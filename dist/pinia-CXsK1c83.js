import { getActivePinia as e } from "pinia";
let n = null;
function o(i) {
  n = i;
}
function a() {
  if (n) return n;
  const i = e();
  if (i) return i;
  throw new Error(
    "[gw-front-common] Pinia instance is not available. Call setPinia(pinia) once on app init or enable the Nuxt module."
  );
}
export {
  a as r,
  o as s
};
