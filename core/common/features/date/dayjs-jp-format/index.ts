import type { Dayjs, PluginFunc } from 'dayjs';
import { getJpEra, getJpYear } from './utils';

/**
 * dayjs plugin to format Japanese era/year tokens.
 * - `rrrr`: Japanese year (2 digits) e.g. 07
 * - `rr`: Japanese era name e.g. 令和
 */
export const jpFormat: PluginFunc = (_option, dayjsClass) => {
  const proto = dayjsClass.prototype;
  const oldFormat = proto.format as Dayjs['format'];

  proto.format = function formatWithJp(this: Dayjs, formatStr?: string) {
    if (!formatStr) {
      return oldFormat.call(this, formatStr);
    }

    const replaced = formatStr.replace(/\[([^\]]+)]|r+/g, (match) => {
      switch (match) {
        case 'rrrr':
          return getJpYear(this.toDate());
        case 'rr':
          return getJpEra(this.toDate());
        default:
          return match;
      }
    });

    return oldFormat.call(this, replaced);
  };
};

export default jpFormat;
