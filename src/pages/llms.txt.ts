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
    `${SITE_NAME} is run by ${OWNER_NAME}, a teacher for over 24 years who is now a home building executive and one of Jake Van Clief's 7 Masters of ICM. The teaching uses ICM Principles by Jake Van Clief. ICM is a way of setting up folders and notes that show AI where to look.`,
    '',
    '## Ways to work with Jeff',
    '',
    `- [Try it free](${site}edubaware/): two free lessons with an AI coach on your own weekly office job.`,
    `- [Build it with me](${site}edubaware/): work with Jeff and your crew in the same chat. ${EDUBAWARE_FOUNDING_SEATS} founding seats at ${EDUBAWARE_PRICE} per person, per month. The first lessons are ready, and the last three are being finished with the first group.`,
    `- [AI the vL Way for Teams](${site}teams/): departments finish their work together in shared EdubaWare chats, with templates made for the different jobs the company runs. ${EDUBAWARE_PRICE} per seat, per month. Setup, template work, custom builds, training and ongoing help are priced after looking at the job.`,
    '',
    '## Main pages',
    '',
    `- [Home](${site}): AI for the office work behind the job.`,
    `- [Teams](${site}teams/): for company owners, executives and department leads.`,
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
