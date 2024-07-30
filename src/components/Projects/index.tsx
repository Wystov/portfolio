import type { TagsStateType } from '@/types';
import { mapTagsState } from '@/utils/mapTagsState';
import type { CollectionEntry } from 'astro:content';
import { createEffect, createMemo, createSignal, Show } from 'solid-js';
import { Card } from './Card';

type Props = {
  data: CollectionEntry<'projects'>[];
};

export const Projects = ({ data }: Props) => {
  const [tags, setTags] = createSignal<TagsStateType>(mapTagsState(data));

  const toggleTag = (tag: string) => {
    if (!filteredTags().includes(tag)) return;
    setTags((prev) => ({ ...prev, [tag]: !prev[tag] }));
  };

  const activeTags = createMemo(() => Object.keys(tags()).filter((tag) => tags()[tag]));

  const filteredProjects = createMemo(() => {
    if (activeTags().length === 0) return data;

    return data.filter((project) => activeTags().every((tag) => project.data.tags.includes(tag)));
  });

  const filteredTags = createMemo(() => [
    ...new Set(filteredProjects().flatMap((project) => project.data.tags)),
  ]);

  return (
    <section class="mt-6">
      <div class="grid grid-cols-6 gap-4">
        <div class="col-span-6 sm:col-span-1">
          <div class="flex justify-between">
            <p class="mb-2">Filter</p>
            <Show when={activeTags().length}>
              <button onClick={() => setTags(mapTagsState(data))}>reset</button>
            </Show>
          </div>
          <div class="flex flex-wrap gap-2 flex-row sm:flex-col">
            {Object.entries(tags()).map(([tag, isActive]) => (
              <button
                onClick={() => toggleTag(tag)}
                disabled={!filteredTags().includes(tag)}
                class="flex justify-start items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-auto rounded-md p-2 bg-slate-700/80 hover:bg-slate-700 w-full"
              >
                <svg class="size-5">
                  <use
                    href={`/icons.svg#${isActive ? 'cb-checked' : 'cb'}`}
                    class={isActive ? 'fill-yellow-500' : 'fill-white'}
                  />
                </svg>
                {tag}
              </button>
            ))}
          </div>
        </div>
        <div class="col-span-6 sm:col-span-5">
          <p class="mb-2">{`${filteredProjects().length} of ${data.length} projects`}</p>
          <div class="grid grid-cols-2 gap-2">
            {filteredProjects().map((project) => (
              <Card project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
