import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration.js';
import isBetween from 'dayjs/plugin/isBetween.js';
import LocalizedFormat from 'dayjs/plugin/localizedFormat.js';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import 'dayjs/locale/ja.js';
import { jpFormat } from './date/dayjs-jp-format';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);
dayjs.extend(LocalizedFormat);
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale('ja');
dayjs.extend(jpFormat);

export const dayjsJp = dayjs;

export const formatDateForInput = (date: Date | string | null): string => {
	if (!date) return '';
	const d = typeof date === 'string' ? dayjsJp(date) : dayjsJp(date);
	return d.format('YYYY-MM-DDTHH:mm');
};

export const parseInputDate = (dateString: string): Date | null => {
	if (!dateString) return null;
	const d = dayjsJp(dateString);
	return d.isValid() ? d.toDate() : null;
};

// Migration helper (scheduler_front_solid compatibility)
export const $getDayjs = () => dayjsJp as typeof dayjs;
