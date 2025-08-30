import { createStore } from 'solid-js/store';

const defaultState = {
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

const [store, setStore] = createStore({ ...defaultState });

const open = (obj?: Partial<typeof defaultState>) => {
	setStore({
		isOpen: true,
		isConfirm: false,
		message: (obj as any)?.message ?? '',
		html: (obj as any)?.html ?? '',
		height: obj?.height ?? '',
		width: obj?.width ?? '',
		maxHeight: obj?.maxHeight ?? '',
		maxWidth: obj?.maxWidth ?? '',
		minHeight: obj?.minHeight ?? '',
		minWidth: obj?.minWidth ?? '',
		isScrollY: obj?.isScrollY ?? false,
		isScrollX: obj?.isScrollX ?? false,
		yesFunc: isFunction(obj?.yesFunc) ? (obj?.yesFunc as () => void) : null,
		noFunc: null,
	});
};

const confirm = (obj?: Partial<typeof defaultState>) => {
	setStore({
		isOpen: true,
		isConfirm: true,
		message: (obj as any)?.message ?? '',
		html: (obj as any)?.html ?? '',
		height: obj?.height ?? '',
		width: obj?.width ?? '',
		maxHeight: obj?.maxHeight ?? '',
		maxWidth: obj?.maxWidth ?? '',
		minHeight: obj?.minHeight ?? '',
		minWidth: obj?.minWidth ?? '',
		isScrollY: obj?.isScrollY ?? false,
		isScrollX: obj?.isScrollX ?? false,
		yesFunc: isFunction(obj?.yesFunc) ? (obj?.yesFunc as () => void) : null,
		noFunc: isFunction(obj?.noFunc) ? (obj?.noFunc as () => void) : null,
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
