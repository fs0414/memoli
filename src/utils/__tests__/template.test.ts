import { test, expect } from "bun:test";
import { getTemplatePath, loadTemplate } from "../template.ts";
import { TEMP_DIR } from "../../config.ts";

test("getTemplatePath returns correct path", () => {
  const result = getTemplatePath("work");
  expect(result).toBe(`${TEMP_DIR}/work.md`);
});

test("loadTemplate throws error for non-existent template", async () => {
  await expect(loadTemplate("non-existent-template")).rejects.toThrow("Template not found");
});
