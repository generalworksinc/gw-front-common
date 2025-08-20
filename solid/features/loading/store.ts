import { createSignal } from "solid-js";

export interface LoadingStore {
	readonly isLoading: boolean;
	setLoading: (loading: boolean) => void;
	startLoading: () => void;
	stopLoading: () => void;
}

export function createLoadingStore(): LoadingStore {
	const [isLoading, setIsLoading] = createSignal(false);

	const setLoading = (loading: boolean) => setIsLoading(loading);
	const startLoading = () => setIsLoading(true);
	const stopLoading = () => setIsLoading(false);

	return new Proxy({} as any, {
		get(_t, k) {
			if (k === "isLoading") return isLoading();
			if (k === "setLoading") return setLoading;
			if (k === "startLoading") return startLoading;
			if (k === "stopLoading") return stopLoading;
		},
	});
}
