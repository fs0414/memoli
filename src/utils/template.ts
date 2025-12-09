import { join } from "node:path";
import { TEMP_DIR } from "../config.ts";

export function getTemplatePath(name: string): string {
  return join(TEMP_DIR, `${name}.md`);
}

export async function loadTemplate(name: string): Promise<string> {
  const path = getTemplatePath(name);
  const file = Bun.file(path);

  if (!(await file.exists())) {
    throw new Error(`Template not found: ${path}`);
  }

  return await file.text();
}
