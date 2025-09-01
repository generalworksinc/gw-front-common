import { defineComponent as a, createVNode as e, computed as o, Transition as c, createTextVNode as n } from "vue";
import { u as d } from "../loadingStore-DFAXCLyM.js";
const i = [String, Object, Array], r = [String, Object], m = /* @__PURE__ */ a({
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
}), v = /* @__PURE__ */ a({
  name: "Loading",
  props: {
    class: i,
    style: r
  },
  setup(t) {
    const s = d(), l = o(() => s.isLoading.value);
    return () => e(c, {
      name: "loading-transition"
    }, {
      default: () => [l.value ? e("div", {
        class: ["loading-page-manual element-animation", t.class],
        style: t.style
      }, [e("div", {
        class: "element-animation__inner"
      }, [e("div", {
        class: "loader"
      }, null)])]) : null]
    });
  }
}), b = /* @__PURE__ */ a({
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
}), f = /* @__PURE__ */ a({
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
  m as ErrorMessage,
  v as Loading,
  b as Modal,
  f as Notifications
};
