# ADR 0001 — Build UI Vocabulary As A Static React Site

## Status

Accepted

## Context

The UI Vocabulary Encyclopedia needs to show many terms with visual mini components, searchable names, aliases, and prompt phrases. The first version does not need login, server persistence, or user-generated content.

## Decision

Build the MVP as a static Vite + React + TypeScript site using Tailwind CSS and shadcn/ui. Keep `docs/ui-vocabulary/terms.yml` as the source of truth and generate site-consumable data from it.

## Rationale

- React makes it straightforward to render reusable mini UI components beside each term.
- shadcn/ui and Tailwind match the requested clean visual style.
- Static data keeps the first version simple and reviewable.
- The same rendered components can later be captured as card or poster images.

## Consequences

- No backend or authentication in MVP.
- Dataset quality matters more than server architecture.
- Future export/download work should reuse the same React components rather than a separate image-generation pipeline.
