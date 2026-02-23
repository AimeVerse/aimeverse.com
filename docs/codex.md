# docs/codex.md — Aimeverse GitHub Pages Contract (Strict)

This file is a **strict engineering + content contract** for the `aimeverse.com` GitHub Pages project.
When working in this repo, follow these rules as the single source of truth.

---

## 0) Non-negotiables

- **Do not infer missing state.** If something isn’t in the repo, treat it as unknown.
- **No frameworks.** This project is **static**: HTML/CSS/JS only.
- **No build system required** unless already present in repo. If it exists, follow it.
- **No external UI libraries** (Tailwind/Bootstrap/etc.) unless already in use.
- **No external tracking** (GA/Pixel/etc.) unless already present and explicitly requested.

---

## 1) Project goal and positioning

Aimeverse.com is the **company site** for **Aime Technologies**.

It must:
- Communicate **AI-native architecture** and **Xpell 2** clearly.
- Avoid old “AI marketing automation sales” positioning unless explicitly requested.
- Keep messaging consistent: **Aime = company**, **Xpell = platform** (xpell.ai is the dev hub).

The site should feel:
- Minimal, modern, technical, credible.
- Dark-mode-first (if supported), with **a small color palette** (2 primary UI colors + neutrals).

---

## 2) URL stability + SEO rules

### 2.1 Preserve existing URLs
- Do **not** break existing slugs without a redirect.
- Keep `/xpell-ai/` as a stable canonical page (either the main Xpell page or a redirect hub).

### 2.2 Redirects on GitHub Pages
GitHub Pages has no server-side rewrites. Use static redirect stubs:
- For an old path `/docs/16861/`, create `/docs/16861/index.html` with:
  - `<meta http-equiv="refresh" content="0; url=/NEW-PATH/" />`
  - `<link rel="canonical" href="https://aimeverse.com/NEW-PATH/" />`
  - A visible `<a>` fallback link
- Prefer **meta refresh + canonical** (works well for SEO in static hosting contexts).

### 2.3 Canonical + titles
- Every page must have:
  - `<title>` (unique)
  - `<meta name="description">` (unique)
  - `<link rel="canonical" href="...">`
- Exactly **one** `<h1>` per page.

### 2.4 No thin pages
Do not create empty placeholder pages. If a page must exist for routing, it must either:
- contain real content, or
- be a redirect stub with canonical + link fallback.

---

## 3) Content style guide

### 3.1 Tone
- Clear, calm, technical, founder-credible.
- No hype (“revolutionary”, “game-changing”) unless explicitly requested.
- Prefer **definitions + capabilities** over marketing fluff.

### 3.2 Terminology
Use consistent terms:
- **AI-native architecture**
- **Vibe Coding** (concept) — allowed
- **VIBE** (product) — do **not** present as launched. Only “coming later” hints if needed.
- **Xpell 2 (Alpha)** — allowed

### 3.3 Structure
Pages should follow this structure:
- Hero section (H1 + short subtext + primary CTA)
- 2–4 content sections (H2)
- Optional FAQ
- Final CTA

---

## 4) HTML/CSS conventions

### 4.1 HTML
- Use semantic HTML: `header`, `main`, `section`, `nav`, `footer`.
- Prefer `ul/li` for lists.
- Avoid div soup; keep nesting shallow.

### 4.2 CSS
- Prefer a single global stylesheet (or minimal files already in repo).
- Use CSS variables for theme tokens:
  - `--bg`, `--fg`, `--muted`, `--card`, `--border`, `--accent`, `--accent2`
- Do not hardcode colors repeatedly—use variables.
- Keep spacing consistent (e.g., 8px scale: 8/16/24/32/48).

### 4.3 JS
- Only use JS if necessary.
- No heavy client-side routing unless already present.
- If adding a small interactive feature (tabs, accordion), keep it progressive-enhancement friendly.

---

## 5) Navigation + sitemap contract

Preferred top-level nav:
- Home
- Technology (AI-native architecture)
- Platform (Xpell 2)
- Projects / Experiments (optional)
- Blog (optional)
- About
- Contact

Rules:
- Don’t add many top-level items.
- Keep nav consistent across pages.

---

## 6) Blog and docs policy

### 6.1 Blog
- Keep blog **only** if content aligns with current positioning.
- Old “marketing sales” posts should be moved under `/archive/` or redirected.

### 6.2 Docs on aimeverse.com
- aimeverse.com docs should be **lightweight** (company-level, high-level).
- Deep technical docs belong on **xpell.ai** (or its own GitHub Pages).
- Old Xpell 1.5 docs should be:
  - redirected to new Xpell 2 pages, or
  - archived with a clear “legacy” banner.

---

## 7) Deliverables contract for tasks

When implementing a change:
1. Identify relevant files (do not guess).
2. Make minimal edits.
3. Keep formatting consistent with existing code.
4. Update internal links.
5. Add redirect stubs if any URL changes.
6. Ensure page has unique title/description/canonical.
7. Provide a short summary of:
   - files changed
   - URLs affected
   - redirects added

---

## 8) “Done” checklist (must pass)

- [ ] No broken internal links
- [ ] One H1 per page
- [ ] Title/description/canonical set
- [ ] Semantic HTML used
- [ ] Minimal CSS + variables (no repeated hardcoded colors)
- [ ] Redirect stubs created for removed URLs
- [ ] No claims that VIBE is launched
- [ ] Content aligns with AI-native architecture + Xpell 2 positioning

---

## 9) Standard prompt header (use this in every Codex task)

