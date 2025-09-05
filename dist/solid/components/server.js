import { loadingStore, modalStore, notificationStore } from '../../chunk/ZTUZDGMB.js';
import { ssr, escape, createComponent, ssrStyle } from 'solid-js/web';
import { Show, createMemo, For } from 'solid-js';

var _tmpl$ = '<div class="loading-page-manual element-animation"><div class="element-animation__inner"><div class="loader"></div></div></div>';
var _tmpl$2 = ["<div>", "</div>"];
function Loading() {
  return ssr(_tmpl$2, escape(createComponent(Show, {
    get when() {
      return loadingStore.isLoading();
    },
    get children() {
      return ssr(_tmpl$);
    }
  })));
}
var _tmpl$3 = ["<div>", "</div>"];
var _tmpl$22 = ['<div style="white-space:pre-wrap;">', "</div>"];
var _tmpl$32 = '<button type="button" class="cursor-pointer modal-default-button is-right"><span style="cursor:pointer;">\u306F\u3044</span></button>';
var _tmpl$4 = '<button type="button" class="cursor-pointer modal-default-button is-left"><span style="cursor:pointer;">\u30AD\u30E3\u30F3\u30BB\u30EB</span></button>';
var _tmpl$5 = '<button type="button" class="cursor-pointer modal-default-button is-right" id="modal_component_OK"><span style="cursor:pointer;">OK</span></button>';
var _tmpl$6 = ['<div class="modal-mask"><div class="modal-wrapper"><div class="modal-container" style="', '"><div class="modal-header"></div><div class="modal-body is-size-6">', "", '</div><div class="modal-footer">', "", "</div></div></div></div>"];
function Modal() {
  const containerStyle = createMemo(() => {
    const {
      width,
      height,
      maxWidth,
      maxHeight,
      minWidth,
      minHeight,
      isScrollY
    } = modalStore.get();
    return [width ? `width:${width};` : "", height ? `height:${height};` : "", maxWidth ? `max-width:${maxWidth};` : "", maxHeight ? `max-height:${maxHeight};` : "", minWidth ? `min-width:${minWidth};` : "", minHeight ? `min-height:${minHeight};` : "", isScrollY ? "overflow-y: scroll;" : ""].join("");
  });
  return createComponent(Show, {
    get when() {
      return modalStore.get().isOpen;
    },
    get children() {
      return ssr(_tmpl$6, ssrStyle(containerStyle()), escape(createComponent(Show, {
        get when() {
          return modalStore.get().html;
        },
        get children() {
          return ssr(_tmpl$3, modalStore.get().html);
        }
      })), escape(createComponent(Show, {
        get when() {
          return modalStore.get().message;
        },
        get children() {
          return ssr(_tmpl$22, escape(modalStore.get().message));
        }
      })), escape(createComponent(Show, {
        get when() {
          return modalStore.get().isConfirm;
        },
        get children() {
          return [ssr(_tmpl$32), ssr(_tmpl$4)];
        }
      })), escape(createComponent(Show, {
        get when() {
          return !modalStore.get().isConfirm;
        },
        get children() {
          return ssr(_tmpl$5);
        }
      })));
    }
  });
}
var _tmpl$7 = ['<div class="notifications"><div class="', '">', "</div></div>"];
var _tmpl$23 = ['<div class="', '"><div class="', '"><pre>', '</pre></div><button type="button" class="', '" aria-label="delete notification">&times;</button></div>'];
function Notifications(props) {
  const store = () => props.store ?? notificationStore;
  const items = () => store()?.get?.()?.list ?? [];
  const pos = () => props.position ?? "top-right";
  return ssr(_tmpl$7, `z-50 position-${escape(pos(), true)} default-position-style-${escape(pos(), true)}`, escape(createComponent(For, {
    get each() {
      return items();
    },
    children: (notification) => ssr(_tmpl$23, `z-50 notification default-notification-style default-notification-${escape(notification.type, true)}`, `z-50 notification-content default-notification-style-content default-notification-${escape(notification.type, true)}`, escape(notification.message), `z-50 notification-button default-notification-style-button default-notification-${escape(notification.type, true)}`)
  })));
}

export { Loading, Modal, Notifications };
