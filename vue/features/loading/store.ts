import type { RefLike } from '../../types';

export interface LoadingStore {
	isLoading: RefLike<boolean>;
	setLoading: (loading: boolean) => void;
	startLoading: () => void;
	stopLoading: () => void;
}

export function useLoading(): LoadingStore {
	const isLoading: RefLike<boolean> = { value: false };

	const setLoading = (loading: boolean) => {
		isLoading.value = loading;
	};

	const startLoading = () => setLoading(true);
	const stopLoading = () => setLoading(false);

	return { isLoading, setLoading, startLoading, stopLoading };
}
