---
name: Glossio
description: A language-learning workbook, not a dashboard — spaced-repetition flashcards, graded reading, and exercises styled as a real notebook.
colors:
  ink-primary: "#2C3E63"
  ink-primary-hover: "#1F2D49"
  ink-primary-light: "#E4E9F2"
  ink-primary-dark: "#17213A"
  stamp-success: "#2F6F4E"
  stamp-success-hover: "#24593E"
  stamp-success-light: "#E3F0E9"
  stamp-success-dark: "#1B4530"
  ochre-warning: "#B8791A"
  ochre-warning-hover: "#96620F"
  ochre-warning-light: "#FBF1DF"
  ochre-warning-dark: "#6E4A0E"
  pen-danger: "#B23A2E"
  pen-danger-hover: "#8F2E24"
  pen-danger-light: "#F8E7E4"
  pen-danger-dark: "#6B211A"
  paper-background: "#EEF1F5"
  paper-surface: "#FBFCFD"
  paper-surface-sunken: "#E6EAEF"
  paper-border: "#D2D9E0"
  paper-border-strong: "#AEB8C2"
  ink-text: "#1C1F26"
  ink-text-secondary: "#565F6B"
  ink-text-muted: "#8A929C"
typography:
  display:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    fontSize: "2.5rem"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  h2:
    fontFamily: "Inter, sans-serif"
    fontSize: "1.375rem"
    fontWeight: 600
    lineHeight: 1.3
  reading:
    fontFamily: "'Source Serif 4', ui-serif, Georgia, serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.75
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  mono-label:
    fontFamily: "'IBM Plex Mono', ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.02em"
  mono-number:
    fontFamily: "'IBM Plex Mono', ui-monospace, monospace"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.1
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "999px"
  notch: "14px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "24px"
  "6": "32px"
  "7": "48px"
  "8": "64px"
  "9": "96px"
components:
  button-primary:
    backgroundColor: "{colors.ink-primary}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.ink-primary-hover}"
  button-secondary:
    backgroundColor: "{colors.paper-surface}"
    textColor: "{colors.ink-text}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  card:
    backgroundColor: "{colors.paper-surface}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: Glossio

## Overview

**Creative North Star: "The Language Workbook"**

Glossio is styled as the notebook a serious self-directed learner would actually fill in — not a SaaS dashboard, not a gamified app clone. Chapters and pages replace generic icon-card grids; a faint ruled-paper background with a red margin rule stands in for a plain white canvas; flashcards are die-cut index cards with a folded corner instead of flat rounded tiles; exercises are corrected in ink (green for right, red for wrong) instead of colored badge pills. The palette deliberately avoids the two AI-generated-interface clichés closest to this brief: it is not warm cream + serif display + terracotta accent, and it is not the flat indigo-SaaS-card look the project shipped with before this system.

Three type families each carry one job and never swap: a plain interface sans for controls and navigation, a text serif for long-form reading (lessons, dictionary entries), and a monospace reserved for real numbering and data (page/chapter numbers, stats, exercise letters) — never used as a "technical" costume.

**Key Characteristics:**
- Chapter/page numbering carries real sequence information (module order, lesson order) — it is not a decorative "01/02/03" grid label.
- Color is restrained: ink-blue is the only interactive accent; red and green are reserved strictly for correctness feedback (quiz, flashcard answers), never decoration.
- Cards are flat at rest (border only); elevation (shadow + lift) appears only as a hover/interaction response.
- Emoji are used only where they are literally correct (language flags); every other icon is a small hand-drawn-precision SVG stroke icon from the shared `Icon` component.

## Colors

Cool, blue-gray paper — never cream — with a single desaturated "fountain-pen ink" accent. Red and green exist only as functional pen colors, not brand decoration.

### Primary
- **Ink Blue** (`#2C3E63`): the only interactive accent — primary buttons, active nav state, links, focus rings, chapter/level tags, the vocabulary "grifo" highlight (paired with `ink-primary-light` `#E4E9F2` as its background wash).

### Secondary
- **Stamp Green** (`#2F6F4E`): success/correct/easy state only — quiz correct feedback, "Fácil" answer button, module-complete stamp, mature-flashcard badge.
- **Pen Red** (`#B23A2E`): error/again state only — quiz wrong feedback, "De novo" answer button, delete actions, the paper margin rule. Never used decoratively.

