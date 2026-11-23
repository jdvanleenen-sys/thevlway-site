import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { OWNER_NAME, SITE_NAME } from '../consts';
import type { BlogPost } from './posts';

export type Schema = Record<string, unknown>;

const MAX_TITLE_LENGTH = 60;
export const DEFAULT_SHARE_IMAGE = '/og/default.png';
export const DEFAULT_SHARE_ALT = `${SITE_NAME}: AI for the office work behind the job`;
export const EDUBAWARE_SHARE_IMAGE = '/og/edubaware.png';
export const EDUBAWARE_SHARE_ALT = 'ICM Principles by Jake Van Clief. Try it free. Build it with me.';

/** Adds the site name only when the full title still fits in a Google result. */
export function buildPageTitle(title?: string): string {
  if (!title) return SITE_NAME;
  const withSite = `${title} | ${SITE_NAME}`;
  return withSite.length <= MAX_TITLE_LENGTH ? withSite : title;
}

export function postShareImage(postId: string): string {
  const path = `/blog/${postId}/video-thumbnail.png`;
  return existsSync(join(process.cwd(), 'public', 'blog', postId, 'video-thumbnail.png')) ? path : DEFAULT_SHARE_IMAGE;
}

function breadcrumbSchema(siteUrl: string, pageUrl: string, path: string, title: string): Schema {
  const trail = [{ name: SITE_NAME, url: siteUrl }];
  if (path.startsWith('/blog/') && path !== '/blog/') trail.push({ name: 'Blog', url: `${siteUrl}blog/` });
  trail.push({ name: title, url: pageUrl });
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

interface PageGraphInput {
  siteUrl: string;
  pageUrl: string;
  path: string;
  title: string;
  description: string;
  imageUrl: string;
}

export function pageGraph({ siteUrl, pageUrl, path, title, description, imageUrl }: PageGraphInput): Schema[] {
  const isHome = path === '/';
  const page: Schema = {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    description,
    inLanguage: 'en-CA',
    isPartOf: { '@id': `${siteUrl}#site` },
    primaryImageOfPage: { '@type': 'ImageObject', url: imageUrl },
  };
  if (isHome) return [page];
  return [{ ...page, breadcrumb: { '@id': `${pageUrl}#breadcrumb` } }, breadcrumbSchema(siteUrl, pageUrl, path, title)];
}

export function articleSchema(post: BlogPost, siteUrl: string): Schema {
  const url = `${siteUrl}blog/${post.id}/`;
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.data.title,
    description: post.data.description,
    url,
    mainEntityOfPage: { '@id': `${url}#webpage` },
    image: new URL(postShareImage(post.id), siteUrl).href,
    datePublished: post.data.pubDate.toISOString(),
    dateModified: (post.data.updatedDate ?? post.data.pubDate).toISOString(),
    author: { '@id': `${siteUrl}#owner`, name: OWNER_NAME },
    publisher: { '@id': `${siteUrl}#org` },
    keywords: post.data.keyword,
    inLanguage: 'en-CA',
  };
}

/** Describes the video embedded on a post, so Google can show the page in video results. */
export function videoSchema(post: BlogPost, siteUrl: string): Schema | null {
  const { youtubeId, videoUploadDate, title, description } = post.data;
  if (!youtubeId || !videoUploadDate) return null;
  const url = `${siteUrl}blog/${post.id}/`;
  return {
    '@type': 'VideoObject',
    '@id': `${url}#video`,
    name: title,
    description,
    thumbnailUrl: `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
    uploadDate: videoUploadDate.toISOString(),
    embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}`,
    url: `https://www.youtube.com/watch?v=${youtubeId}`,
    publisher: { '@id': `${siteUrl}#org` },
    inLanguage: 'en-CA',
  };
}

export function faqSchema(pageUrl: string, questions: readonly { q: string; a: string }[]): Schema {
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

/** Keeps page text from closing the JSON-LD script tag. */
export function serializeSchema(schema: Schema): string {
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}
