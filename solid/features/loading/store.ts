import { createSignal } from 'solid-js';

// Global-only, minimal API (scheduler-compatible)
const [isLoading, setIsLoading] = createSignal(false);

export default {
	isLoading,
	start: () => setIsLoading(true),
	stop: () => setIsLoading(false),
	toggle: () => setIsLoading((v) => !v),
};