### Tertiary
- **Ochre** (`#B8791A`): the middle SRS rating ("Bom") and warning/tip callouts — a mustard/highlighter tone, not a bright amber.

### Neutral
- **Paper Background** (`#EEF1F5`): page background — cool blue-gray, deliberately not cream.
- **Paper Surface** (`#FBFCFD`): card/panel background, barely lighter than the page so cards read as "paper on paper," not floating white tiles.
- **Paper Border** (`#D2D9E0`) / **Paper Border Strong** (`#AEB8C2`): hairline rules and dividers.
- **Ink Text** (`#1C1F26`), **Ink Text Secondary** (`#565F6B`), **Ink Text Muted** (`#8A929C`): body text, secondary copy, metadata.

### Named Rules
**The One Ink Rule.** Only ink-blue is used for interactive/brand accent. Green and red never appear outside correctness feedback (right/wrong, success/error) — they are pen colors, not palette decoration.

## Typography

**Interface Font:** Inter (UI chrome only — nav, buttons, labels, headings, dashboards)
**Reading Font:** Source Serif 4 (long-form prose — lesson passages, dictionary entries, quotes)
**Label/Mono Font:** IBM Plex Mono (page/chapter numbers, exercise lettering, stat figures)

**Character:** A plain, dense workhorse sans carries every interactive control (Operate-mode UI does not need a display face); a book-weight serif takes over the instant the user is reading rather than acting; a monospace marks anything that is literally a number or an index. The three never mix roles.

### Hierarchy
- **Display** (700, 2.5rem/1.15, tracking -0.02em): page titles ("Bem-vindo de volta", module/lesson H1s).
- **H2** (600, 1.375rem/1.3): section headers.
- **Reading** (400, 1.0625rem/1.75, serif): lesson prose, dictionary verbete body — max measure ~68ch.
- **Body** (400, 1rem/1.5): default interface copy.
- **Mono label** (500, 0.75rem/1.3, tracking 0.02em, uppercase where used as a tag): page numbers, "Capítulo 03", stat labels, badges.
- **Mono number** (600, 1.5rem/1.1): large stat figures (streak, totals).

### Named Rules
**The Numbers-Only-Mono Rule.** Monospace is reserved for things that are actually numeric or indexical (page counts, exercise letters, stats). It is never used as generic "technical-looking" chrome.

## Layout

Single shared `.page-container` (max-width 720px, the `--content-width-md` token) for the majority of pages; a wider `--content-width-lg` (960px) is used only for the lesson reader, which carries denser nested content (hero, objectives, vocabulary grid, block content). `--content-width-sm` (480px) is reserved for narrow single-column moments (language picker grid, study summary). Every container width in the app now resolves to one of four `--content-width-*` tokens — no page invents its own pixel value.

Spacing is a strict 9-step 4px-based scale (`--space-1` … `--space-9`, 4px→96px) plus semantic aliases (`xs/sm/md/lg/xl/2xl`). Responsive behavior is structural, not fluid: list rows collapse metadata columns, the navbar's link row becomes an internally-scrollable strip (rather than wrapping or overflowing the page) below 600px, and the module/lesson grids in the reading page reflow to a single column.

## Elevation & Depth

Flat-by-default. Cards, list rows, and panels carry a 1px border and no shadow at rest. Shadow (`--shadow-md`) appears only as a hover/interaction response — the object visually lifts off the page when touched, then settles back. The only elements with a resting shadow are truly floating overlays (the word-popup dictionary card, toasts).

### Shadow Vocabulary
- **`--shadow-sm`** (`0 1px 2px rgba(23,26,31,.10)`): subtle button hover lift.
- **`--shadow-md`** (`0 6px 16px rgba(23,26,31,.14)`): card/row hover elevation.
- **`--shadow-lg`** (`0 16px 36px rgba(23,26,31,.18)`): modal/popup overlays (word popup, toast).

### Named Rules
**The Flat-By-Default Rule.** Never combine a resting border and a resting shadow on the same element ("ghost card"). Pick one: border for static content, shadow only for something that is genuinely floating or mid-interaction.

## Shapes

