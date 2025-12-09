import { test, expect } from "bun:test";
import { join } from "node:path";

const CLI_PATH = join(import.meta.dir, "../../../index.ts");

test("memo without name shows usage error", async () => {
  const proc = Bun.spawn(["bun", CLI_PATH, "memo"], {
    stdout: "pipe",
    stderr: "pipe",
  });
  const exitCode = await proc.exited;
  const stderr = await new Response(proc.stderr).text();

  expect(exitCode).toBe(1);
  expect(stderr).toContain("Usage: memoli memo <name>");
});
