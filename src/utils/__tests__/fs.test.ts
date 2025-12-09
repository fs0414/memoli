import { test, expect } from "bun:test";
import { getTodayFilePath, getMonthDirPath } from "../fs.ts";
import { REPORTS_DIR } from "../../config.ts";
import { getTodayDateStr, getMonthDirName } from "../date.ts";

test("getTodayFilePath returns correct path with month directory", () => {
  const result = getTodayFilePath();
  const expected = `${REPORTS_DIR}/${getMonthDirName()}/${getTodayDateStr()}.md`;
  expect(result).toBe(expected);
});

test("getTodayFilePath ends with .md", () => {
  const result = getTodayFilePath();
  expect(result.endsWith(".md")).toBe(true);
});

test("getMonthDirPath returns reports/YYYY-MM", () => {
  const result = getMonthDirPath();
  expect(result).toContain("reports");
  expect(result).toMatch(/\d{4}-\d{2}$/);
});
