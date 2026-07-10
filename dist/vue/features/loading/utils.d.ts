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
export declare function eventWithLoading(func: AsyncFunction | SyncFunction, ...params: any[]): Promise<any>;
/** eventWithLoading をイベントハンドラ化するヘルパー。 */
export declare const awaitLoadingWith: (asyncFn: () => Promise<void>) => () => Promise<any>;
export {};
