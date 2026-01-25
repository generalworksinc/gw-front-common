declare module 'dayjs' {
	interface Dayjs {
		utc(keepLocalTime?: boolean): import('dayjs').Dayjs;
	}

	interface DayjsStatic {
		utc(date?: string | number | Date, format?: string): import('dayjs').Dayjs;
	}
}
