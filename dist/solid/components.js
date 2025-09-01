import { createVNode, createTextVNode } from "vue";
import { Show, For } from "solid-js";
import { l as loadingStore, d as defaultStore } from "../notificationStore-BpzZy_iz.js";
function Loading() {
  return createVNode("div", null, [createVNode(Show, {
    "when": loadingStore.isLoading()
  }, {
    default: () => [createVNode("div", {
      "class": "loading-page-manual element-animation"
    }, [createVNode("div", {
      "class": "element-animation__inner"
    }, [createVNode("div", {
      "class": "loader"
    }, null)])])]
  })]);
}
function Notifications(props) {
  const store = () => props.store ?? defaultStore;
  const items = () => store()?.get?.()?.list ?? [];
  const pos = () => props.position ?? "top-right";
  const removeNotificationHandler = (id) => {
    if (id != null) store().remove?.(id);
  };
  return createVNode("div", {
    "class": "notifications"
  }, [createVNode("div", {
    "class": `z-50 position-${pos()} default-position-style-${pos()}`
  }, [createVNode(For, {
    "each": items()
  }, {
    default: (notification) => createVNode("div", {
      "class": `z-50 notification default-notification-style default-notification-${notification.type}`
    }, [createVNode("div", {
      "class": `z-50 notification-content default-notification-style-content default-notification-${notification.type}`
    }, [createVNode("pre", null, [notification.message])]), createVNode("button", {
      "type": "button",
      "class": `z-50 notification-button default-notification-style-button default-notification-${notification.type}`,
      "onClick": () => removeNotificationHandler(notification.id),
      "aria-label": "delete notification"
    }, [createTextVNode("×")])])
  })])]);
}
export {
  Loading,
  Notifications
};
