import { default as dayjs } from 'dayjs';
export type DayjsPluginSetup = typeof import('dayjs/plugin/utc') & typeof import('dayjs/plugin/timezone') & typeof import('dayjs/plugin/isBetween') & typeof import('dayjs/plugin/localizedFormat') & typeof import('dayjs/plugin/duration') & typeof import('dayjs/plugin/relativeTime');
export declare const dayjsJp: typeof dayjs;
export declare const formatDateForInput: (date: Date | string | null) => string;
export declare const parseInputDate: (dateString: string) => Date | null;
export declare const $getDayjs: () => typeof dayjs;
