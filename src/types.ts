import type { CollectionEntry } from 'astro:content';

export type ProjectsType = CollectionEntry<'projects'>[];

export type TagsStateType = {
  [key: string]: boolean;
};
