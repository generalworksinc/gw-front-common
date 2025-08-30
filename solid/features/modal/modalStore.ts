import { createStore } from 'solid-js/store';

interface ModalBase {
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
	yesFunc: (() => void) | null;
	noFunc: (() => void) | null;
}

interface ModalState extends ModalBase {
	isOpen: boolean;
	isConfirm: boolean;
}

type ModalOptions = Partial<ModalBase> & { message?: string; html?: string };

const defaultState: ModalState = {
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
	yesFunc: null,
	noFunc: null,
};

function isFunction(fn: unknown): fn is Function {
	return typeof fn === 'function';
}

const [store, setStore] = createStore<ModalState>({ ...defaultState });

const open = (obj?: ModalOptions) => {
	setStore({
		isOpen: true,
		isConfirm: false,
		message: obj?.message ?? '',
		html: obj?.html ?? '',
		height: obj?.height ?? '',
		width: obj?.width ?? '',
		maxHeight: obj?.maxHeight ?? '',
		maxWidth: obj?.maxWidth ?? '',
		minHeight: obj?.minHeight ?? '',
		minWidth: obj?.minWidth ?? '',
		isScrollY: obj?.isScrollY ?? false,
		isScrollX: obj?.isScrollX ?? false,
		yesFunc: isFunction(obj?.yesFunc) ? obj?.yesFunc : null,
		noFunc: null,
	});
};

const confirm = (obj?: ModalOptions) => {
	setStore({
		isOpen: true,
		isConfirm: true,
		message: obj?.message ?? '',
		html: obj?.html ?? '',
		height: obj?.height ?? '',
		width: obj?.width ?? '',
		maxHeight: obj?.maxHeight ?? '',
		maxWidth: obj?.maxWidth ?? '',
		minHeight: obj?.minHeight ?? '',
		minWidth: obj?.minWidth ?? '',
		isScrollY: obj?.isScrollY ?? false,
		isScrollX: obj?.isScrollX ?? false,
		yesFunc: isFunction(obj?.yesFunc) ? obj?.yesFunc : null,
		noFunc: isFunction(obj?.noFunc) ? obj?.noFunc : null,
	});
};

const close = () => {
	setStore({ ...defaultState });
};

const yes = () => {
	if (isFunction(store.yesFunc)) store.yesFunc();
	close();
};

const no = () => {
	if (isFunction(store.noFunc)) store.noFunc();
	close();
};

const reset = close;

export default {
	get: () => store,
	set: setStore,
	open,
	confirm,
	close,
	yes,
	no,
	reset,
};


