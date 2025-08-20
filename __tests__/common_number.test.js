import { numberWithCommas } from "../core/mod.ts";

describe("numberWithCommas", () => {
  test("formats integers with thousands separators", () => {
    expect(numberWithCommas(0)).toBe("0");
    expect(numberWithCommas(1)).toBe("1");
    expect(numberWithCommas(12)).toBe("12");
    expect(numberWithCommas(123)).toBe("123");
    expect(numberWithCommas(1234)).toBe("1,234");
    expect(numberWithCommas(1234567)).toBe("1,234,567");
  });

  test("keeps decimal part intact", () => {
    expect(numberWithCommas(1234.5)).toBe("1,234.5");
    expect(numberWithCommas(1234.567)).toBe("1,234.567");
  });

  test("handles large numbers (exponential input) and formats with commas", () => {
    expect(numberWithCommas(1e6)).toBe("1,000,000");
  });

  test("returns empty string for nullish", () => {
    expect(numberWithCommas(null)).toBe("");
    expect(numberWithCommas(undefined)).toBe("");
  });
});

