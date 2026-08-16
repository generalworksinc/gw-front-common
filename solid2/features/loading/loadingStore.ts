import { createSignal } from 'solid-js';

const [isLoading, setIsLoading] = createSignal(false);

// Solid 2 stages signal writes until the microtask flush. Keep the click guard
// synchronous while retaining the reactive accessor used by components.
let loadingNow = false;

const start = (): boolean => {
	if (loadingNow) return false;
	loadingNow = true;
	setIsLoading(true);
	return true;
};

const stop = (): boolean => {
	loadingNow = false;
	setIsLoading(false);
	return false;
};

const toggle = (): boolean => (loadingNow ? stop() : start());

export const loadingStore = { isLoading, start, stop, toggle };

export type LoadingStore = typeof loadingStore;
