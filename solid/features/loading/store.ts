export interface LoadingStore {
	isLoading: boolean;
	setLoading: (loading: boolean) => void;
	startLoading: () => void;
	stopLoading: () => void;
}

export function createLoadingStore(): LoadingStore {
	let state = { isLoading: false };
	const setLoading = (loading: boolean) => {
		state.isLoading = loading;
	};
	const startLoading = () => setLoading(true);
	const stopLoading = () => setLoading(false);
	return new Proxy({} as any, {
		get(_t, k) {
			if (k === "isLoading") return state.isLoading;
			if (k === "setLoading") return setLoading;
			if (k === "startLoading") return startLoading;
			if (k === "stopLoading") return stopLoading;
		},
	});
}
