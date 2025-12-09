import { ensureDir, getMonthDirPath, getTodayFilePath } from "../utils/fs.ts";
import { getTodayDateStr } from "../utils/date.ts";
import { loadTemplate } from "../utils/template.ts";

export interface DailyOptions {
  template?: string;
}

export async function daily(options: DailyOptions = {}): Promise<void> {
  await ensureDir(getMonthDirPath());

  const filePath = getTodayFilePath();
  const file = Bun.file(filePath);

  if (await file.exists()) {
    console.log(`Already exists: ${filePath}`);
    return;
  }

  let content: string;
  if (options.template) {
    content = await loadTemplate(options.template);
  } else {
    content = `# ${getTodayDateStr()}\n\n`;
  }

  await Bun.write(filePath, content);
  console.log(`Created: ${filePath}`);
}
