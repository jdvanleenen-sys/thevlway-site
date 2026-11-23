import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://thevlway.com';
const BLOG_DIR = new URL('./src/content/blog/', import.meta.url);
// These 2 addresses only forward somewhere else, so search engines should not list them.
const FORWARDING_PAGES = [`${SITE}/play/`, `${SITE}/4-files/`];

function frontmatterDate(text, field) {
  return text.match(new RegExp(`^${field}:\\s*['"]?(\\d{4}-\\d{2}-\\d{2})`, 'm'))?.[1];
}

const postDates = new Map(
  readdirSync(BLOG_DIR)
    .filter((name) => name.endsWith('.md'))
    .map((name) => {
      const text = readFileSync(new URL(name, BLOG_DIR), 'utf8');
      return [`${SITE}/blog/${name.replace(/\.md$/, '')}/`, frontmatterDate(text, 'updatedDate') ?? frontmatterDate(text, 'pubDate')];
    }),
);

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !FORWARDING_PAGES.includes(page),
      serialize: (item) => {
        const date = postDates.get(item.url);
        return date ? { ...item, lastmod: new Date(`${date}T00:00:00.000Z`).toISOString() } : item;
      },
    }),
  ],
});
