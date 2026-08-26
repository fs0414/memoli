import { execFile } from "node:child_process";
import { join } from "node:path";
import { promisify } from "node:util";

import { describe, expect, test } from "vitest";

const execFileAsync = promisify(execFile);
const currentDir = import.meta.dirname;
const CLI_PATH = join(currentDir, "..", "..", "..", "index.ts");

describe("task command", () => {
  test("task --help shows help", async () => {
    const { stdout } = await execFileAsync("bun", [CLI_PATH, "task", "--help"]);
    expect(stdout).toContain("memoli task - Task management");
    expect(stdout).toContain("add");
    expect(stdout).toContain("done");
    expect(stdout).toContain("doing");
    expect(stdout).toContain("rm");
  });

  test("help includes task command", async () => {
    const { stdout } = await execFileAsync("bun", [CLI_PATH, "--help"]);
    expect(stdout).toContain("task");
  });

  test("task add without title shows usage", async () => {
    try {
      await execFileAsync("bun", [CLI_PATH, "task", "add"]);
    } catch (error: unknown) {
      const execError = error as { stderr: string };
      expect(execError.stderr).toContain("Usage: memoli task add");
    }
  });
});
