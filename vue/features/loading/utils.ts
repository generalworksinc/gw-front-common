import { useLoading } from './loadingStore';

type AsyncFunction = (...args: any[]) => Promise<any>;
type SyncFunction = (...args: any[]) => any;

export async function eventWithLoading(
	func: AsyncFunction | SyncFunction,
	...params: any[]
): Promise<any> {
	const loading = useLoading();
	if (loading.isLoading.value) {
		return false;
	}
	loading.startLoading();

	return await new Promise<any>((resolve, reject) => {
		setTimeout(() => {
			try {
				const result = func(...params);
				if (
					result instanceof Promise ||
					(result &&
						typeof (result as any).then === 'function' &&
						typeof (result as any).catch === 'function')
				) {
					(result as Promise<any>)
						.then((res) => {
							loading.stopLoading();
							resolve(Promise.resolve(res));
						})
						.catch((err) => {
							loading.stopLoading();
							resolve(Promise.reject(err));
						});
				} else {
					loading.stopLoading();
					resolve(result);
				}
			} catch (ex) {
				loading.stopLoading();
				reject(ex);
			}
		}, 1);
	});
}

export const awaitLoadingWith = (asyncFn: () => Promise<void>) => {
	return async () => await eventWithLoading(asyncFn);
};
