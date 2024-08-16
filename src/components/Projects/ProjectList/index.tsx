import { For, type Accessor } from 'solid-js';
import { Card } from './Card';
import type { ProjectsType } from '@/types';

type Props = {
  projectsCount: { init: number; filtered: number };
  sortOrder: Accessor<string>;
  handleSort: () => void;
  sortedProjects: Accessor<ProjectsType>;
};

export const ProjectList = (props: Props) => {
  return (
    <div class="col-span-2 sm:col-span-1">
      <div class="mb-2 flex justify-between">
        <p>{`${props.projectsCount.filtered} of ${props.projectsCount.init} projects`}</p>
        <button
          onClick={() => props.handleSort()}
          class="flex items-center gap-2"
        >
          {`${props.sortOrder()} first`}
          <svg class="size-5">
            <use
              href={`/icons.svg#${props.sortOrder() === 'New' ? 'arrow-up' : 'arrow-down'}`}
              class="fill-accent"
            />
          </svg>
        </button>
      </div>
      <div class="grid grid-cols-2 gap-2">
        <For each={props.sortedProjects()}>
          {(project) => <Card project={project} />}
        </For>
      </div>
    </div>
  );
};
