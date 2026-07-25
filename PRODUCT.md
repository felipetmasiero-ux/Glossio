# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary user: a serious self-directed language learner — someone who has likely already tried Duolingo and/or Anki and wants a tool that treats language learning as real study, not a casual gamified habit loop. They are motivated by depth (spaced-repetition review, graded reading) rather than by streaks/leaderboards for their own sake. Learning Portuguese, English, or French (more languages possible later).

## Product Purpose

Glossio combines four study mechanisms in one place: (1) Anki-style spaced-repetition flashcards, (2) Duolingo-style short exercises, (3) leveled reading content per proficiency (A1, etc.) with AI-assisted click-to-translate vocabulary, and (4) an alphabet-learning mechanism for scripts different from the learner's own. Success = the learner keeps coming back to study and measurably progresses through levels/modules.

## Positioning

Not a casual gamification app and not a bare flashcard deck — the differentiated mechanism is combining spaced-repetition review with graded, click-to-translate reading content and structured lessons/modules, so learners get both memorization (SRS) and comprehension (graduated reading) in one flow.

## Operating Context

- Solo/early-stage project, pre-authentication (login is a planned V2 feature; currently no accounts).
- Language is chosen once (`/`) and persisted to `localStorage`; the rest of the app (`/home`, `/lessons`, `/lessons/module/:id`, `/lessons/:id`, `/exercises`, `/flashcards`, `/my-flashcards`, `/alphabets`) is scoped to that language.
- Lessons are structured as modules → lessons → typed content blocks (dialogue, grammar, vocabulary, quiz, culture, examples, tips, etc.) rendered via a block-based renderer (`src/components/lessons/blocks/`).
- Flashcard study is a spaced-repetition session (quality ratings: again/good/easy) with per-word stats and history tracked via React Context + reducers.
- UI copy is in Brazilian Portuguese (pt-BR); the product itself teaches other languages to Portuguese speakers.

## Capabilities and Constraints

- No backend yet — all state (progress, flashcards, study history, language selection) lives in `localStorage` via React Context providers. The redesign must not introduce a dependency on a server API.
- React + Vite, plain CSS with a custom token system (`src/styles/Theme.css`, `Typography.css`, etc.) — no CSS framework (Tailwind/MUI) currently in use.
- Content (lessons, dictionary, courses) is authored as structured JS/JSON data under `src/data/`.

## Brand Commitments

Name "Glossio" is fixed. No other visual identity (palette, typography, logo, tone) is locked in — full freedom was explicitly given to replace the current visual language, which is considered a rough draft rather than a decided brand.

## Evidence on Hand

No real user content, testimonials, or press exists — this is a personal/early-stage project. Lesson content, dictionary entries, and course data under `src/data/` are real authored content (not placeholder) and should be preserved as-is; only presentation changes.

## Product Principles

- Depth over dopamine: visual language should feel like a serious study tool (closer to a well-crafted reading/reference app) rather than a candy-colored gamified toy.
- One consistent system: every page/component must consume the same token set — no page should invent its own colors or spacing.
- Respect the four pillars: flashcards, exercises, leveled lessons, and alphabets are equally first-class, not one dominant feature with three afterthoughts.
- Small-project pragmatism: no new heavy dependencies or backend requirements introduced purely for visual polish.

## Accessibility & Inclusion

No explicit standard established yet; treat standard WCAG AA contrast and keyboard-focus expectations as the baseline given this is a study tool used for extended reading sessions.
