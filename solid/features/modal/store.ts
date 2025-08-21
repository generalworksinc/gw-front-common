import { createSignal } from 'solid-js';

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
	state: ModalState;
	open: (opt?: ModalOptions) => void;
	confirm: (opt?: ModalOptions) => void;
	close: () => void;
	yes: () => void;
	no: () => void;
	reset: () => void;
}

const defaultOptions = (): ModalOptions => ({
	message: '',
	yesFunc: null,
	noFunc: null,
});

export function createModalStore(): ModalStore {
	const [isOpen, setIsOpen] = createSignal(false);
	const [isConfirm, setIsConfirm] = createSignal(false);
	const [options, setOptions] = createSignal<ModalOptions>(defaultOptions());

	const open = (opt?: ModalOptions) => {
		setIsOpen(true);
		setIsConfirm(false);
		setOptions({ ...defaultOptions(), ...(opt || {}) });
	};
	const confirm = (opt?: ModalOptions) => {
		setIsOpen(true);
		setIsConfirm(true);
		setOptions({ ...defaultOptions(), ...(opt || {}) });
	};
	const close = () => setIsOpen(false);
	const yes = () => {
		options().yesFunc?.();
		close();
	};
	const no = () => {
		options().noFunc?.();
		close();
	};
	const reset = () => {
		setIsOpen(false);
		setIsConfirm(false);
		setOptions(defaultOptions());
	};

	return new Proxy({} as any, {
		get(_t, k) {
			if (k === 'state')
				return {
					isOpen: isOpen(),
					isConfirm: isConfirm(),
					options: options(),
				} as ModalState;
			if (k === 'open') return open;
			if (k === 'confirm') return confirm;
			if (k === 'close') return close;
			if (k === 'yes') return yes;
			if (k === 'no') return no;
			if (k === 'reset') return reset;
		},
	}) as unknown as ModalStore;
}
