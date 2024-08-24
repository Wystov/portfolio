import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      tags: z.array(z.string()),
      urlRepo: z.string().url(),
      urlDemo: z.string().url(),
      images: z.array(image()).optional(),
      brief: z.string(),
    }),
});

export const collections = {
  projects,
};
