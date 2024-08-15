import type { ProjectsType } from '@/types';

export const sortProjects = (projects: ProjectsType, order: 'Old' | 'New') =>
  [...projects].sort(({ data: projectA }, { data: projectB }) => {
    const isFirstNewer = projectA.date > projectB.date;
    if (order === 'Old') return isFirstNewer ? 1 : -1;
    return isFirstNewer ? -1 : 1;
  });
