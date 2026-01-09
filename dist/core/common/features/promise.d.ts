/**
 * シングルフライト＋短期キャッシュ: 同じキーで進行中のPromiseがあれば共有し、
 * 完了後も ttlMs の間だけ結果Promiseを保持する（並列洪水を抑制）。
 */
export declare function withInflight<T>(key: string, fn: () => Promise<T>, ttlMs?: number): Promise<T>;
