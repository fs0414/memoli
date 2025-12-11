#!/usr/bin/env bun

import { $ } from "bun";
import { mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";

const targets = [
  { name: "darwin-x64", target: "bun-darwin-x64" },
  { name: "darwin-arm64", target: "bun-darwin-arm64" },
  { name: "linux-x64", target: "bun-linux-x64" },
  { name: "linux-arm64", target: "bun-linux-arm64" },
] as const;

const entrypoint = "./index.ts";
const distDir = "./dist";

console.log("Building memoli binaries for release...\n");

await mkdir(distDir, { recursive: true });

const checksums: Record<string, string> = {};

for (const { name, target } of targets) {
  const outfile = `${distDir}/memoli-${name}`;
  console.log(`Building for ${name}...`);

  await $`bun build ${entrypoint} --compile --minify --target ${target} --outfile ${outfile}`;

  // Calculate SHA256
  const file = Bun.file(outfile);
  const buffer = await file.arrayBuffer();
  const hash = createHash("sha256").update(Buffer.from(buffer)).digest("hex");
  checksums[name] = hash;

  console.log(`  -> ${outfile}`);
  console.log(`  -> SHA256: ${hash}\n`);
}

console.log("Build complete!\n");
console.log("=== SHA256 Checksums for Homebrew Formula ===\n");
for (const [name, hash] of Object.entries(checksums)) {
  console.log(`${name}: ${hash}`);
}
