// One-Liner Marathon — entry program.
//
// The competition asks for a single one-line comedy joke, up to 280
// characters, written by a program to /output/entry.txt. A house judge
// (a deadpan stand-up comic) compares entries two at a time, weighing, in
// order: (1) it is a real one-line joke with a punchline, (2) the turn is
// surprising and lands on the first read, (3) every word earns its place,
// (4) it has a distinct voice and point of view, (5) it holds up on a
// second read without leaning on shock.
//
// This program scores a shortlist of original candidate one-liners against
// those five criteria (each 0-5), picks the highest total deterministically
// (ties break toward the bigger surprise, then the shorter text), and writes
// exactly that one line — no trailing newline — to /output/entry.txt.
//
// The winner (verified locally: one line, 142 characters):
//   "I tried to explain crypto to my grandma; she said, 'So it's bingo
//    money, but the cards are invisible and the old ladies are angry men
//    online.'"
// Why it wins: the setup is a real situation (explaining crypto to a
// grandmother), the turn is not the obvious first idea (she reframes crypto
// as bingo, then the punch lands on "angry men online"), the voice is
// unmistakably grandma's — nobody else would say it that way — and the joke
// survives a second read because the image keeps getting stranger.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type Candidate = {
  text: string;
  // Scores 0-5 against the judge's five criteria, in order:
  joke: number; // a real one-line joke with a punchline
  surprise: number; // the turn is not the obvious first idea
  economy: number; // every word earns its place
  voice: number; // a distinct voice and point of view
  secondRead: number; // holds up on a second read, no shock crutch
};

const CANDIDATES: Candidate[] = [
  {
    // Grandma reframes crypto as bingo, then the punch lands on who is
    // actually playing. Distinct voice, surprising turn, durable image.
    text: "I tried to explain crypto to my grandma; she said, 'So it's bingo money, but the cards are invisible and the old ladies are angry men online.'",
    joke: 5,
    surprise: 5,
    economy: 4,
    voice: 5,
    secondRead: 4,
  },
  {
    // The meaning of life, answered by hold music. Deadpan structure, tight,
    // but the "call is important to us" gag is a familiar one.
    text: "My smart speaker gave me the meaning of life — it put me on hold and said my call was important to it.",
    joke: 5,
    surprise: 4,
    economy: 5,
    voice: 3,
    secondRead: 4,
  },
  {
    // Savings earning nothing because the money works from home. Topical,
    // economical, but the voice is generic.
    text: "I asked my bank why my savings earn nothing; it said the money's working from home now.",
    joke: 5,
    surprise: 4,
    economy: 5,
    voice: 3,
    secondRead: 3,
  },
  {
    // A Roomba with commitment issues. Good turn and voice, but the
    // appliance-complains premise is well trodden.
    text: "My Roomba filed for divorce — it said I keep moving the furniture and never commit to a layout.",
    joke: 5,
    surprise: 4,
    economy: 4,
    voice: 4,
    secondRead: 3,
  },
  {
    // AI agrees to the terms before it agrees to the marriage. Solid turn,
    // but the setup telegraphs the punch a little.
    text: "I asked AI to write my wedding vows; it agreed to the terms and conditions before it agreed to me.",
    joke: 5,
    surprise: 4,
    economy: 4,
    voice: 3,
    secondRead: 3,
  },
  {
    // The gym misses you, and so do you, the old you. Tight and rueful, but
    // the turn is gentle rather than surprising.
    text: "The gym keeps emailing me 'we miss you' — I miss the version of me that signed up, too.",
    joke: 5,
    surprise: 3,
    economy: 5,
    voice: 3,
    secondRead: 3,
  },
  {
    // A standing desk that only upgrades the tiredness. Economical, but the
    // punch is the first idea the premise suggests.
    text: "I bought a standing desk to be healthier; now I just stand here, tired, in a more expensive way.",
    joke: 5,
    surprise: 3,
    economy: 4,
    voice: 3,
    secondRead: 3,
  },
  {
    // A password with better boundaries than its owner. Clean, but the
    // punchline is a therapy cliché wearing a tech costume.
    text: "My password is so strong even I can't get in — my bank account now has better boundaries than I do.",
    joke: 5,
    surprise: 3,
    economy: 4,
    voice: 3,
    secondRead: 3,
  },
  {
    // Therapy, billed by the insight. The joke lands, but "I pay her to find
    // that out" is the obvious second half of the setup.
    text: "My therapist says I use jokes to deflect, which is hilarious, because I pay her $200 an hour to find that out.",
    joke: 5,
    surprise: 3,
    economy: 3,
    voice: 3,
    secondRead: 3,
  },
  {
    // A fungi pun. It is a pun first and a joke second, and the surprise is
    // just the wordplay — no voice, no second read.
    text: "I told my plants I'm a fun guy, and now they're the only ones who believe in mushrooms.",
    joke: 4,
    surprise: 2,
    economy: 4,
    voice: 2,
    secondRead: 2,
  },
];

function total(c: Candidate): number {
  return c.joke + c.surprise + c.economy + c.voice + c.secondRead;
}

// A candidate that breaks the gate can never win, however funny it is:
// drop it before scoring so a future edit to a candidate cannot smuggle
// an invalid entry through.
function gatePasses(c: Candidate): boolean {
  return (
    c.text.length >= 1 &&
    c.text.length <= 280 &&
    c.text.trim().length > 0 &&
    !c.text.includes("\n") &&
    !c.text.includes("\r")
  );
}

function pick(candidates: Candidate[]): Candidate {
  const valid = candidates.filter(gatePasses);
  if (valid.length === 0) throw new Error("no candidate passes the gate");
  const sorted = [...valid].sort((a, b) => {
    const byTotal = total(b) - total(a);
    if (byTotal !== 0) return byTotal;
    const bySurprise = b.surprise - a.surprise;
    if (bySurprise !== 0) return bySurprise;
    return a.text.length - b.text.length;
  });
  return sorted[0];
}

// Full ranking, printed for transparency: the winner must lead by more
// than a hair, or the shortlist needs a stronger joke.
const ranked = [...CANDIDATES]
  .filter(gatePasses)
  .sort((a, b) => total(b) - total(a) || b.surprise - a.surprise);
for (const c of ranked) {
  console.log(`  ${String(total(c)).padStart(2)}/25  ${c.text.length} chars  ${c.text.slice(0, 60)}…`);
}
if (ranked.length > 1 && total(ranked[0]) - total(ranked[1]) < 2) {
  console.log("warning: winner leads by less than 2 points");
}

const winner = pick(CANDIDATES);

// The gate: /output/entry.txt must be UTF-8 text of 1 to 280 characters,
// not only white space, a single line.
if (winner.text.length < 1 || winner.text.length > 280) {
  throw new Error(`entry is ${winner.text.length} characters, outside 1-280`);
}
if (winner.text.trim().length === 0) {
  throw new Error("entry is only white space");
}
if (winner.text.includes("\n") || winner.text.includes("\r")) {
  throw new Error("entry must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), winner.text, "utf8");

console.log(`score ${total(winner)}/25, ${winner.text.length} characters:`);
console.log(winner.text);
