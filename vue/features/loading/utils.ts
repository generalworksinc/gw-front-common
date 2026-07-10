import { useLoading } from './loadingStore';

type AsyncFunction = (...args: any[]) => Promise<any>;
type SyncFunction = (...args: any[]) => any;

/**
 * ユーザー操作（クリック等）の連打ガード専用ヘルパー。
 *
 * グローバルローディング表示を開始し、実行中は後続操作を無効化する。
 * isLoading 中に呼ばれた場合は何も実行せず `false` を返すため、呼び出し側は
 * スキップされ得ることを前提にする。
 *
 * 初期ロード・リアクティブなデータ取得には使わないこと。無関係なロードと排他され、
 * 取得処理が黙って消える可能性がある。データ取得はコンポーネント/ストアの
 * ローカルな読み込み状態で管理する。
 *
 * Solid 2.0 の microtask バッチ化による影響はない。
 */
export async function eventWithLoading(
	func: AsyncFunction | SyncFunction,
	...params: any[]
): Promise<any> {
	const loading = useLoading();
	if (loading.isLoading) {
		return false;
	}
	loading.startLoading();

	return await new Promise<any>((resolve, reject) => {
		// ローディング表示の描画を先に確定させるため、意図的に次タスクで実行する。
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
							resolve(res);
						})
						.catch((err) => {
							loading.stopLoading();
							reject(err);
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

/** eventWithLoading をイベントハンドラ化するヘルパー。 */
export const awaitLoadingWith = (asyncFn: () => Promise<void>) => {
	return async () => await eventWithLoading(asyncFn);
};
