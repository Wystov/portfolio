import type { CollectionEntry } from 'astro:content';
import type { FILTER_CATEGORIES } from './constants';

export type ProjectsType = CollectionEntry<'projects'>[];

export type TagsByCategoriesType = Map<
  keyof typeof FILTER_CATEGORIES,
  Set<string>
>;

export type SortOrderType = 'New' | 'Old';
