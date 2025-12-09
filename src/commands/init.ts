import { MEMOLI_DIR, REPORTS_DIR, TEMP_DIR, MEMO_DIR } from "../config.ts";

export async function init(): Promise<void> {
  const dirs = [MEMOLI_DIR, REPORTS_DIR, TEMP_DIR, MEMO_DIR];

  for (const dir of dirs) {
    const file = Bun.file(dir);
    if (!(await file.exists())) {
      await Bun.$`mkdir -p ${dir}`;
    }
  }

  console.log(`Initialized memoli at ${MEMOLI_DIR}`);
  console.log("Created directories:");
  console.log(`  - ${REPORTS_DIR}`);
  console.log(`  - ${TEMP_DIR}`);
  console.log(`  - ${MEMO_DIR}`);
}
