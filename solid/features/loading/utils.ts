import type { LoadingStore } from './store.ts';
import loadingStore from './store.ts';

type AsyncFunction = (...args: any[]) => Promise<any>;
type SyncFunction = (...args: any[]) => any;

export async function eventWithLoading(
	store: Pick<LoadingStore, 'isLoading' | 'startLoading' | 'stopLoading'>,
	func: AsyncFunction | SyncFunction,
	...params: any[]
): Promise<any>;
export async function eventWithLoading(
	func: AsyncFunction | SyncFunction,
	...params: any[]
): Promise<any>;
export async function eventWithLoading(
	arg1: any,
	arg2?: any,
	...rest: any[]
): Promise<any> {
	const store: Pick<
		LoadingStore,
		'isLoading' | 'startLoading' | 'stopLoading'
	> =
		typeof arg1 === 'function'
			? ({
					get isLoading() {
						return loadingStore.isLoading();
					},
					startLoading: () => loadingStore.start(),
					stopLoading: () => loadingStore.stop(),
				} as unknown as Pick<
					LoadingStore,
					'isLoading' | 'startLoading' | 'stopLoading'
				>)
			: arg1;
	const func: AsyncFunction | SyncFunction =
		typeof arg1 === 'function' ? arg1 : arg2;
	const params: any[] = rest;

	if ((store as any).isLoading) return false;
	store.startLoading();
	return await new Promise<any>((resolve, reject) => {
		setTimeout(() => {
			try {
				const result = func(...params);
				if (
					result &&
					typeof (result as any).then === 'function' &&
					typeof (result as any).catch === 'function'
				) {
					(result as Promise<any>)
						.then((res) => {
							store.stopLoading();
							resolve(Promise.resolve(res));
						})
						.catch((err) => {
							store.stopLoading();
							resolve(Promise.reject(err));
						});
				} else {
					store.stopLoading();
					resolve(result);
				}
			} catch (ex) {
				store.stopLoading();
				reject(ex);
			}
		}, 1);
	});
}

export const awaitLoadingWith = (
	store: Pick<LoadingStore, 'isLoading' | 'startLoading' | 'stopLoading'>,
	asyncFn: () => Promise<void>,
) => {
	return async () => await eventWithLoading(store, asyncFn);
};

export const awaitLoadingWithScheduler = (asyncFn: () => Promise<void>) => {
	return async () => await eventWithLoading(asyncFn);
};
