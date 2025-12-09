import { test, expect, beforeEach, afterEach } from "bun:test";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { rmSync, mkdirSync } from "node:fs";

const CLI_PATH = join(import.meta.dir, "../../../index.ts");

test("daily creates a new file", async () => {
  const result = await Bun.$`bun ${CLI_PATH} daily`.text();
  // Already exists or Created
  expect(result).toMatch(/(Created|Already exists):/);
});

test("daily shows 'Already exists' when file exists", async () => {
  await Bun.$`bun ${CLI_PATH} daily`;
  const result = await Bun.$`bun ${CLI_PATH} daily`.text();
  expect(result).toContain("Already exists:");
});
