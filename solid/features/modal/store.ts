export interface ModalOptions {
	message?: string;
	html?: string;
	height?: string;
	width?: string;
	maxHeight?: string;
	maxWidth?: string;
	minHeight?: string;
	minWidth?: string;
	isScrollY?: boolean;
	isScrollX?: boolean;
	yesFunc?: (() => void) | null;
	noFunc?: (() => void) | null;
}

export interface ModalState {
	isOpen: boolean;
	isConfirm: boolean;
	options: ModalOptions;
}

const defaultOptions = (): ModalOptions => ({
	message: "",
	yesFunc: null,
	noFunc: null,
});

export function createModalStore() {
	let state: ModalState = { isOpen: false, isConfirm: false, options: defaultOptions() };

	const open = (options?: ModalOptions) => {
		state.isOpen = true;
		state.isConfirm = false;
		state.options = { ...defaultOptions(), ...(options || {}) };
	};
	const confirm = (options?: ModalOptions) => {
		state.isOpen = true;
		state.isConfirm = true;
		state.options = { ...defaultOptions(), ...(options || {}) };
	};
	const close = () => {
		state.isOpen = false;
	};
	const yes = () => {
		state.options.yesFunc?.();
		close();
	};
	const no = () => {
		state.options.noFunc?.();
		close();
	};
	const reset = () => {
		state = { isOpen: false, isConfirm: false, options: defaultOptions() };
	};

	return new Proxy({} as any, {
		get(_t, k) {
			if (k === "state") return state;
			if (k === "open") return open;
			if (k === "confirm") return confirm;
			if (k === "close") return close;
			if (k === "yes") return yes;
			if (k === "no") return no;
			if (k === "reset") return reset;
		},
	});
}