Radii stay inside a fixed 4-step scale (8/12/16/24px) plus a full pill for small controls only (badges, language-selector avatar-scale elements) — buttons stop at `--radius-md` (12px), never a pill. A dedicated `--radius-notch` (14px) drives the signature "ficha" (index-card) shape: a `clip-path` die-cut corner plus a small folded-corner pseudo-element, applied via the `.card--notch` modifier — used for flashcards and vocabulary-flip cards, nowhere else. Accent top-borders (3px, ink or success) pair with squared top corners (bottom corners stay rounded) so the thick rule never collides with a curve.

## Components

### Buttons
- **Shape:** 12px radius (`--radius-md`), never pill-shaped.
- **Primary:** ink-blue background, white text, 12px/24px padding; hover darkens to `--color-primary-hover` + `--shadow-sm`.
- **Semantic variants:** success (stamp green), warning (ochre), danger (pen red) — used only for their literal meaning (Fácil/Bom/De novo, delete).
- **Secondary/Ghost:** bordered surface / transparent, for non-primary actions.
- **Icon+label:** buttons are `inline-flex` with an 8px gap; icons come from the shared `Icon` SVG set, never emoji.

### Cards / Containers
- **Corner style:** 16px radius (`--radius-lg`) at rest; the `.card--notch` variant clips the top-right corner instead.
- **Background:** `--color-surface`, barely distinct from the page background.
- **Shadow strategy:** none at rest; `--shadow-md` + 3px lift on hover (see Elevation & Depth).
- **Border:** 1px `--color-border` always.

### List Rows (signature navigation pattern)
Module list, lesson list, and the home "índice" all use the same row primitive instead of a card grid: a fixed-width leading marker (mono chapter number or level tag) + title/description column + trailing chevron, separated by a dashed bottom rule, with a background-tint hover state and the chevron sliding 3px on hover. This replaces the banned "same-size icon+heading+text card grid" pattern everywhere navigation is the job.

### Worksheet Quiz (signature component)
Multiple-choice options are lettered (A/B/C…) circular markers, not colored fill boxes. On check, the correct option's marker turns stamp-green with a check icon; the user's wrong pick (if any) turns pen-red with an x icon — literal ink correction rather than a generic colored feedback banner alone.

### Flashcard / Ficha (signature component)
`.card--notch`: a die-cut top-right corner via `clip-path`, with a small folded-corner square (page-background color, bordered) simulating the cut. Word set in the reading serif at display size; word/translation labels in mono-label caps ("Vocabulário" / "Tradução"). Used for `StudyCard` (the flip-review card) and `VocabularyCard` (in-lesson flip preview) — both flashcards in spirit, so both get the same silhouette.

### Reading Surface (signature pattern)
`.paper-ruled`: a `repeating-linear-gradient` horizontal rule pattern plus a fixed-offset vertical red margin line (`--paper-margin`), applied only to actual long-form reading containers (the lesson block content area). Never used as decorative texture elsewhere.

### Navigation
Sticky top bar, `--content-width-md` inner max-width. Link row is `overflow-x: auto` with a hidden scrollbar so it degrades to a horizontally-scrollable strip on narrow viewports instead of wrapping or breaking the page; logo wordmark and language badge hide below 600px to give the link strip room.

## Do's and Don'ts

### Do:
- **Do** reserve monospace for real numbers/indices (page counts, exercise letters, stats) — never as generic "technical" flavor.
- **Do** keep list/index rows (number + title + description + chevron) as the default navigation pattern for anything sequential (modules, lessons, home sections).
- **Do** let shadow only appear as an interaction response; cards are flat (border-only) at rest.
- **Do** keep red strictly for "wrong/again/delete" and green strictly for "right/easy/success" — they are pen colors, not decoration.
- **Do** route new icons through the shared `Icon` component (`src/components/common/Icon/Icon.jsx`) as precise 1.6px stroke SVGs; add new entries there rather than reaching for emoji.

### Don't:
- **Don't** reintroduce a same-size icon+heading+text card grid as a page's primary navigation structure — use the list-row/index pattern instead.
- **Don't** use a colored `border-left`/`border-right` on cards or callouts; accent borders (when used) go on top, and only paired with squared top corners.
- **Don't** drift the palette toward warm cream + serif-display + terracotta — the paper is cool blue-gray, display type stays sans, and red is functional only.
- **Don't** combine a resting border and a resting shadow on the same element ("ghost card").
- **Don't** invent a new container width; use `--content-width-sm/md/lg` (480/720/960px).
