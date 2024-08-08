import type { CollectionEntry } from 'astro:content';

export type ProjectsType = CollectionEntry<'projects'>[];

type TagState = {
  isActive: boolean;
  count: number;
};
export type TagsStateType = Map<string, Map<string, TagState>>;
