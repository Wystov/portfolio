import type { TagsStateType } from '@/types';
import { mapTagsState } from '@/utils/mapTagsState';
import type { CollectionEntry } from 'astro:content';
import { createEffect, createMemo, createSignal, Show } from 'solid-js';
import { Card } from './Card';

type Props = {
  data: CollectionEntry<'projects'>[];
};

export const Projects = ({ data }: Props) => {
  const [tagsState, setTagsState] = createSignal<TagsStateType>(mapTagsState(data));
  const [sortOrder, setSortOrder] = createSignal<'Old' | 'New'>('New');

  const activeTags = createMemo(() => Object.keys(tagsState()).filter((tag) => tagsState()[tag]));

  const filteredProjects = createMemo(() => {
    return activeTags().length === 0
      ? data
      : data.filter(({ data: project }) => activeTags().every((tag) => project.tags.includes(tag)));
  });

  const sortedProjects = createMemo(() => {
    return [...filteredProjects()].sort(({ data: projectA }, { data: projectB }) => {
      const isFirstNewer = projectA.date > projectB.date;
      if (sortOrder() === 'Old') return isFirstNewer ? 1 : -1;
      return isFirstNewer ? -1 : 1;
    });
  });

  const availableTags = createMemo(() => [
    ...new Set(filteredProjects().flatMap((project) => project.data.tags)),
  ]);

  const handleTags = (tag?: string) => {
    if (!tag) return setTagsState(mapTagsState(data));
    if (!availableTags().includes(tag)) return;
    setTagsState((prev) => ({ ...prev, [tag]: !prev[tag] }));
  };

  const handleSort = () => {
    setSortOrder((prev) => (prev === 'New' ? 'Old' : 'New'));
  };

  return (
    <section class="mt-6">
      <div class="grid grid-cols-6 gap-4">
        <div class="col-span-6 sm:col-span-1">
          <div class="flex justify-between mb-2">
            <p>Filter</p>
            <Show when={activeTags().length}>
              <button onClick={() => handleTags()} class="hover:opacity-70">
                reset
              </button>
            </Show>
          </div>
          <div class="flex flex-wrap gap-2 flex-row sm:flex-col">
            {Object.entries(tagsState()).map(([tag, isActive]) => (
              <button
                onClick={() => handleTags(tag)}
                disabled={!availableTags().includes(tag)}
                class="flex justify-start items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-auto rounded-md p-2 bg-slate-700/80 hover:bg-slate-700 sm:w-full"
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
          <div class="flex justify-between mb-2">
            <p>{`${filteredProjects().length} of ${data.length} projects`}</p>
            <button onClick={handleSort} class="flex gap-2 items-center">
              {`${sortOrder()} first`}
              <svg class="size-5">
                <use
                  href={`/icons.svg#${sortOrder() === 'New' ? 'arrow-up' : 'arrow-down'}`}
                  class="fill-black dark:fill-white"
                />
              </svg>
            </button>
          </div>
          <div class="grid grid-cols-2 gap-2">
            {sortedProjects().map((project) => (
              <Card project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
