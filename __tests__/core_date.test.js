import { describe, expect, test } from 'bun:test';
import {
	dayjsJp,
	formatDateForInput,
	parseInputDate,
} from '../core/common/features/date.ts';

describe('Date Utils', () => {
	describe('dayjsJp', () => {
		test('should be configured with Japanese locale', () => {
			const date = dayjsJp('2024-01-15');
			expect(date.locale()).toBe('ja');
		});

		test('should support UTC and timezone plugins', () => {
			const date = dayjsJp('2024-01-15T10:30:00Z');
			expect(typeof date.utc).toBe('function');
			expect(typeof date.tz).toBe('function');
		});
	});

	describe('formatDateForInput', () => {
		test('should format Date object for input field', () => {
			const date = new Date('2024-01-15T10:30:00');
			const result = formatDateForInput(date);
			expect(result).toBe('2024-01-15T10:30');
		});

		test('should format date string for input field', () => {
			const dateString = '2024-01-15T10:30:00';
			const result = formatDateForInput(dateString);
			expect(result).toBe('2024-01-15T10:30');
		});

		test('should handle ISO string', () => {
			const isoString = '2024-01-15T10:30:00.000Z';
			const result = formatDateForInput(isoString);
			expect(result).toBe('2024-01-15T10:30');
		});

		test('should return empty string for null/undefined/empty', () => {
			expect(formatDateForInput(null)).toBe('');
			expect(formatDateForInput(undefined)).toBe('');
			expect(formatDateForInput('')).toBe('');
		});
	});

	describe('parseInputDate', () => {
		test('should parse valid date string to Date object', () => {
			const dateString = '2024-01-15T10:30';
			const result = parseInputDate(dateString);
			expect(result).toBeInstanceOf(Date);
			expect(result?.getFullYear()).toBe(2024);
			expect(result?.getMonth()).toBe(0);
			expect(result?.getDate()).toBe(15);
			expect(result?.getHours()).toBe(10);
			expect(result?.getMinutes()).toBe(30);
		});

		test('should parse date-only string', () => {
			const dateString = '2024-01-15';
			const result = parseInputDate(dateString);
			expect(result).toBeInstanceOf(Date);
			expect(result?.getFullYear()).toBe(2024);
			expect(result?.getMonth()).toBe(0);
			expect(result?.getDate()).toBe(15);
		});

		test('should parse ISO date string', () => {
			const dateString = '2024-01-15T10:30:00.000Z';
			const result = parseInputDate(dateString);
			expect(result).toBeInstanceOf(Date);
			expect(result?.getFullYear()).toBe(2024);
		});

		test('should return null for empty or invalid', () => {
			expect(parseInputDate('')).toBe(null);
			expect(parseInputDate('invalid-date')).toBe(null);
		});
	});
});
