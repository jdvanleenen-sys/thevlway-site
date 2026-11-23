import type { APIContext } from 'astro';
import {
  EDUBAWARE_FOUNDING_SEATS,
  EDUBAWARE_PRICE,
  OWNER_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  YOUTUBE_URL,
} from '../consts';
import { getPublishedPosts } from '../lib/posts';

// A plain-text guide that helps AI tools understand and cite the site.
export async function GET(context: APIContext) {
  const site = context.site?.href ?? 'https://thevlway.com/';
  const posts = await getPublishedPosts();
  const lines = [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    `${SITE_NAME} is run by ${OWNER_NAME}, a school teacher for 24 years who is now a home building executive and one of Jake Van Clief's 7 Masters of ICM. The teaching uses ICM Principles by Jake Van Clief. ICM structure has folders and notes that show AI where to look.`,
    '',
    '## Ways to work with Jeff',
    '',
    `- [Understand it with me](${site}edubaware/): free lessons on your own weekly office task.`,
    `- [Build it with me](${site}edubaware/): ${EDUBAWARE_FOUNDING_SEATS} founding seats at ${EDUBAWARE_PRICE} per person, per month. The first lessons are ready, and the last 3 are being finished with the first group.`,
    '',
    '## Main pages',
    '',
    `- [Home](${site}): AI for the office work behind the job.`,
    `- [About ${OWNER_NAME}](${site}about/): who teaches this and how.`,
    `- [Blog](${site}blog/): plain answers on quotes, systems and which problem to fix first.`,
    `- [Privacy policy](${site}privacy/)`,
    `- [YouTube](${YOUTUBE_URL})`,
    '',
    '## Blog posts',
    '',
    ...posts.map((post) => `- [${post.data.title}](${site}blog/${post.id}/): ${post.data.description}`),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
