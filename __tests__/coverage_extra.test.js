import * as common from "../core/index.ts";

describe("Additional coverage for core utils", () => {
  test("deepFreeze returns function as-is", () => {
    function sample() { return 123; }
    const frozen = common.deepFreeze(sample);
    expect(frozen).toBe(sample);
    expect(frozen()).toBe(123);
  });

  test("snakeToCamelHeadUpper converts head to upper camel case", () => {
    expect(common.snakeToCamelHeadUpper("sample_text")).toBe("SampleText");
    expect(common.snakeToCamelHeadUpper("a")).toBe("A");
  });

  test("replaceSnakeToCamel replaces keys recursively", () => {
    const obj = { first_name: 1, nested_obj: { deep_key: 2 } };
    const result = common.replaceSnakeToCamel(obj);
    expect(result).toEqual({ firstName: 1, nestedObj: { deepKey: 2 } });
  });

  test("objectifyByKeyParam supports keyName starts with dot (literal property)", () => {
    const arr = [{ ".id": "x1", value: 1 }, { ".id": "x2", value: 2 }];
    const res = common.objectifyByKeyParam(arr, ".id");
    expect(res).toEqual({ x1: { ".id": "x1", value: 1 }, x2: { ".id": "x2", value: 2 } });
  });

  test("objectifyByKeyParam throws when nested key path missing", () => {
    const arr = [{ meta: {} }];
    expect(() => common.objectifyByKeyParam(arr, "meta.id")).toThrow(
      /keyName is not found in object/
    );
  });

  test("objectifyByKeyParam accepts plain object input", () => {
    const input = { a: { id: "a", v: 1 }, b: { id: "b", v: 2 } };
    const res = common.objectifyByKeyParam(input, "id");
    expect(res).toEqual({ a: { id: "a", v: 1 }, b: { id: "b", v: 2 } });
  });
});
