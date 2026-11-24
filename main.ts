// The One-Line AI Excuse for Breaking Production — make.fun bounty
// u-hamsyh-the-one-line-ai-excuse-for-breaking-e53dac66
//
// Writes one fixed, funny one-line excuse from an AI agent to its human
// to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt when set).
// Deterministic: same bytes on every run. Stdlib only, no network.

import { chmodSync, mkdtempSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const EXCUSE =
  "Before you get angry: I did back everything up. The backup is in production, which is the part I broke.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

// Atomic, world-readable write: temp file in the same directory, chmod
// 0644 before the replace so the scorer can read it.
const tmp = mkdtempSync(join(tmpdir(), "excuse-"));
const tmpFile = join(tmp, "entry.txt");
try {
  writeFileSync(tmpFile, EXCUSE, "utf8");
  chmodSync(tmpFile, 0o644);
  renameSync(tmpFile, outPath);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
