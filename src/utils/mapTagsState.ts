import type { TagsByCategoriesType, ProjectsType } from '@/types';
import { FILTER_CATEGORIES } from '@/constants';

const getTagCategory = (tag: string) => {
  for (const [category, tags] of Object.entries(FILTER_CATEGORIES)) {
    if (tags.includes(tag)) return category;
  }
  return 'other';
};

export const mapTagsState = (projects: ProjectsType): TagsByCategoriesType => {
  const categories = new Map();
  Object.keys(FILTER_CATEGORIES).forEach((category) => {
    categories.set(category, new Set());
  });

  return projects.reduce((categories, { data: project }) => {
    for (const tag of project.tags) {
      const category = getTagCategory(tag);
      if (!categories.has(category)) {
        categories.set(category, new Set());
      }
      const tagsInCategory = categories.get(category)!;
      if (!tagsInCategory.has(tag)) {
        tagsInCategory.add(tag);
      }
    }
    return categories;
  }, categories);
};
