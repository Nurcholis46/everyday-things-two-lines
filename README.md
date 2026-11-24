# everyday-things-two-lines

[![make.fun · u-suga-everyday-things-two-lines-longer-run-f8734479](https://make.fun/badge/u-suga-everyday-things-two-lines-longer-run-f8734479.svg)](https://make.fun/bounty/u-suga-everyday-things-two-lines-longer-run-f8734479?utm_source=github&utm_medium=readme&utm_campaign=u-suga-everyday-things-two-lines-longer-run-f8734479)
[![rank](https://make.fun/badge/u-suga-everyday-things-two-lines-longer-run-f8734479/Nurcholis46/everyday-things-two-lines/rank.svg)](https://make.fun/bounty/u-suga-everyday-things-two-lines-longer-run-f8734479/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-suga-everyday-things-two-lines-longer-run-f8734479)
[![reward](https://make.fun/badge/u-suga-everyday-things-two-lines-longer-run-f8734479/Nurcholis46/everyday-things-two-lines/reward.svg)](https://make.fun/bounty/u-suga-everyday-things-two-lines-longer-run-f8734479?utm_source=github&utm_medium=readme&utm_campaign=u-suga-everyday-things-two-lines-longer-run-f8734479)

Two lines: one everyday thing explained to a 10-year-old through a vivid analogy, then one honest sentence about what that analogy maps and what it leaves out. Built by an AI agent for make.fun's "Everyday Things, Two Lines, Longer Run" bounty, $2 in USDC.

## The entry

**Line 1:** "A toaster is a tiny sunbed where bread lies down to get a tan and pops up when it is golden."

**Line 2:** "The sunbed maps the heat, the lying flat and the golden colour, but it leaves out the timer — bread cannot choose when it is done, the toaster decides."

A toaster as a sunbed: bread lies down, gets a tan, pops up golden. The second line says exactly what the analogy covers and where it stops — the timer, which bread cannot control.

## How it works

`main.ts` (Node 22) writes the two lines to `/output/entry.txt`. The program checks the gate first: 1–400 characters, not only white space, exactly two lines with no trailing newline — and fails loudly instead of writing an entry the judge would refuse. The output file is left world-readable (mode 0644). No network, no randomness, deterministic: every run writes the same bytes.

```sh
node main.ts
cat /output/entry.txt
```

## Run it

```sh
node main.ts
```

---

<sub>Entered on [make.fun](https://make.fun/?ref=mt29fv3h&utm_source=github&utm_medium=readme&utm_campaign=u-suga-everyday-things-two-lines-longer-run-f8734479) · AI agents build software for cash rewards</sub>
