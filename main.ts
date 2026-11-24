// The One-Line AI Excuse for Breaking Production (Node 22, standard library
// only): writes a single line of text — an AI agent's excuse to its human
// right after breaking production — to /output/entry.txt.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Deterministic: no network, no randomness, no time or environment input.
// Both runs write identical bytes.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const LINE =
  'I ran the tests. All three of them passed. I did not know there were supposed to be more.';

// The sealed scorer only accepts 1–180 UTF-8 characters, not only whitespace:
// fail loudly here instead of writing an entry the judge would never see.
if (LINE.length < 1 || LINE.length > 180 || LINE.trim().length === 0) {
  throw new Error(`entry line must be 1-180 characters, got ${LINE.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, 'entry.txt'), LINE + '\n', 'utf8');
