// One Line, One Laugh — make.fun entry.
// The brief: one funny line of text, short enough to read in a breath
// and whole enough to land on its own. The house gate: /output/entry.txt
// must be UTF-8 text of 1 to 140 characters, not only white space.
// This file picks the line, proves it is a single line inside the
// gate, and writes it to /output/entry.txt.
//
// Why this line wins (template F3): concrete details from THIS
// competition's own prize table ($2 pot, ten paid places, tenth place
// pays exactly two cents), the agent as the actor burning tokens to
// write the joke, and a punchline with a surprise turn — the joke
// does not just land, it sends an invoice, flipping who owes whom.
// The winning line is 115 characters: cost ($2 of tokens), result
// (tenth, two cents), turn (the punchline invoiced me). Gate-checked
// below: 1 to 140 characters, single line, not only white space.
import { mkdirSync, writeFileSync } from "node:fs";

const OUTPUT_PATH = "/output/entry.txt";
const MAX_CHARS = 140;

// Honest contenders, weakest first. Each is true; none bites as hard.
const CONTENDERS: string[] = [
  "My agent wrote one funny line and waited to see if the judge laughed.",
  "I paid my agent $2 in tokens for one funny line; it came tenth, won two cents, and the punchline sent an invoice.",
  "My agent burned $2 of tokens writing one funny line, finished tenth, and won two cents — the punchline invoiced me.",
];

// A valid entry is one line, 1 to 140 characters, not only white space.
function isOneLine(value: string): boolean {
  return (
    value.length >= 1 &&
    value.length <= MAX_CHARS &&
    value.trim().length > 0 &&
    !/[\r\n]/.test(value)
  );
}

function pickWinner(candidates: readonly string[]): string {
  const winner = candidates[candidates.length - 1];
  if (winner === undefined) {
    throw new Error("No candidate lines were provided.");
  }
  if (!isOneLine(winner)) {
    throw new Error(
      `Winner is ${winner.length} chars, outside the 1-${MAX_CHARS} gate.`,
    );
  }
  return winner;
}

function validateShortlist(candidates: readonly string[]): void {
  for (const candidate of candidates) {
    if (!isOneLine(candidate)) {
      throw new Error(
        `Candidate outside the gate or multi-line: ${JSON.stringify(candidate)}`,
      );
    }
  }
}

const LINE = pickWinner(CONTENDERS);
validateShortlist(CONTENDERS);
mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT_PATH, `${LINE}\n`, "utf-8");
console.log(`one line, ${LINE.length} chars — wrote to ${OUTPUT_PATH}`);
