import { For } from 'solid-js';
import type { ProjectsType } from '@/types';

type Props = {
  project: ProjectsType[number];
};

export const Card = (props: Props) => {
  return (
    <a
      href={`/projects/${props.project.slug}/`}
      class="col-span-2 flex rounded border-2 p-2 md:col-span-1"
    >
      <div>
        <h3>{props.project.data.title}</h3>
        <p>
          {props.project.data.date.toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })}
        </p>
        <ul class="flex flex-wrap gap-x-2 gap-y-1">
          <For each={props.project.data.tags}>{(tag) => <li>{tag}</li>}</For>
        </ul>
      </div>
    </a>
  );
};
