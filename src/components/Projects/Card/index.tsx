import type { ProjectsType } from '@/types';

type Props = {
  project: ProjectsType[number];
};

export const Card = ({ project }: Props) => {
  return (
    <a
      href={`/projects/${project.slug}`}
      class="flex border-2 p-2 rounded col-span-2 md:col-span-1"
    >
      <div>
        <h3>{project.data.title}</h3>
        <ul class="flex gap-2">
          {project.data.tags.map((tag) => (
            <li>{tag}</li>
          ))}
        </ul>
      </div>
    </a>
  );
};
