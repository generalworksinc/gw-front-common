import { defineComponent as a, createVNode as e, computed as o, createTextVNode as n } from "vue";
const i = /* @__PURE__ */ a({
  name: "ErrorMessage",
  props: {
    error: String,
    class: String
  },
  setup(t) {
    return () => t.error ? e("div", {
      class: `text-red-500 ${(t.class ?? "").toString()}`
    }, [t.error]) : null;
  }
}), r = /* @__PURE__ */ a({
  name: "Loading",
  props: {
    store: Object,
    class: String,
    style: [String, Object],
    show: Boolean
  },
  setup(t) {
    const s = o(() => t.show ?? t.store?.isLoading.value ?? !1);
    return () => s.value ? e("div", {
      class: `gw-loading ${(t.class ?? "").toString()}`,
      style: t.style
    }, [e("span", {
      class: "gw-loading__spinner"
    }, null)]) : null;
  }
}), c = /* @__PURE__ */ a({
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
}), d = /* @__PURE__ */ a({
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
  i as ErrorMessage,
  r as Loading,
  c as Modal,
  d as Notifications
};
