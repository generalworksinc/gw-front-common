import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/ja";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale("ja");

export const dayjsJp = dayjs;

export const formatDateForInput = (date: Date | string | null): string => {
  if (!date) return "";
  const d = typeof date === "string" ? dayjsJp(date) : dayjsJp(date);
  return d.format("YYYY-MM-DDTHH:mm");
};

export const parseInputDate = (dateString: string): Date | null => {
  if (!dateString) return null;
  const d = dayjsJp(dateString);
  return d.isValid() ? d.toDate() : null;
};

// Migration helper (scheduler_front_solid compatibility)
export const $getDayjs = () => dayjsJp as typeof dayjs;


