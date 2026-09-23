import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

/** Published posts, newest first. Drafts never reach the site, sitemap or feed. */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function formatPostDate(date: Date): string {
  return date.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' });
}
