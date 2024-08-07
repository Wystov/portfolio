import type { CollectionEntry } from 'astro:content';

export type ProjectsType = CollectionEntry<'projects'>[];

export type TagsStateType = {
  [category: string]: {
    [tag: string]: {
      isActive: boolean;
      count: number;
    };
  };
};
