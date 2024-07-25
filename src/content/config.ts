import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    urlRepo: z.string().url(),
    urlDemo: z.string().url(),
  }),
});

export const collections = {
  projects,
};
