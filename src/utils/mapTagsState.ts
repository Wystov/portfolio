import type { ProjectsType, TagsStateType } from '@/types';
import { FILTER_CATEGORIES } from '@/constants';

const getTagCategory = (tag: string) => {
  for (const [category, tags] of Object.entries(FILTER_CATEGORIES)) {
    if (tags.includes(tag)) return category;
  }
  return 'Other';
};

export const mapTagsState = (projects: ProjectsType): TagsStateType => {
  const tagsState = new Map();
  Object.keys(FILTER_CATEGORIES).forEach((category) => {
    tagsState.set(category, new Map());
  });

  return projects.reduce((tagsState, { data: project }) => {
    for (const tag of project.tags) {
      const category = getTagCategory(tag);
      if (!tagsState.has(category)) {
        tagsState.set(category, new Map());
      }
      const tagsInCategory = tagsState.get(category)!;
      if (!tagsInCategory.has(tag)) {
        tagsInCategory.set(tag, { isActive: false, count: 0 });
      }
      const currentTagState = tagsInCategory.get(tag);
      tagsInCategory.set(tag, {
        ...currentTagState,
        count: currentTagState.count + 1,
      });
    }
    return tagsState;
  }, tagsState);
};
