const inflightMap = new Map<
	string,
	{
		p: Promise<unknown>;
		ts: number;
		ttl: number;
		status: 'pending' | 'settled';
	}
>();

/**
 * シングルフライト＋短期キャッシュ: 同じキーで進行中のPromiseがあれば共有し、
 * 完了後も ttlMs の間だけ結果Promiseを保持する（並列洪水を抑制）。
 */
export function withInflight<T>(
	key: string,
	fn: () => Promise<T>,
	ttlMs = 0,
): Promise<T> {
	const existing = inflightMap.get(key);
	const now = Date.now();
	if (
		existing &&
		(existing.status === 'pending' ||
			(existing.ttl > 0 && now - existing.ts <= existing.ttl))
	) {
		return existing.p as Promise<T>;
	}

	const wrapped = fn()
		.catch((err) => {
			inflightMap.delete(key);
			throw err;
		})
		.then((res) => {
			if (ttlMs > 0) {
				inflightMap.set(key, {
					p: wrapped,
					ts: Date.now(),
					ttl: ttlMs,
					status: 'settled',
				});
			} else {
				inflightMap.delete(key);
			}
			return res;
		});

	inflightMap.set(key, { p: wrapped, ts: now, ttl: ttlMs, status: 'pending' });
	return wrapped;
}
