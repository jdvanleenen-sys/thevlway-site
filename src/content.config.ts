import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One markdown file per post in src/content/blog/. Stage 9 of the production
// line writes these; the frontmatter below is the contract it must fill.
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().max(70),
    description: z.string().min(50).max(170),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    keyword: z.string(),
    youtubeId: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
