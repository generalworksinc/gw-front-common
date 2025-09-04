import { createSignal } from 'solid-js';

const [isLoading, setIsLoading] = createSignal(false);

export const loadingStore = {
	isLoading,
	start: () => setIsLoading(true),
	stop: () => setIsLoading(false),
	toggle: () => setIsLoading((v) => !v),
};

export type LoadingStore = typeof loadingStore;
// default export removed to favor named imports
