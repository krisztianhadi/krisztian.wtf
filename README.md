# krisztian.wtf

Source of [krisztian.wtf](https://krisztian.wtf) — a hand-written and
AI-enhanced static site. No build step, no framework, no dependencies: plain
HTML, one stylesheet, one small script.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home — intro, case study cards, personal projects |
| `about.html` | The longer "about me" |
| `lastpass.html` `warface.html` `camsite.html` | Case studies |
| `cv.html` | CV, with the PDF and DOCX to download |
| `nsfw/` | Adult-industry work, 18+, marked `noindex` |
| `style.css` | The whole design, including the per-page colour themes |
| `script.js` | Menu toggle, clipboard toast, gallery lightbox |
| `fonts/` `images/` | Self-hosted webfonts and artwork |
| `robots.txt` `CNAME` | Indexing rules, custom domain |

## Run it locally

Internal links are written extensionless (`/about`, `/cv`), so you need a
server that resolves them:

```sh
npx --yes serve .
```

A plain `python3 -m http.server` will not do — it 404s on `/about`.

## Deploy

GitHub Pages serves `main` from the repository root, and `CNAME` points it at
`krisztian.wtf`. Pushing to `main` publishes in under a minute; there is
nothing to build.

`v1`, `v2` and `v3` are milestone snapshots kept for reference — `main` is the
live line.

## Notes

- Built by hand and with AI. The design and copy decisions are mine; the
  implementation, refactoring and verification were done with AI assistance —
  mostly DeepSeek V4.1 Flash running in DeepSeek Harness. Naming the tools
  beats pretending otherwise.
- `/cv` and `/nsfw/` are `noindex`, and `robots.txt` asks crawlers to skip the
  CV downloads.
- The copy follows `WRITING_STYLE.md`, which lives in this repository but is
  excluded from the published site through `_config.yml`.
- `.gitignore` covers local scratch (`.tmp-*`), the dev-server config, and
  full-size image masters.
- Content, design and images © Krisztián Hadi. Read the code all you like,
  but please don't republish the content as your own.
