import { createVNode as t, createTextVNode as s } from "vue";
import { Show as c, For as d } from "solid-js";
import { l as f, d as r } from "../notificationStore-DwNojmzH.js";
function v() {
  return t("div", null, [t(c, {
    when: f.isLoading()
  }, {
    default: () => [t("div", {
      class: "loading-page-manual element-animation"
    }, [t("div", {
      class: "element-animation__inner"
    }, [t("div", {
      class: "loader"
    }, null)])])]
  })]);
}
function g(o) {
  const e = () => o.store ?? r, a = () => e()?.get?.()?.list ?? [], n = () => o.position ?? "top-right", l = (i) => {
    i != null && e().remove?.(i);
  };
  return t("div", {
    class: "notifications"
  }, [t("div", {
    class: `z-50 position-${n()} default-position-style-${n()}`
  }, [t(d, {
    each: a()
  }, {
    default: (i) => t("div", {
      class: `z-50 notification default-notification-style default-notification-${i.type}`
    }, [t("div", {
      class: `z-50 notification-content default-notification-style-content default-notification-${i.type}`
    }, [t("pre", null, [i.message])]), t("button", {
      type: "button",
      class: `z-50 notification-button default-notification-style-button default-notification-${i.type}`,
      onClick: () => l(i.id),
      "aria-label": "delete notification"
    }, [s("×")])])
  })])]);
}
export {
  v as Loading,
  g as Notifications
};
