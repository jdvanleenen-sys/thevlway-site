# AGENTS.md — thevlway-site

Extends `C:\GitHub\AGENTS.md` (Jeff's vibe-code rules). Nothing here overrides them.

## What this is
The website for AI the vL Way at thevlway.com: one home page and a blog. The blog is where
stage 9 of the production line (`Jeff-HQ/40 Factory/production-line/`) publishes a post
behind every video. Owner facts (site, blog home) live in that line's `_config/my-line.md`.

## Stack
- Astro 7, static output. No server, no database, no logins, no secrets.
- Hosting: GitHub Pages via `.github/workflows/deploy.yml`, on push to `main`.
- Domain: `public/CNAME` = thevlway.com (registrar: Namecheap).
- Brand tokens: `src/styles/global.css`, sourced from `90 Jeff Standards/brand-ai-the-vl-way.md`.
  Change colours there first, then here.

## Layout
| Path | Job |
|---|---|
| `src/consts.ts` | Site name, owner, Skool and YouTube URLs, nav. The only place links live |
| `src/content.config.ts` | The blog post contract (frontmatter schema). A post missing a field fails the build |
| `src/content/blog/*.md` | One file per post. The filename is the URL slug |
| `src/lib/posts.ts` | Published posts, newest first; drafts excluded everywhere |
| `src/layouts/Base.astro` | Head, meta, header, footer |
| `src/pages/` | Home, blog index, post template, RSS feed |

## Adding a post (what stage 9 does)
1. Write `src/content/blog/<keyword-slug>.md` with `title`, `description` (50-170 chars),
   `pubDate`, `keyword`, and `youtubeId` if a video is behind it.
2. `npm run check && npm run build` must pass.
3. Branch, commit, merge to `main`, push. The workflow deploys; the sitemap and feed update themselves.

## Copy rules
Page copy follows `_business-plan/doctrine.md` lead order. No em dashes, numbers as digits,
no emojis, specific CTAs.
