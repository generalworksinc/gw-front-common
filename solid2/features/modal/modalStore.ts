import { createStore } from 'solid-js';

type ModalCallback = (() => void) | null;

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
	yesFunc: null as ModalCallback,
	noFunc: null as ModalCallback,
};

type ModalState = typeof defaultState;

const isFunction = (value: unknown): value is () => void =>
	typeof value === 'function';

const [store, setStore] = createStore<ModalState>({ ...defaultState });

const valuesFor = (
	obj: Partial<ModalState> | undefined,
	isConfirm: boolean,
): ModalState => ({
	...defaultState,
	isOpen: true,
	isConfirm,
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
	yesFunc: isFunction(obj?.yesFunc) ? obj.yesFunc : null,
	noFunc: isConfirm && isFunction(obj?.noFunc) ? obj.noFunc : null,
});

const replaceState = (next: ModalState): void => {
	setStore((draft) => {
		Object.assign(draft, next);
	});
};

const open = (obj?: Partial<ModalState>): void =>
	replaceState(valuesFor(obj, false));
const confirm = (obj?: Partial<ModalState>): void =>
	replaceState(valuesFor(obj, true));
const close = (): void => replaceState({ ...defaultState });

const yes = (): void => {
	store.yesFunc?.();
	close();
};

const no = (): void => {
	store.noFunc?.();
	close();
};

export const modalStore = {
	get: () => store,
	set: setStore,
	open,
	confirm,
	close,
	yes,
	no,
	reset: close,
};

export type ModalStore = typeof modalStore;
