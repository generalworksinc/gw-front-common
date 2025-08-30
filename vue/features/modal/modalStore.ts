import type { RefLike } from '../../types';

const defaultState = () => ({
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
});

function isFunction(fn: unknown): fn is Function {
	return typeof fn === 'function';
}

export function useModal() {
	const state: RefLike<ReturnType<typeof defaultState>> = { value: defaultState() };

	const open = (options?: Partial<ReturnType<typeof defaultState>>) => {
		state.value.isOpen = true;
		state.value.isConfirm = false;
		state.value.message = options?.message ?? '';
		state.value.html = options?.html ?? '';
		state.value.height = options?.height ?? '';
		state.value.width = options?.width ?? '';
		state.value.maxHeight = options?.maxHeight ?? '';
		state.value.maxWidth = options?.maxWidth ?? '';
		state.value.minHeight = options?.minHeight ?? '';
		state.value.minWidth = options?.minWidth ?? '';
		state.value.isScrollY = options?.isScrollY ?? false;
		state.value.isScrollX = options?.isScrollX ?? false;
		state.value.yesFunc = isFunction(options?.yesFunc)
			? (options?.yesFunc as () => void)
			: () => null;
		state.value.noFunc = null;
	};

	const confirm = (options?: Partial<ReturnType<typeof defaultState>>) => {
		open(options);
		state.value.isConfirm = true;
		state.value.noFunc = isFunction(options?.noFunc)
			? (options?.noFunc as () => void)
			: () => null;
	};

	const close = () => {
		if (isFunction(state.value.yesFunc)) state.value.yesFunc();
		reset();
	};

	const no = () => {
		if (isFunction(state.value.noFunc)) state.value.noFunc();
		reset();
	};

	const yes = () => {
		if (isFunction(state.value.yesFunc)) state.value.yesFunc();
		reset();
	};

	const reset = () => {
		state.value = defaultState();
	};

	return { state, open, confirm, close, yes, no, reset } as const;
}


