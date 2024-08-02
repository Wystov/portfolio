import { For } from "solid-js";
import type { ProjectsType } from '@/types';

type Props = {
  project: ProjectsType[number];
};

export const Card = (props: Props) => {
  return (
    <a
      href={`/projects/${props.project.slug}/`}
      class="flex border-2 p-2 rounded col-span-2 md:col-span-1"
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
        <ul class="flex gap-2">
          <For each={props.project.data.tags}>{(tag) => (
            <li>{tag}</li>
          )}</For>
        </ul>
      </div>
    </a>
  );
};
