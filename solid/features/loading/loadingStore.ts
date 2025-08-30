import { createSignal } from 'solid-js';

const [isLoading, setIsLoading] = createSignal(false);

export default {
	get: isLoading,
	start: () => setIsLoading(true),
	stop: () => setIsLoading(false),
	toggle: () => setIsLoading((v) => !v),
};


