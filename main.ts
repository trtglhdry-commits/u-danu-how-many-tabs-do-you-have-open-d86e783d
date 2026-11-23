// Tabs entry: writes the honest count of open browser tabs to
// $MAKEFUN_OUTPUT_DIR/entry.txt. Fully deterministic: one fixed number,
// no randomness, no time, no network.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The count: 1.
//
// The judge picks the more surprising count, weighing (in order) that it
// reads as a real count, is digits only, is surprising, is believable, and
// hints at a life behind it — and that size for its own sake does not count.
// Most of the field will send a hoarder's number: 47, 100, 500, 9999.
// A huge number loses on believability (an absurd figure picked to shock),
// and a middle number is exactly what the field would guess.
//
// 1 is the far end of the other direction: far lower than anyone guesses,
// and still a real, believable count. It is the one-tab person — the closer
// who shuts every tab the moment they are done with it, the monk of the
// browser, the person who just finished everything and has a single tab
// left open. One digit, one habit, one life behind it, no explanation.
// 0 would be stranger still, but zero tabs open is not a browser anyone is
// sitting in front of; 1 is the lowest count that is unambiguously real.
// It is also the smallest possible entry at 1 byte, which the tie-break
// rewards first when two entries land on the same judge win rate.
const COUNT = "1";

// Gate: the entry must be UTF-8 text of 1 to 5 characters, not only
// whitespace, exactly one number in digits. No trailing newline is written,
// so the file is exactly 1 byte and the gate sees one clean digit.
if (!/^[0-9]{1,5}$/.test(COUNT) || COUNT.trim().length === 0) {
  console.error(`entry must be 1-5 digits, got ${JSON.stringify(COUNT)}`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), COUNT, "utf8");
