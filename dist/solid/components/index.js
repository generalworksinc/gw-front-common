import { loadingStore, modalStore, notificationStore } from '../../chunk/YAH6OEHT.js';
import { delegateEvents, template, insert, createComponent, effect, addEventListener, style, className } from 'solid-js/web';
import { Show, createMemo, For } from 'solid-js';

var _tmpl$ = /* @__PURE__ */ template(`<div class="loading-page-manual element-animation"><div class=element-animation__inner><div class=loader>`);
var _tmpl$2 = /* @__PURE__ */ template(`<div>`);
function Loading() {
  return (() => {
    var _el$ = _tmpl$2();
    insert(_el$, createComponent(Show, {
      get when() {
        return loadingStore.isLoading();
      },
      get children() {
        return _tmpl$();
      }
    }));
    return _el$;
  })();
}
var _tmpl$3 = /* @__PURE__ */ template(`<div>`);
var _tmpl$22 = /* @__PURE__ */ template(`<div style=white-space:pre-wrap>`);
var _tmpl$32 = /* @__PURE__ */ template(`<button type=button class="cursor-pointer modal-default-button is-right"><span style=cursor:pointer>\u306F\u3044`);
var _tmpl$4 = /* @__PURE__ */ template(`<button type=button class="cursor-pointer modal-default-button is-left"><span style=cursor:pointer>\u30AD\u30E3\u30F3\u30BB\u30EB`);
var _tmpl$5 = /* @__PURE__ */ template(`<button type=button class="cursor-pointer modal-default-button is-right"id=modal_component_OK><span style=cursor:pointer>OK`);
var _tmpl$6 = /* @__PURE__ */ template(`<div class=modal-mask><div class=modal-wrapper><div class=modal-container><div class=modal-header></div><div class="modal-body is-size-6"></div><div class=modal-footer>`);
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
      var _el$ = _tmpl$6(), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.firstChild, _el$5 = _el$4.nextSibling, _el$8 = _el$5.nextSibling;
      insert(_el$5, createComponent(Show, {
        get when() {
          return modalStore.get().html;
        },
        get children() {
          var _el$6 = _tmpl$3();
          effect(() => _el$6.innerHTML = modalStore.get().html);
          return _el$6;
        }
      }), null);
      insert(_el$5, createComponent(Show, {
        get when() {
          return modalStore.get().message;
        },
        get children() {
          var _el$7 = _tmpl$22();
          insert(_el$7, () => modalStore.get().message);
          return _el$7;
        }
      }), null);
      insert(_el$8, createComponent(Show, {
        get when() {
          return modalStore.get().isConfirm;
        },
        get children() {
          return [(() => {
            var _el$9 = _tmpl$32();
            addEventListener(_el$9, "click", modalStore.yes, true);
            return _el$9;
          })(), (() => {
            var _el$0 = _tmpl$4();
            addEventListener(_el$0, "click", modalStore.no, true);
            return _el$0;
          })()];
        }
      }), null);
      insert(_el$8, createComponent(Show, {
        get when() {
          return !modalStore.get().isConfirm;
        },
        get children() {
          var _el$1 = _tmpl$5();
          addEventListener(_el$1, "click", modalStore.close, true);
          return _el$1;
        }
      }), null);
      effect((_$p) => style(_el$3, containerStyle(), _$p));
      return _el$;
    }
  });
}
delegateEvents(["click"]);
var _tmpl$7 = /* @__PURE__ */ template(`<div class=notifications><div class="z-50 position-top-right default-position-style-top-right">`);
var _tmpl$23 = /* @__PURE__ */ template(`<div aria-live=polite><div><pre></pre></div><button type=button aria-label="delete notification">&times;`);
function Notifications() {
  const removeNotificationHandler = (id) => {
    if (id) notificationStore.remove(id);
  };
  return (() => {
    var _el$ = _tmpl$7(), _el$2 = _el$.firstChild;
    insert(_el$2, createComponent(For, {
      get each() {
        return notificationStore.get().list;
      },
      children: (notification) => (() => {
        var _el$3 = _tmpl$23(), _el$4 = _el$3.firstChild, _el$5 = _el$4.firstChild, _el$6 = _el$4.nextSibling;
        insert(_el$5, () => notification.message);
        _el$6.$$click = () => removeNotificationHandler(notification.id);
        effect((_p$) => {
          var _v$ = `z-50 notification default-notification-style default-notification-${notification.type}`, _v$2 = `z-50 notification-content default-notification-style-content default-notification-${notification.type}`, _v$3 = `z-50 notification-button default-notification-style-button default-notification-${notification.type}`;
          _v$ !== _p$.e && className(_el$3, _p$.e = _v$);
          _v$2 !== _p$.t && className(_el$4, _p$.t = _v$2);
          _v$3 !== _p$.a && className(_el$6, _p$.a = _v$3);
          return _p$;
        }, {
          e: void 0,
          t: void 0,
          a: void 0
        });
        return _el$3;
      })()
    }));
    return _el$;
  })();
}
delegateEvents(["click"]);

export { Loading, Modal, Notifications };
