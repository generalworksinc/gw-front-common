import { defineStore } from 'pinia';
import { type ComputedRef, computed } from 'vue';
import { resolvePinia } from '../../pinia';

type ModalFn = (() => void) | null;

export type ModalState = {
	isOpen: boolean;
	isConfirm: boolean;
	html: string;
	message: string;
	height: string;
	width: string;
	maxHeight: string;
	maxWidth: string;
	minHeight: string;
	minWidth: string;
	isScrollY: boolean;
	isScrollX: boolean;
	reverseButtons: boolean;
	yesFunc: ModalFn;
	noFunc: ModalFn;
};

function isFunction(fn: unknown): fn is () => void {
	return typeof fn === 'function';
}

const defaultState = (): ModalState => ({
	isOpen: false,
	isConfirm: false,
	html: '',
	message: '',
	height: '',
	width: '',
	maxHeight: '',
	maxWidth: '',
	minHeight: '',
	minWidth: '',
	isScrollY: false,
	isScrollX: false,
	reverseButtons: false,
	yesFunc: null,
	noFunc: null,
});

const useModalPinia = defineStore('modal', {
	state: (): ModalState => defaultState(),
	actions: {
		open(options?: Partial<ModalState>): void {
			this.isOpen = true;
			this.isConfirm = false;
			this.message = options?.message ?? '';
			this.html = options?.html ?? '';
			this.height = options?.height ?? '';
			this.width = options?.width ?? '';
			this.maxHeight = options?.maxHeight ?? '';
			this.maxWidth = options?.maxWidth ?? '';
			this.minHeight = options?.minHeight ?? '';
			this.minWidth = options?.minWidth ?? '';
			this.isScrollY = options?.isScrollY ?? false;
			this.isScrollX = options?.isScrollX ?? false;
			this.reverseButtons = options?.reverseButtons ?? false;
			this.yesFunc = isFunction(options?.yesFunc)
				? (options?.yesFunc as () => void)
				: () => null;
			this.noFunc = null;
		},
		confirm(options?: Partial<ModalState>): void {
			this.open(options);
			this.isConfirm = true;
			this.noFunc = isFunction(options?.noFunc)
				? (options?.noFunc as () => void)
				: () => null;
		},
		close(): void {
			if (isFunction(this.yesFunc)) this.yesFunc();
			this.reset();
		},
		no(): void {
			if (isFunction(this.noFunc)) this.noFunc();
			this.reset();
		},
		yes(): void {
			if (isFunction(this.yesFunc)) this.yesFunc();
			this.reset();
		},
		reset(): void {
			Object.assign(this, defaultState());
		},
	},
});

// 互換レイヤ（従来の API: state.value.xxx / yes()/no()/close() などを維持）
export function useModal() {
	const s = useModalPinia(resolvePinia());

	const state: ComputedRef<ModalState> = computed(() => ({
		isOpen: s.isOpen,
		isConfirm: s.isConfirm,
		html: s.html,
		message: s.message,
		height: s.height,
		width: s.width,
		maxHeight: s.maxHeight,
		maxWidth: s.maxWidth,
		minHeight: s.minHeight,
		minWidth: s.minWidth,
		isScrollY: s.isScrollY,
		isScrollX: s.isScrollX,
		reverseButtons: s.reverseButtons,
		yesFunc: s.yesFunc,
		noFunc: s.noFunc,
	}));

	return {
		state,
		open: (options?: Partial<ModalState>) => s.open(options),
		confirm: (options?: Partial<ModalState>) => s.confirm(options),
		close: () => s.close(),
		yes: () => s.yes(),
		no: () => s.no(),
		reset: () => s.reset(),
	} as const;
}
