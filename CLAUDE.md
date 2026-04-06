# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a static HTML/CSS/JS site for Lynq Tech, deployed on Netlify. There is no build step, no bundler, and no package manager — all files are served directly from the repo root.

## Development

Open files directly in a browser or use any static file server:

```bash
python3 -m http.server 8080
# or
npx serve .
```

Deploy is automatic on push to `main` via Netlify (`netlify.toml` publishes from `.`).

## Site Structure

- `/index.html` — Lynq Tech company homepage, lists products
- `/mydecision/index.html` — MyDecision product landing page (waitlist)

Each product lives in its own subdirectory with a self-contained `index.html`. New products follow the same pattern: create `/productname/index.html` and add a link card in the root `index.html`.

## Design System

The design language is defined via CSS variables in `mydecision/index.html` and should be used consistently across all pages:

| Variable | Value | Use |
|---|---|---|
| `--bg` | `#09090b` | Page background |
| `--surface` | `#18181b` | Cards/containers |
| `--border` | `#27272a` | Borders |
| `--text` | `#f4f4f5` | Primary text |
| `--muted` | `#a1a1aa` | Secondary text |
| `--dim` | `#71717a` | Tertiary/placeholder text |
| `--accent` | `#34d399` | Green accent (CTAs, highlights) |
| `--danger` | `#fb7185` | Error/warning states |

Fonts: **Fraunces** (serif, for display/hero headings) and **DM Sans** (sans-serif, for body/UI). Loaded from Google Fonts.

## Security Headers

Headers are set globally in `netlify.toml`. Do not remove `X-Frame-Options` or `X-Content-Type-Options`.
