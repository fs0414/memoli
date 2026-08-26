import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { TEMP_DIR } from "../config.ts";

export const getTemplatePath = (name: string): string =>
  join(TEMP_DIR, `${name}.md`);

export const loadTemplate = async (name: string): Promise<string> => {
  const path = getTemplatePath(name);

  try {
    return await readFile(path, "utf8");
  } catch (error) {
    if (
      !(error instanceof Error && "code" in error && error.code === "ENOENT")
    ) {
      throw error;
    }
  }

  throw new Error(`Template not found: ${path}`);
};
