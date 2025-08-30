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

const defaultOptions = (): ModalOptions => ({
	message: '',
	yesFunc: null,
	noFunc: null,
});

export interface ModalState {
	isOpen: boolean;
	isConfirm: boolean;
	options: ModalOptions;
}

export interface ModalStore {
	get: () => ModalState;
	set: (_: any) => void;
	open: (opt?: ModalOptions) => void;
	confirm: (opt?: ModalOptions) => void;
	close: () => void;
	yes: () => void;
	no: () => void;
	reset: () => void;
}

// Global-only, minimal API (scheduler-compatible)
const [isOpen, setIsOpen] = createSignal(false);
const [isConfirm, setIsConfirm] = createSignal(false);
const [options, setOptions] = createSignal<ModalOptions>(defaultOptions());

function open(opt?: ModalOptions): void {
	setIsOpen(true);
	setIsConfirm(false);
	setOptions({ ...defaultOptions(), ...(opt || {}) });
}

function confirm(opt?: ModalOptions): void {
	setIsOpen(true);
	setIsConfirm(true);
	setOptions({ ...defaultOptions(), ...(opt || {}) });
}

function close(): void {
	setIsOpen(false);
}

function yes(): void {
	options().yesFunc?.();
	close();
}

function no(): void {
	options().noFunc?.();
	close();
}

function reset(): void {
	setIsOpen(false);
	setIsConfirm(false);
	setOptions(defaultOptions());
}

const store: ModalStore = {
	get: () => ({ isOpen: isOpen(), isConfirm: isConfirm(), options: options() }),
	set: (_: any) => {},
	open,
	confirm,
	close,
	yes,
	no,
	reset,
};

export default store;
