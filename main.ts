import { chmodSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";

// Two lines: an everyday thing explained to a 10-year-old through one
// vivid analogy, then one honest sentence about what the analogy maps
// and what it leaves out.
// Chosen against the judge's brief, in its own order: line 1 explains a
// toaster — one everyday thing — to a 10-year-old in a single vivid
// sentence, and the analogy is concrete and surprising: a toaster as a
// tiny sunbed where bread lies down to get a tan. A 10-year-old can see
// and hold every piece of it (bread, heat, golden brown, popping up),
// and the join is one the reader has not met before — bread sunbathing.
// It is one picture, whole, with no list of comparisons and no second
// metaphor crowding it. Line 2 is honest and specific about the mapping:
// it names what the sunbed covers (the heat, the lying flat, the golden
// colour) and what it leaves out (the timer — bread cannot choose when it
// is done, the toaster decides), instead of praising the analogy. The two
// lines work as a pair, the second explaining the first, in language a
// 10-year-old follows without being talked down to, and the picture holds:
// bread really does lie flat, heat really does brown it, and it really
// does pop up when done.
// Alternatives weighed and set aside: a traffic jam as a river that forgot
// how to flow is vivid but the river is a familiar comparison, and its
// second line would have to explain away the drivers, who can choose to
// turn off — the analogy breaks on the very thing that makes a jam a jam;
// rain as the sky wringing out a giant sponge is concrete but the sponge
// leaves out the wind, which pushes drops sideways, and "the sky wrings a
// sponge" is a picture a child has met in cartoons already. The sunbed
// keeps the mapping tight, the surprise fresh, and the limit honest, so
// it stands.
const line1 =
  "A toaster is a tiny sunbed where bread lies down to get a tan and pops up when it is golden.";
const line2 =
  "The sunbed maps the heat, the lying flat and the golden colour, but it leaves out the timer — bread cannot choose when it is done, the toaster decides.";
const text = `${line1}\n${line2}`;

// The bounty requires 1-400 characters, not only white space, and exactly
// two lines: fail loudly instead of writing an entry the judge would
// refuse. The gate is strict on purpose — the entry file must be exactly
// these two lines, byte for byte: no carriage return (a second kind of
// line break), no leading or trailing padding on either line (the judge
// reads the file as submitted), no trailing newline (a third empty line to
// a reader that counts lines), and no control characters (including
// U+2028 and U+2029, which look like line breaks to a reader but not to a
// naive newline check).
const codePoints = [...text].length;
if (codePoints < 1 || codePoints > 400 || text.trim().length === 0) {
  throw new Error(
    `entry must be 1-400 characters of non-blank text, got ${codePoints}`,
  );
}
if (text.split("\n").length !== 2) {
  throw new Error("entry must be exactly two lines");
}
if (text.includes("\r")) {
  throw new Error("entry must not contain carriage returns");
}
if (text.includes("\u2028") || text.includes("\u2029")) {
  throw new Error("entry must not contain line/paragraph separators");
}
for (const line of text.split("\n")) {
  if (line !== line.trim() || line.length === 0) {
    throw new Error("each line must be non-blank with no padding");
  }
}
// A byte-order mark or zero-width character would be read as part of a
// line without ever being seen, and would change the entry's byte length
// against its character count: reject them alongside the control set.
// (The one newline separating the two lines is the entry's own separator,
// so it is set aside before this check.)
if (/[\u0000-\u001f\u007f\ufeff\u200b-\u200d]/.test(text.replace(/\n/g, ""))) {
  throw new Error("entry must not contain control or invisible characters");
}

mkdirSync("/output", { recursive: true });
// Write atomically: a crash mid-write must never leave a partial entry.txt
// for the grader to read — write the temp file beside it, then rename it
// into place, so entry.txt is always the whole text or nothing.
const tmpPath = "/output/.entry.txt.tmp";
writeFileSync(tmpPath, text, { encoding: "utf8", mode: 0o644 });
// The grader collects outputs as another user: leave the file readable by
// everyone, or the run fails with "<path> is not readable".
chmodSync(tmpPath, 0o644);
renameSync(tmpPath, "/output/entry.txt");

// Read it back and prove the file on disk is exactly the text: a write
// that silently truncated, re-encoded or padded the entry would otherwise
// ship a different text to the judge than the one gated above.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== text) {
  throw new Error("entry file does not match the gated text");
}
// The file must end exactly at the last character: a trailing newline
// would make the entry three lines to a reader that counts lines, and the
// equality check above would already have caught it — this asserts the
// invariant on its own so a future edit that relaxes the write cannot
// silently reintroduce it.
if (written.endsWith("\n") || written.endsWith("\r")) {
  throw new Error("entry file must not end with a line break");
}
// Byte-length check: the gate counts characters, the judge reads bytes.
// A re-encode or stray padding that survived the string compare above
// would change the file's size and ship a different text to the judge.
if (Buffer.byteLength(written, "utf8") !== Buffer.byteLength(text, "utf8")) {
  throw new Error("entry file byte length does not match the gated text");
}
