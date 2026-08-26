import { execFile } from "node:child_process";
import { join } from "node:path";
import { promisify } from "node:util";

import { expect, test } from "vitest";

const execFileAsync = promisify(execFile);
const currentDir = import.meta.dirname;
const CLI_PATH = join(currentDir, "../../../index.ts");

test("init creates directories", async () => {
  const { stdout } = await execFileAsync("bun", [CLI_PATH, "init"]);
  expect(stdout).toContain("Initialized memoli at");
  expect(stdout).toContain("reports");
  expect(stdout).toContain("temp");
  expect(stdout).toContain("memo");
});

test("init is idempotent", async () => {
  // 2回実行してもエラーにならない
  await execFileAsync("bun", [CLI_PATH, "init"]);
  const { stdout } = await execFileAsync("bun", [CLI_PATH, "init"]);
  expect(stdout).toContain("Initialized memoli at");
});
