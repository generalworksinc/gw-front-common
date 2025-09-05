import { loadingStore, modalStore } from '../../chunk/ZTUZDGMB.js';
import { ssr, escape, createComponent, ssrStyle } from 'solid-js/web';
import { Show, createMemo } from 'solid-js';

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

export { Loading, Modal };
