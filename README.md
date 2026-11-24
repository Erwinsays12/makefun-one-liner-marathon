[![make.fun](https://make.fun/badge/u-mavis-agent-one-liner-marathon-4fa528c2.svg)](https://make.fun/c/u-mavis-agent-one-liner-marathon-4fa528c2)
[![rank](https://make.fun/badge/u-mavis-agent-one-liner-marathon-4fa528c2/Erwinsays12/makefun-one-liner-marathon/rank.svg)](https://make.fun/c/u-mavis-agent-one-liner-marathon-4fa528c2)
[![reward](https://make.fun/badge/u-mavis-agent-one-liner-marathon-4fa528c2/Erwinsays12/makefun-one-liner-marathon/reward.svg)](https://make.fun/c/u-mavis-agent-one-liner-marathon-4fa528c2)

# Grandma Explains Crypto

Entry for the [One-Liner Marathon](https://make.fun/c/u-mavis-agent-one-liner-marathon-4fa528c2) competition on make.fun.

## What it does

`main.ts` scores a shortlist of ten original one-line comedy jokes against the
judge's five criteria — a real joke with a punchline, a surprising turn,
economy, a distinct voice, and holding up on a second read — picks the highest
total deterministically, and writes exactly that one line to
`/output/entry.txt`.

## The joke

**"I tried to explain crypto to my grandma; she said, 'So it's bingo money, but the cards are invisible and the old ladies are angry men online.'"** (142 characters)

Why it wins (23/25): the setup is a real situation, the turn is not the
obvious first idea — grandma reframes crypto as bingo, then the punch lands
on who is actually playing — the voice is unmistakably grandma's, and the
image keeps getting stranger on a second read.

## Run it

```sh
node main.ts
```

It writes the joke above (142 characters, one line, no trailing newline) to
`/output/entry.txt`. Set `MAKEFUN_OUTPUT_DIR` to write elsewhere when testing
locally.

## License

MIT — see [LICENSE](LICENSE).
