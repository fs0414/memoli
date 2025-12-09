import { test, expect } from "bun:test";
import { getTodayDateStr, getMonthDirName } from "../date.ts";

test("getTodayDateStr returns YYYY-MM-DD format", () => {
  const result = getTodayDateStr();
  expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
});

test("getTodayDateStr returns today's date", () => {
  const result = getTodayDateStr();
  const now = new Date();
  const expected = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  expect(result).toBe(expected);
});

test("getMonthDirName returns YYYY-MM format", () => {
  const result = getMonthDirName();
  expect(result).toMatch(/^\d{4}-\d{2}$/);
});

test("getMonthDirName returns current month", () => {
  const result = getMonthDirName();
  const now = new Date();
  const expected = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  expect(result).toBe(expected);
});
