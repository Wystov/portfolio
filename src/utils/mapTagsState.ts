import type { ProjectsType, TagsStateType } from '@/types';

export const mapTagsState = (projects: ProjectsType) =>
  projects.reduce((acc, project) => {
    for (const tag of project.data.tags) {
      if (!(tag in acc)) {
        acc[tag] = { isActive: false, count: 1 };
      } else {
        acc[tag].count += 1;
      }
    }
    return acc;
  }, {} as TagsStateType);
