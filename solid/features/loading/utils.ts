import { loadingStore } from './loadingStore';

type AsyncFunction = (...args: any[]) => Promise<any>;
type SyncFunction = (...args: any[]) => any;

export const eventWithLoading = async (
	func: AsyncFunction | SyncFunction,
	...params: any[]
): Promise<any> => {
	if (loadingStore.isLoading()) {
		return false;
	}
	// ロード中の全てのclickイベントを無効にする
	loadingStore.start(); // ローディング開始

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
					// 戻り値がPromiseの場合、Promise完了後にローディング状態を解除（正常・異常終了それぞれに処理を挟む）
					(result as Promise<any>)
						.then((res) => {
							loadingStore.stop();
							resolve(Promise.resolve(res));
						})
						.catch((err) => {
							loadingStore.stop();
							resolve(Promise.reject(err));
						});
				} else {
					// 戻り値がPromiseでない場合処理、完了しているのでローディング状態を解除
					loadingStore.stop();
					resolve(result);
				}
			} catch (ex) {
				// 例外時（async methodでない場合に発生）も処理完了と判断してローディング状態を解除
				loadingStore.stop();
				reject(ex);
			}
		}, 1);
	});
};

// さらに汎用的なヘルパー
export const awaitLoadingWith = (asyncFn: () => Promise<void>) => {
	return async () => await eventWithLoading(asyncFn);
};
