import { readFileSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join } from 'node:path';
import { expect, test } from '@playwright/test';

const repoRoot = new URL('../..', import.meta.url).pathname;
const port = 41793;

const getContentType = (filePath) => {
	const ext = extname(filePath);
	if (ext === '.html') return 'text/html';
	if (ext === '.js') return 'text/javascript';
	if (ext === '.map') return 'application/json';
	return 'text/plain';
};

const startStaticServer = () =>
	new Promise((resolve) => {
		const server = createServer((req, res) => {
			const urlPath = req.url?.split('?')[0] ?? '/';
			const fsPath = join(repoRoot, urlPath);
			try {
				const stat = statSync(fsPath);
				if (stat.isDirectory()) {
					res.writeHead(403);
					res.end('Forbidden');
					return;
				}
				const file = readFileSync(fsPath);
				res.writeHead(200, { 'Content-Type': getContentType(fsPath) });
				res.end(file);
			} catch (_err) {
				res.writeHead(404);
				res.end('Not Found');
			}
		});
		server.listen(port, '127.0.0.1', () => resolve(server));
	});

test('logSentryMessageWithBreadcrumb works in browser', async ({ page }) => {
	const distEntry = join(repoRoot, 'dist/core/mod.js');
	try {
		statSync(distEntry);
	} catch (_err) {
		throw new Error(
			'dist/core/mod.js not found. Run `bun run build` before `bun run test:browser`.',
		);
	}
	const server = await startStaticServer();
	const dsn = process.env.SENTRY_DSN ?? '';
	try {
		page.on('pageerror', (err) => {
			throw err;
		});
		page.on('console', (msg) => {
			if (msg.type() === 'error') {
				throw new Error(`Browser console error: ${msg.text()}`);
			}
		});
		if (dsn) {
			await page.addInitScript((value) => {
				window.__SENTRY_DSN = value;
			}, dsn);
			await page.goto(`http://127.0.0.1:${port}/__tests__/browser/live.html`);
			await page.waitForFunction(() => window.__testDone === true);
			expect(true).toBe(true);
			return;
		}
		await page.goto(`http://127.0.0.1:${port}/__tests__/browser/index.html`);
		await page.waitForFunction(() => window.__testDone === true);
		const calls = await page.evaluate(() => window.__sentryCalls);
		expect(calls.breadcrumbs.length).toBe(1);
		expect(calls.messages.length).toBe(1);
		expect(calls.breadcrumbs[0].message).toBe('browser_test');
		expect(calls.messages[0].message).toBe('browser_test');
		expect(calls.breadcrumbs[0].data.longArray.length).toBe(20);
	} finally {
		server.close();
	}
});
