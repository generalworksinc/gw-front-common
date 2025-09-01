import { type Ref, ref } from 'vue';

export interface LoadingStore {
	isLoading: Ref<boolean>;
	setLoading: (loading: boolean) => void;
	startLoading: () => void;
	stopLoading: () => void;
}

// singleton state
const isLoading: Ref<boolean> = ref(false);

const setLoading = (loading: boolean) => {
	isLoading.value = loading;
};

const startLoading = () => setLoading(true);
const stopLoading = () => setLoading(false);

const store: LoadingStore = {
	isLoading,
	setLoading,
	startLoading,
	stopLoading,
};

export function useLoading(): LoadingStore {
	return store;
}
