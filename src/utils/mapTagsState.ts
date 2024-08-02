import type { ProjectsType, TagsStateType } from '@/types';

export const mapTagsState = (projects: ProjectsType) =>
  projects.reduce((acc, project) => {
    for (const tag of project.data.tags) {
      if (!(tag in acc)) acc[tag] = false;
    }
    return acc;
  }, {} as TagsStateType);
