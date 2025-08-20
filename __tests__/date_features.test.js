import { dayjsJp, formatDateForInput, parseInputDate, $getDayjs } from "../core/features/date/mod.ts";

describe("core/features/date", () => {
  test("dayjsJp is configured with ja locale and plugins", () => {
    const d = dayjsJp("2024-01-01T10:30:00Z");
    expect(d.locale()).toBe("ja");
    expect(typeof d.utc).toBe("function");
    expect(typeof d.tz).toBe("function");
  });

  test("formatDateForInput handles Date and string and null", () => {
    expect(formatDateForInput(new Date("2024-01-01T10:30:00"))).toBe("2024-01-01T10:30");
    expect(formatDateForInput("2024-01-01T10:30:00")).toBe("2024-01-01T10:30");
    expect(formatDateForInput(null)).toBe("");
  });

  test("parseInputDate parses valid and rejects invalid", () => {
    const d = parseInputDate("2024-01-01T10:30");
    expect(d).toBeInstanceOf(Date);
    expect(parseInputDate("")).toBe(null);
    expect(parseInputDate("not-a-date")).toBe(null);
  });

  test("format and parse are inverse for minute precision", () => {
    const original = new Date("2024-12-31T23:59:00");
    const formatted = formatDateForInput(original);
    const parsed = parseInputDate(formatted);
    expect(parsed?.getFullYear()).toBe(2024);
    expect(parsed?.getMonth()).toBe(11);
    expect(parsed?.getDate()).toBe(31);
    expect(parsed?.getHours()).toBe(23);
    expect(parsed?.getMinutes()).toBe(59);
  });

  test("$getDayjs returns dayjs function", () => {
    const dj = $getDayjs();
    const d = dj("2024-01-01");
    expect(typeof dj).toBe("function");
    expect(d.isValid()).toBe(true);
  });
});
