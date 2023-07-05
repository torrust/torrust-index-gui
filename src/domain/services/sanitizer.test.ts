import { describe, expect, test } from "@jest/globals";
import { remove_harmful_code } from "~/src/domain/services/sanitizer";

describe("sum module", () => {
  test("adds 1 + 2 to equal 3", () => {
    const html = remove_harmful_code("<script>alert('hello')</script>");
    expect(1 + 2).toBe(3);
  });
});
