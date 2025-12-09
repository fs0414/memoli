import { spawn } from "node:child_process";
import { getTodayFilePath } from "../utils/fs.ts";
import { daily } from "./daily.ts";

export async function today(): Promise<void> {
  const filePath = getTodayFilePath();
  const file = Bun.file(filePath);

  if (!(await file.exists())) {
    await daily();
  }

  const editor = process.env["EDITOR"] || "vi";
  const child = spawn(editor, [filePath], {
    stdio: "inherit",
  });

  child.on("exit", (code) => {
    process.exit(code ?? 0);
  });
}
