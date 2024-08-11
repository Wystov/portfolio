import { For } from 'solid-js';
import type { ProjectsType } from '@/types';

type Props = {
  project: ProjectsType[number];
};

export const Card = (props: Props) => {
  return (
    <a
      href={`/projects/${props.project.slug}/`}
      class="group col-span-2 flex flex-col rounded border-2 border-white/20 p-4 duration-300 hover:border-amber-300 md:col-span-1"
    >
      <p class="relative inline-flex text-3xl font-bold">
        <span class="absolute -translate-x-4 text-amber-300 opacity-0 duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          {'> '}
        </span>
        <span class="duration-300 group-hover:translate-x-6">
          {props.project.data.title}
        </span>
      </p>
      <p class="mb-2 text-sm opacity-70">
        {props.project.data.date.toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })}
      </p>
      <p class="mb-4 text-lg">{props.project.data.brief}</p>
      <ul class="mt-auto flex flex-wrap gap-x-2 gap-y-1">
        <For each={props.project.data.tags}>
          {(tag) => <li class="rounded bg-slate-500/50 p-1 text-sm">{tag}</li>}
        </For>
      </ul>
    </a>
  );
};
