import { withInflight } from '../core/mod.ts';

describe('Promise Utils', () => {
	test('withInflight shares in-flight promise for same key', async () => {
		let resolve;
		const deferred = new Promise((res) => {
			resolve = res;
		});
		let calls = 0;
		const fn = () => {
			calls += 1;
			return deferred;
		};

		const p1 = withInflight('inflight-share', fn);
		const p2 = withInflight('inflight-share', fn);

		expect(calls).toBe(1);
		expect(p1).toBe(p2);

		resolve('ok');
		const [r1, r2] = await Promise.all([p1, p2]);
		expect(r1).toBe('ok');
		expect(r2).toBe('ok');
	});

	test('withInflight shares in-flight even if clock advances', async () => {
		const originalNow = Date.now;
		let now = 1_000;
		Date.now = () => now;
		try {
			let resolve;
			const deferred = new Promise((res) => {
				resolve = res;
			});
			let calls = 0;
			const fn = () => {
				calls += 1;
				return deferred;
			};

			const p1 = withInflight('inflight-share-advance', fn);
			now = 1_001;
			const p2 = withInflight('inflight-share-advance', fn);

			expect(calls).toBe(1);
			expect(p1).toBe(p2);

			resolve('ok');
			const [r1, r2] = await Promise.all([p1, p2]);
			expect(r1).toBe('ok');
			expect(r2).toBe('ok');
		} finally {
			Date.now = originalNow;
		}
	});

	test('withInflight caches resolved promise within ttl', async () => {
		const originalNow = Date.now;
		let now = 1_000;
		Date.now = () => now;
		try {
			let calls = 0;
			const fn = () => {
				calls += 1;
				return Promise.resolve('cached');
			};

			const p1 = withInflight('inflight-ttl', fn, 100);
			const r1 = await p1;
			expect(r1).toBe('cached');
			expect(calls).toBe(1);

			now = 1_050;
			const p2 = withInflight('inflight-ttl', fn, 100);
			const r2 = await p2;
			expect(r2).toBe('cached');
			expect(calls).toBe(1);
			expect(p1).toBe(p2);

			now = 1_201;
			const p3 = withInflight('inflight-ttl', fn, 100);
			const r3 = await p3;
			expect(r3).toBe('cached');
			expect(calls).toBe(2);
			expect(p3).not.toBe(p1);
		} finally {
			Date.now = originalNow;
		}
	});

	test('withInflight clears cache on rejection', async () => {
		const originalNow = Date.now;
		Date.now = () => 2_000;
		try {
			let calls = 0;
			const fn = () => {
				calls += 1;
				if (calls === 1) {
					return Promise.reject(new Error('boom'));
				}
				return Promise.resolve('ok');
			};

			await expect(withInflight('inflight-reject', fn, 100)).rejects.toThrow(
				'boom',
			);
			expect(calls).toBe(1);

			const result = await withInflight('inflight-reject', fn, 100);
			expect(result).toBe('ok');
			expect(calls).toBe(2);
		} finally {
			Date.now = originalNow;
		}
	});
});
