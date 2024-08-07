import type { ProjectsType, TagsStateType } from '@/types';
import { FILTER_CATEGORIES } from '@/constants';

const getTagCategory = (tag: string) => {
  for (const [category, tags] of Object.entries(FILTER_CATEGORIES)) {
    if (tags.includes(tag)) return category;
  }
  return 'Other';
};

export const mapTagsState = (projects: ProjectsType) =>
  projects.reduce((acc, { data: project }) => {
    for (const tag of project.tags) {
      const category = getTagCategory(tag);
      if (!(category in acc)) acc[category] = {};
      if (!(tag in acc[category])) {
        acc[category][tag] = { isActive: false, count: 1 };
      } else {
        acc[category][tag].count += 1;
      }
    }
    return acc;
  }, {} as TagsStateType);
