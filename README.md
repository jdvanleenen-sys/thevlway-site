# thevlway.com

The website for AI the vL Way: a home page plus the blog that stage 9 of the
production line (`Jeff-HQ/40 Factory/production-line/`) publishes to. Built with
Astro, hosted on GitHub Pages.

## Run it

    npm install
    npm run dev        # http://localhost:4321
    npm run check      # type check
    npm run build      # static site into dist/

## Deploy

Push to `main`. `.github/workflows/deploy.yml` builds and publishes to GitHub Pages.
The custom domain comes from `public/CNAME`.

## Add a blog post

See `AGENTS.md`, "Adding a post".
