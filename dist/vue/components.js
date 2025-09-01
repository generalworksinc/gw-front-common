import { defineComponent as a, createVNode as e, Transition as l, createTextVNode as n } from "vue";
import { u as o } from "../loadingStore-DFAXCLyM.js";
const i = [String, Object, Array], c = [String, Object], u = /* @__PURE__ */ a({
  name: "ErrorMessage",
  props: {
    field: Object,
    classObj: i,
    id: String
  },
  setup(t) {
    return () => {
      const s = t.field?.validator?.message;
      return s ? e("div", {
        key: t.field?.id,
        id: t.id ?? t.field?.id,
        class: ["text-red-500", t.classObj]
      }, [s]) : null;
    };
  }
}), g = /* @__PURE__ */ a({
  name: "Loading",
  props: {
    class: i,
    style: c
  },
  setup(t) {
    const s = o();
    return () => e(l, {
      name: "loading-transition"
    }, {
      default: () => [s.isLoading.value ? e("div", {
        class: ["loading-page-manual element-animation", t.class],
        style: t.style
      }, [e("div", {
        class: "element-animation__inner"
      }, [e("div", {
        class: "loader"
      }, null)])]) : null]
    });
  }
}), m = /* @__PURE__ */ a({
  name: "Modal",
  props: {
    store: Object,
    class: String
  },
  setup(t) {
    return () => t.store.state.value.isOpen ? e("div", {
      class: `gw-modal ${(t.class ?? "").toString()}`
    }, [e("div", {
      class: "gw-modal__panel"
    }, [e("div", {
      class: "gw-modal__body"
    }, [t.store.state.value.message ? e("div", null, [t.store.state.value.message]) : t.store.state.value.html ? e("div", {
      innerHTML: t.store.state.value.html
    }, null) : null]), e("div", {
      class: "gw-modal__actions"
    }, [e("button", {
      type: "button",
      class: "gw-modal__btn",
      onClick: () => t.store.yes()
    }, [n("OK")]), e("button", {
      type: "button",
      class: "gw-modal__btn",
      onClick: () => t.store.no()
    }, [n("Cancel")])])])]) : null;
  }
}), v = /* @__PURE__ */ a({
  name: "Notifications",
  props: {
    store: Object,
    class: String,
    position: {
      type: String,
      default: "top-right"
    }
  },
  setup(t) {
    return () => e("div", {
      class: `${t.class ?? ""} gw-notifications pos-${t.position}`
    }, [t.store.notifications.value.map((s) => e("div", {
      class: "gw-notification",
      "data-type": s.type
    }, [s.message]))]);
  }
});
export {
  u as ErrorMessage,
  g as Loading,
  m as Modal,
  v as Notifications
};
