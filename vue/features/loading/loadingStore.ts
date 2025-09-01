import { defineStore } from 'pinia';

export const useLoading = defineStore('loading', {
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
