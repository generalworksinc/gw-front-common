export type RefLike<T> = { value: T };

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

export interface ModalStore {
	state: RefLike<ModalState>;
	open: (options?: ModalOptions) => void;
	confirm: (options?: ModalOptions) => void;
	close: () => void;
	yes: () => void;
	no: () => void;
	reset: () => void;
}

const defaultOptions = (): ModalOptions => ({
	message: "",
	yesFunc: null,
	noFunc: null,
});

export function useModal(): ModalStore {
	const state: RefLike<ModalState> = {
		value: { isOpen: false, isConfirm: false, options: defaultOptions() },
	};

	const open = (options?: ModalOptions) => {
		state.value.isOpen = true;
		state.value.isConfirm = false;
		state.value.options = { ...defaultOptions(), ...(options || {}) };
	};

	const confirm = (options?: ModalOptions) => {
		state.value.isOpen = true;
		state.value.isConfirm = true;
		state.value.options = { ...defaultOptions(), ...(options || {}) };
	};

	const close = () => {
		state.value.isOpen = false;
	};

	const yes = () => {
		state.value.options.yesFunc?.();
		close();
	};

	const no = () => {
		state.value.options.noFunc?.();
		close();
	};

	const reset = () => {
		state.value = { isOpen: false, isConfirm: false, options: defaultOptions() };
	};

	return { state, open, confirm, close, yes, no, reset };
}

