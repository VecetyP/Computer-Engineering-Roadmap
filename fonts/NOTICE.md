# Vendored fonts

Self-hosted so the pages never depend on a CDN and never flash a fallback face before
the real one arrives — the same reason the graph libraries live in `lib/`. It also means
both `index.html` and `dag_roadmap.html` render correctly with no network at all,
including straight off disk over `file://`.

Each file is the **variable** weight-axis version of its family, latin and latin-ext
subsets only, as served by Google Fonts. One file covers every weight the pages use.

| File | Family | Weights used | Licence |
|------|--------|--------------|---------|
| `schibsted-grotesk-latin.woff2`, `-latin-ext` | Schibsted Grotesk | 500 · 700 · 800 | SIL Open Font License 1.1 |
| `ibm-plex-sans-latin.woff2`, `-latin-ext` | IBM Plex Sans | 400 · 500 · 600 | SIL Open Font License 1.1 |
| `jetbrains-mono-latin.woff2`, `-latin-ext` | JetBrains Mono | 500 · 600 | SIL Open Font License 1.1 |

All three are licensed under the SIL Open Font License 1.1, which permits redistribution
and bundling with a web page. Upstream sources:

- Schibsted Grotesk — https://github.com/schibsted/schibsted-grotesk
- IBM Plex Sans — https://github.com/IBM/plex
- JetBrains Mono — https://github.com/JetBrains/JetBrainsMono

## Replacing or updating them

The `@font-face` rules are inline in the `<style>` block of `index.html` and
`dag_roadmap.html` (`semester_courses.html` uses system fonts and needs none). To refresh:
download the latin and latin-ext woff2 for each family, drop them in here under the same
names, and leave the CSS alone. Keep `font-display: block` — that is what prevents a
fallback face from painting first.

There are deliberately **no** `<link rel="preload">` tags for these. A font preload must
be made in CORS mode, which has no valid origin over `file://` and fails there; because
the `@font-face` rules are inline, the browser begins fetching as soon as it parses the
head anyway.
