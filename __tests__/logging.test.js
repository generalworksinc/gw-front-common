import { afterEach, beforeEach, describe, expect, mock, test } from 'bun:test';
import { logSentryMessageWithBreadcrumb } from '../core/mod.ts';

const createSentryMocks = () => {
	const calls = {
		breadcrumbs: [],
		messages: [],
		tags: {},
		contexts: {},
		user: null,
	};

	mock.module('@sentry/browser', () => ({
		addBreadcrumb: (crumb) => {
			calls.breadcrumbs.push(crumb);
		},
		captureMessage: (message, options) => {
			calls.messages.push({ message, options });
		},
		withScope: (fn) => {
			const scope = {
				setUser: (user) => {
					calls.user = user;
				},
				setTag: (key, value) => {
					calls.tags[key] = value;
				},
				setContext: (key, value) => {
					calls.contexts[key] = value;
				},
			};
			fn(scope);
		},
	}));

	return calls;
};

describe('logSentryMessageWithBreadcrumb', () => {
	beforeEach(() => {
		delete globalThis.window;
	});

	afterEach(() => {
		delete globalThis.window;
	});

	test('does nothing when window is undefined', async () => {
		const calls = createSentryMocks();
		await logSentryMessageWithBreadcrumb({
			message: 'no_window',
			level: 'warning',
		});
		expect(calls.breadcrumbs.length).toBe(0);
		expect(calls.messages.length).toBe(0);
	});

	test('sanitizes breadcrumb data and message extra', async () => {
		globalThis.window = {};
		const calls = createSentryMocks();
		const longString = 'a'.repeat(400);
		const longArray = Array.from({ length: 40 }, (_, i) => i);
		await logSentryMessageWithBreadcrumb({
			message: 'sanitize_test',
			level: 'info',
			category: 'test',
			reason: 'unit',
			data: {
				longString,
				longArray,
				deep: { a: { b: { c: { d: 'x' } } } },
			},
			extra: {
				longString,
			},
		});

		expect(calls.breadcrumbs.length).toBe(1);
		const breadcrumb = calls.breadcrumbs[0];
		expect(breadcrumb.category).toBe('test');
		expect(breadcrumb.message).toBe('sanitize_test');
		expect(breadcrumb.data.longString.endsWith('...')).toBe(true);
		expect(breadcrumb.data.longString.length).toBeLessThanOrEqual(303);
		expect(breadcrumb.data.longArray.length).toBe(20);
		expect(breadcrumb.data.deep.a.b.c).toBe('[truncated]');

		expect(calls.messages.length).toBe(1);
		const message = calls.messages[0];
		expect(message.message).toBe('sanitize_test');
		expect(message.options.extra.longString.endsWith('...')).toBe(true);
	});

	test('truncates oversized payload', async () => {
		globalThis.window = {};
		const calls = createSentryMocks();
		const bigPayload = {};
		for (let i = 0; i < 80; i += 1) {
			bigPayload[`key_${i}`] = 'b'.repeat(300);
		}
		await logSentryMessageWithBreadcrumb({
			message: 'oversize_test',
			level: 'warning',
			data: bigPayload,
			extra: bigPayload,
		});

		expect(calls.breadcrumbs.length).toBe(1);
		const breadcrumb = calls.breadcrumbs[0];
		expect(breadcrumb.data._truncated).toBe(true);
		expect(typeof breadcrumb.data._size).toBe('number');

		expect(calls.messages.length).toBe(1);
		expect(calls.messages[0].options.extra._truncated).toBe(true);
	});
});
