import { defineStore } from 'pinia';
import { resolvePinia } from '../../pinia';

const useLoadingPinia = defineStore('loading', {
	state: () => ({
		isLoading: false as boolean,
	}),
	actions: {
		setLoading(loading: boolean): void {
			this.isLoading = loading;
		},
		startLoading(): void {
			this.setLoading(true);
		},
		stopLoading(): void {
			this.setLoading(false);
		},
		// compatibility with legacy API
		LOADING(): void {
			this.startLoading();
		},
		NOT_LOADING(): void {
			this.stopLoading();
		},
	},
});

// 明示的に pinia の受け渡しを必須化
export function useLoading() {
	return useLoadingPinia(resolvePinia());
}
