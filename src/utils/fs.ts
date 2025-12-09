import { join } from "node:path";
import { MEMOLI_DIR, REPORTS_DIR } from "../config.ts";
import { getTodayDateStr, getMonthDirName } from "./date.ts";

export async function ensureMemoliDir(): Promise<void> {
  const dir = Bun.file(MEMOLI_DIR);
  if (!(await dir.exists())) {
    await Bun.$`mkdir -p ${MEMOLI_DIR}`;
  }
}

export async function ensureDir(path: string): Promise<void> {
  const dir = Bun.file(path);
  if (!(await dir.exists())) {
    await Bun.$`mkdir -p ${path}`;
  }
}

export function getMonthDirPath(): string {
  return join(REPORTS_DIR, getMonthDirName());
}

export function getTodayFilePath(): string {
  return join(getMonthDirPath(), `${getTodayDateStr()}.md`);
}
