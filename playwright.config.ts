import { defineConfig } from '@playwright/test';

export default defineConfig({
	testDir: '__tests__/browser',
	testMatch: '**/*.pw.js',
	timeout: 30_000,
	retries: 0,
	use: {
		headless: true,
	},
});
