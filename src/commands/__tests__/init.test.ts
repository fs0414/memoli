import { test, expect } from "bun:test";
import { join } from "node:path";

const CLI_PATH = join(import.meta.dir, "../../../index.ts");

test("init creates directories", async () => {
  const result = await Bun.$`bun ${CLI_PATH} init`.text();
  expect(result).toContain("Initialized memoli at");
  expect(result).toContain("reports");
  expect(result).toContain("temp");
  expect(result).toContain("memo");
});

test("init is idempotent", async () => {
  // 2回実行してもエラーにならない
  await Bun.$`bun ${CLI_PATH} init`;
  const result = await Bun.$`bun ${CLI_PATH} init`.text();
  expect(result).toContain("Initialized memoli at");
});
