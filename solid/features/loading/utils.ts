type LoadingStore = {
	isLoading: () => boolean;
	start: () => true;
	stop: () => false;
};

import loadingStore from './loadingStore';

type AsyncFunction = (...args: any[]) => Promise<any>;
type SyncFunction = (...args: any[]) => any;

export async function eventWithLoading(
	store: Pick<LoadingStore, 'isLoading' | 'start' | 'stop'>,
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
	const store: Pick<LoadingStore, 'isLoading' | 'start' | 'stop'> =
		typeof arg1 === 'function'
			? ({
					isLoading: () => loadingStore.isLoading(),
					start: () => loadingStore.start(),
					stop: () => loadingStore.stop(),
				} as unknown as Pick<LoadingStore, 'isLoading' | 'start' | 'stop'>)
			: arg1;
	const func: AsyncFunction | SyncFunction =
		typeof arg1 === 'function' ? arg1 : arg2;
	const params: any[] = rest;

	// Already loading
	if (typeof (store as any).isLoading === 'function') {
		if ((store as any).isLoading()) return false;
	} else if ((store as any).isLoading) {
		return false;
	}
	(store as any).start();
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
							(store as any).stop();
							resolve(Promise.resolve(res));
						})
						.catch((err) => {
							(store as any).stop();
							resolve(Promise.reject(err));
						});
				} else {
					(store as any).stop();
					resolve(result);
				}
			} catch (ex) {
				(store as any).stop();
				reject(ex);
			}
		}, 1);
	});
}

export const awaitLoadingWith = (
	store: Pick<LoadingStore, 'isLoading' | 'start' | 'stop'>,
	asyncFn: () => Promise<void>,
) => {
	return async () => await eventWithLoading(store, asyncFn);
};

export const awaitLoadingWithScheduler = (asyncFn: () => Promise<void>) => {
	return async () => await eventWithLoading(asyncFn);
};
