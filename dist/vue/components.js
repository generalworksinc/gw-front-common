import { defineComponent, createElementBlock, createCommentVNode, openBlock, normalizeClass, toDisplayString, createElementVNode, createVNode, unref, Transition, withCtx, normalizeStyle, Fragment, renderList, renderSlot } from "vue";
import { u as useLoading, a as useModal, b as useNotification } from "../notificationStore-DWRD-bq7.js";
const _hoisted_1$2 = ["id"];
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ErrorMessage",
  props: {
    field: {},
    classObj: {},
    id: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return _ctx.field?.validator?.message ? (openBlock(), createElementBlock("div", {
        key: _ctx.field?.id,
        id: _ctx.id ?? _ctx.field?.id,
        class: normalizeClass(["text-red-500", _ctx.classObj])
      }, toDisplayString(_ctx.field?.validator?.message), 11, _hoisted_1$2)) : createCommentVNode("", true);
    };
  }
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Loading",
  props: {
    class: {},
    style: {},
    store: {}
  },
  setup(__props) {
    const props = __props;
    const loadingStore = props.store ?? useLoading();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createElementVNode("div", null, "loading: " + toDisplayString(unref(loadingStore).isLoading), 1),
        createVNode(Transition, { name: "loading-transition" }, {
          default: withCtx(() => [
            unref(loadingStore).isLoading ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["loading-page-manual element-animation", props.class]),
              style: normalizeStyle(props.style)
            }, [..._cache[0] || (_cache[0] = [
              createElementVNode("div", { class: "element-animation__inner" }, [
                createElementVNode("div", { class: "loader" })
              ], -1)
            ])], 6)) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]);
    };
  }
});
const _hoisted_1$1 = { class: "gw-modal__panel" };
const _hoisted_2$1 = { class: "gw-modal__body" };
const _hoisted_3$1 = { key: 0 };
const _hoisted_4 = ["innerHTML"];
const _hoisted_5 = { class: "gw-modal__actions" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Modal",
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    const store = useModal();
    return (_ctx, _cache) => {
      return unref(store).state.value.isOpen ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["gw-modal", props.class])
      }, [
        createElementVNode("div", _hoisted_1$1, [
          createElementVNode("div", _hoisted_2$1, [
            unref(store).state.value.message ? (openBlock(), createElementBlock("div", _hoisted_3$1, toDisplayString(unref(store).state.value.message), 1)) : unref(store).state.value.html ? (openBlock(), createElementBlock("div", {
              key: 1,
              innerHTML: unref(store).state.value.html
            }, null, 8, _hoisted_4)) : createCommentVNode("", true)
          ]),
          createElementVNode("div", _hoisted_5, [
            createElementVNode("button", {
              type: "button",
              class: "gw-modal__btn",
              onClick: _cache[0] || (_cache[0] = ($event) => unref(store).yes())
            }, "OK"),
            createElementVNode("button", {
              type: "button",
              class: "gw-modal__btn",
              onClick: _cache[1] || (_cache[1] = ($event) => unref(store).no())
            }, "Cancel")
          ])
        ])
      ], 2)) : createCommentVNode("", true);
    };
  }
});
const _hoisted_1 = { class: "notifications" };
const _hoisted_2 = { class: "z-50 position-top-right default-position-style-top-right" };
const _hoisted_3 = ["onClick"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Notifications",
  setup(__props) {
    const store = useNotification();
    const removeNotificationHandler = (id) => {
      if (id) store.remove(id);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createElementVNode("div", _hoisted_2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(store).notifications, (n) => {
            return openBlock(), createElementBlock("div", {
              key: n.id,
              class: normalizeClass(["z-50 notification default-notification-style", `default-notification-${n.type}`]),
              role: "status",
              "aria-live": "polite"
            }, [
              createElementVNode("div", {
                class: normalizeClass(["z-50 notification-content default-notification-style-content", `default-notification-${n.type}`])
              }, [
                renderSlot(_ctx.$slots, "default", {}, () => [
                  createElementVNode("pre", null, toDisplayString(n.message), 1)
                ])
              ], 2),
              createElementVNode("button", {
                class: normalizeClass(["z-50 notification-button default-notification-style-button", `default-notification-${n.type}`]),
                onClick: ($event) => removeNotificationHandler(n.id),
                "aria-label": "delete notification"
              }, " × ", 10, _hoisted_3)
            ], 2);
          }), 128))
        ])
      ]);
    };
  }
});
export {
  _sfc_main$3 as ErrorMessage,
  _sfc_main$2 as Loading,
  _sfc_main$1 as Modal,
  _sfc_main as Notifications
};
