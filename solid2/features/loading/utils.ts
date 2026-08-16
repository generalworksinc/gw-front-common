import { loadingStore } from './loadingStore';

type AsyncFunction = (...args: any[]) => Promise<any>;
type SyncFunction = (...args: any[]) => any;

/** Run a user event once while exposing the global loading state. */
export const eventWithLoading = async (
	func: AsyncFunction | SyncFunction,
	...params: any[]
): Promise<any> => {
	if (!loadingStore.start()) return false;

	return await new Promise<any>((resolve, reject) => {
		setTimeout(() => {
			try {
				Promise.resolve(func(...params)).then(
					(result) => {
						loadingStore.stop();
						resolve(result);
					},
					(error) => {
						loadingStore.stop();
						reject(error);
					},
				);
			} catch (error) {
				loadingStore.stop();
				reject(error);
			}
		}, 1);
	});
};

export const awaitLoadingWith = (asyncFn: () => Promise<void>) => async () =>
	await eventWithLoading(asyncFn);
