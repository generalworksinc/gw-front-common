import { t as e } from "./pinia-CaUyjXLG.js";
import { defineStore as t } from "pinia";
import { computed as n } from "vue";
// vue/features/loading/loadingStore.ts
var r = t("loading", {
	state: () => ({ isLoading: !1 }),
	actions: {
		setLoading(e) {
			this.isLoading = e;
		},
		startLoading() {
			this.setLoading(!0);
		},
		stopLoading() {
			this.setLoading(!1);
		}
	}
});
function i() {
	return r(e());
}
// vue/features/modal/modalStore.ts
function a(e) {
	return typeof e == "function";
}
var o = () => ({
	isOpen: !1,
	isConfirm: !1,
	html: "",
	message: "",
	height: "",
	width: "",
	maxHeight: "",
	maxWidth: "",
	minHeight: "",
	minWidth: "",
	isScrollY: !1,
	isScrollX: !1,
	containerClass: "",
	bodyClass: "",
	footerClass: "",
	reverseButtons: !1,
	yesFunc: null,
	noFunc: null
}), s = t("modal", {
	state: () => o(),
	actions: {
		open(e) {
			this.isOpen = !0, this.isConfirm = !1, this.message = e?.message ?? "", this.html = e?.html ?? "", this.height = e?.height ?? "", this.width = e?.width ?? "", this.maxHeight = e?.maxHeight ?? "", this.maxWidth = e?.maxWidth ?? "", this.minHeight = e?.minHeight ?? "", this.minWidth = e?.minWidth ?? "", this.isScrollY = e?.isScrollY ?? !1, this.isScrollX = e?.isScrollX ?? !1, this.containerClass = e?.containerClass ?? "", this.bodyClass = e?.bodyClass ?? "", this.footerClass = e?.footerClass ?? "", this.reverseButtons = e?.reverseButtons ?? !1, this.yesFunc = a(e?.yesFunc) ? e?.yesFunc : () => null, this.noFunc = null;
		},
		confirm(e) {
			this.open(e), this.isConfirm = !0, this.noFunc = a(e?.noFunc) ? e?.noFunc : () => null;
		},
		close() {
			a(this.yesFunc) && this.yesFunc(), this.reset();
		},
		no() {
			a(this.noFunc) && this.noFunc(), this.reset();
		},
		yes() {
			a(this.yesFunc) && this.yesFunc(), this.reset();
		},
		reset() {
			Object.assign(this, o());
		}
	}
});
function c() {
	let t = s(e());
	return {
		state: n(() => ({
			isOpen: t.isOpen,
			isConfirm: t.isConfirm,
			html: t.html,
			message: t.message,
			height: t.height,
			width: t.width,
			maxHeight: t.maxHeight,
			maxWidth: t.maxWidth,
			minHeight: t.minHeight,
			minWidth: t.minWidth,
			isScrollY: t.isScrollY,
			isScrollX: t.isScrollX,
			containerClass: t.containerClass,
			bodyClass: t.bodyClass,
			footerClass: t.footerClass,
			reverseButtons: t.reverseButtons,
			yesFunc: t.yesFunc,
			noFunc: t.noFunc
		})),
		open: (e) => t.open(e),
		confirm: (e) => t.confirm(e),
		close: () => t.close(),
		yes: () => t.yes(),
		no: () => t.no(),
		reset: () => t.reset()
	};
}
// vue/features/notification/notificationStore.ts
var l = () => Math.random().toString(36).slice(2), u = t("notification", {
	state: () => ({ list: [] }),
	actions: {
		add(e) {
			let t = {
				id: l(),
				...e,
				removeAfter: e.removeAfter ?? 3e3
			};
			this.list = [...this.list, t], t.removeAfter && t.removeAfter > 0 && setTimeout(() => this.remove(t.id), t.removeAfter);
		},
		remove(e) {
			this.list = this.list.filter((t) => t.id !== e);
		},
		clear() {
			this.list = [];
		}
	}
});
function d() {
	return u(e());
}
export { c as n, i as r, d as t };
