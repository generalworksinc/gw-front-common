import 'dayjs/plugin/utc';
import 'dayjs/plugin/timezone';
import 'dayjs/plugin/isBetween';
import 'dayjs/plugin/localizedFormat';
import 'dayjs/plugin/duration';
import 'dayjs/plugin/relativeTime';

declare module 'dayjs' {
	interface Dayjs {
		utc(keepLocalTime?: boolean): import('dayjs').Dayjs;
	}

	interface DayjsStatic {
		utc(date?: string | number | Date, format?: string): import('dayjs').Dayjs;
	}
}
