# Progression Builder v0.3

by ElMiauro — [Live demo](https://progression-builder.netlify.app)

A browser tool for building chord progressions, then layering bass, drums, and melody on top and hearing the whole thing played back with real instrument samples.

## Features

- **Progression builder** — pick a key/mode and see every diatonic chord in it; lock the key, mode, or both while you experiment with the rest.
- **Progression generators** — Random, Smart (weighted toward common motion), Common (genre templates), and Genre (progressions/tempo suited to a style — jazz, punk, reggae, metal, ambient, pop, hip hop, 12-bar blues).
- **Chord voicings** — triads, first-inversion triads, power chords, shell voicings, 7th chords, 9th chords.
- **Bass line generator** — pattern-based bass lines that track the chords (root/third/fifth/octave movement) per genre.
- **Drum patterns** — genre-appropriate kick/snare/hihat patterns, synced to the same meter and tempo.
- **Melody generator** — genre-aware motif generation (repeat/invert/sequence/fragment) over the current progression.
- **Playback** — all parts (chords, bass, drums, melody) play together via [Tone.js](https://tonejs.github.io/), using real piano, acoustic guitar, and electric bass note samples instead of plain synth tones.
- **MIDI export** for the current progression.
- Supports all 7 modes of the major scale (Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian) and 4/4 or 3/4 meter.

## Tech stack

React 19 + TypeScript, built with Vite. Audio via Tone.js. Tests with Vitest + Testing Library. Linted with ESLint (flat config) + Prettier.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) — the page hot-reloads as you edit.

Other scripts:

```bash
npm run build       # production build
npm run preview     # preview the production build locally
npm run typecheck   # tsc --noEmit
npm run lint         # eslint .
npm run lint:fix
npm run format       # prettier --write .
npm run test         # vitest
```

## How to use it

Pick a key and mode, and you'll see the chords belonging to it. Click a chord's name to see the notes it's made of. Use the Generator drawer to build a progression from scratch (random, smart, common templates, or genre-based), then open the Bass, Drums, and Melody drawers to add accompaniment. Hit Play to hear it all together.

[This might help](https://www.musictheory.net/lessons/23) if the key/mode/interval relationship isn't clicking.

## FAQ

**Is this ever going to be of any use at all?**
That goes beyond me. However, I did use this thing to compose a few songs.

**Wouldn't it be easier to just learn the scales?**
Yes, but actually, no. While this only supports the 7 Greek modes and the relationship between notes is purely mathematical, I just can't be bothered to remember what the 5th degree of F# Lydian is (it's C#, btw). So yeah.

**Why are you even doing this?**
I'm bored and I want to learn React. Also I really like the design of this thing.

## Storytime

This is a weird project I started back in 2017, written in plain JS. It was awful and only worked partially, but was pretty ambitious given my web dev knowledge at the time. This is a "remastered" version, originally built to learn React, since migrated to TypeScript + Vite, and now generating full songs instead of just static progressions.

elMiauro was here
