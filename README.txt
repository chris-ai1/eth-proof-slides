Authors: Christian Reitwiessner
Copyright (c) 2026 Christian Reitwiessner

AN ALGEBRAIC ESCAPE — THE ETH ARGUMENT, STEP BY STEP

An overview-first animated slide website. The initial slides explain the goal,
obstacle, and strategy before introducing the construction. Every slide states
why the step is needed and where the argument goes next. The transitions are
part of the narration, not just interface labels.

Features
20 slides, each with three reader-controlled reveal steps.
Interactive polynomial and root-filter dials, summary conditioning, and swaps.
Optional prerecorded narration, transcripts, and an automatically advancing tour.
Keyboard controls, mobile navigation, reduced motion, and a dark theme.
Expandable mathematical details and a fully quantified companion PDF.
All production assets, including KaTeX, are local. No server or account required.

Hosting
GitHub Pages: https://chris-ai1.github.io/eth-proof-slides/
The GitHub Actions workflow publishes site/ on pushes to main.
The website is buildless: the committed static site is the deployment artifact.
No credentials or build-time service are required by the browser.

Editing
scripts/content.py contains the rewritten script, equations, purposes, and
causal transitions. Run python3 scripts/content.py to regenerate slides.js and
the downloadable script. site/app.js contains the SVG diagrams and navigation;
site/style.css controls presentation. scripts/audio.py regenerates narration
when the local Piper model and FFmpeg are available. The prerecorded audio is
already committed, so audio generation is not required for deployment.

Checks
npm ci
npx playwright install chromium
npm test

Tests open site/index.html directly in Chromium, with no HTTP server. On Linux,
install the Chromium runtime libraries required by Playwright. TEST_URL can point
the same test suite at the hosted site. npm run check validates JavaScript syntax.

Mathematical scope and attribution
This is an exposition of the reported direct SAT ETH-refutation argument. It
states the spectral and placement lemmas explicitly, explains exact group
separation and Hermite uniqueness, and demonstrates support extraction. The
full general recovery-cost and exact-arithmetic estimates are stated results.
It is not an independent verification of the original theorem or formalization.

Primary sources retain their authorship:
Shiva Kintali: https://shivakintali.github.io/papers/ETH.pdf
Mark Sellke: https://msellke.com/Files/ETH-False-Slides.pdf
Ryan O'Donnell: https://www.cs.cmu.edu/~odonnell/some_eth_false_exposition.pdf
OpenAI: https://github.com/openai/math/tree/main/preprints/The-Exponential-Time-Hypothesis-is-False-October-25-2026

The companion and exact source record are in site/assets/downloads/.
KaTeX is used under its own MIT license, preserved in site/vendor/.
Optional synthetic narration uses Piper's en_US-lessac-high model:
https://huggingface.co/rhasspy/piper-voices/tree/main/en/en_US/lessac/high
The model itself is not distributed in this repository.
