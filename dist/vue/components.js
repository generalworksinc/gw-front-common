import { defineComponent as a, createVNode as t, Transition as o, createTextVNode as i } from "vue";
import { u as c, a as d, b as r } from "../notificationStore-DRI6SltE.js";
const l = [
  String,
  Object,
  Array
], u = [String, Object], v = /* @__PURE__ */ a({
  name: "ErrorMessage",
  props: {
    field: Object,
    classObj: l,
    id: String
  },
  setup(e) {
    return () => {
      const s = e.field?.validator?.message;
      return s ? t("div", {
        key: e.field?.id,
        id: e.id ?? e.field?.id,
        class: ["text-red-500", e.classObj]
      }, [s]) : null;
    };
  }
}), p = /* @__PURE__ */ a({
  name: "Loading",
  props: {
    class: l,
    style: u
  },
  setup(e) {
    const s = c();
    return () => t(o, {
      name: "loading-transition"
    }, {
      default: () => [s.isLoading.value ? t("div", {
        class: ["loading-page-manual element-animation", e.class],
        style: e.style
      }, [t("div", {
        class: "element-animation__inner"
      }, [t("div", {
        class: "loader"
      }, null)])]) : null]
    });
  }
}), f = /* @__PURE__ */ a({
  name: "Modal",
  props: {
    class: String
  },
  setup(e) {
    const s = d();
    return () => s.state.value.isOpen ? t("div", {
      class: `gw-modal ${(e.class ?? "").toString()}`
    }, [t("div", {
      class: "gw-modal__panel"
    }, [t("div", {
      class: "gw-modal__body"
    }, [s.state.value.message ? t("div", null, [s.state.value.message]) : s.state.value.html ? t("div", {
      innerHTML: s.state.value.html
    }, null) : null]), t("div", {
      class: "gw-modal__actions"
    }, [t("button", {
      type: "button",
      class: "gw-modal__btn",
      onClick: () => s.yes()
    }, [i("OK")]), t("button", {
      type: "button",
      class: "gw-modal__btn",
      onClick: () => s.no()
    }, [i("Cancel")])])])]) : null;
  }
}), b = /* @__PURE__ */ a({
  name: "Notifications",
  props: {
    class: String,
    position: {
      type: String,
      default: "top-right"
    }
  },
  setup(e) {
    const s = r();
    return () => t("div", {
      class: `${e.class ?? ""} gw-notifications pos-${e.position}`
    }, [s.notifications.value.map((n) => t("div", {
      class: "gw-notification",
      "data-type": n.type
    }, [n.message]))]);
  }
});
export {
  v as ErrorMessage,
  p as Loading,
  f as Modal,
  b as Notifications
};
