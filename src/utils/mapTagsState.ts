import type { ProjectsType, TagsStateType } from '@/types';
import type { CollectionEntry } from 'astro:content';

export const mapTagsState = (projects: ProjectsType) =>
  projects.reduce((acc, project) => {
    for (const tag of project.data.tags) {
      if (!(tag in acc)) acc[tag] = false;
    }
    return acc;
  }, {} as TagsStateType);
