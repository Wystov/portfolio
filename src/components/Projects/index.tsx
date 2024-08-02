import type { TagsStateType } from '@/types';
import { mapTagsState } from '@/utils/mapTagsState';
import type { CollectionEntry } from 'astro:content';
import { createMemo, createSignal, Show, For } from 'solid-js';
import { Card } from './Card';

type Props = {
  data: CollectionEntry<'projects'>[];
};

export const Projects = (props: Props) => {
  const initialData = () => props.data;

  const [tagsState, setTagsState] = createSignal<TagsStateType>(
    mapTagsState(initialData())
  );
  const [sortOrder, setSortOrder] = createSignal<'Old' | 'New'>('New');

  const activeTags = createMemo(() =>
    Object.keys(tagsState()).filter((tag) => tagsState()[tag])
  );

  const filteredProjects = createMemo(() => {
    return activeTags().length === 0
      ? initialData()
      : initialData().filter(({ data: project }) =>
          activeTags().every((tag) => project.tags.includes(tag))
        );
  });

  const sortedProjects = createMemo(() => {
    const order = sortOrder();
    return [...filteredProjects()].sort(
      ({ data: projectA }, { data: projectB }) => {
        const isFirstNewer = projectA.date > projectB.date;
        if (order === 'Old') return isFirstNewer ? 1 : -1;
        return isFirstNewer ? -1 : 1;
      }
    );
  });

  const availableTags = createMemo(() => [
    ...new Set(filteredProjects().flatMap((project) => project.data.tags)),
  ]);

  const handleTags = (tag?: string) => {
    if (!tag) return setTagsState(mapTagsState(initialData()));
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
          <div class="mb-2 flex justify-between">
            <p>Filter</p>
            <Show when={activeTags().length}>
              <button onClick={() => handleTags()} class="hover:opacity-70">
                reset
              </button>
            </Show>
          </div>
          <div class="flex flex-row flex-wrap gap-2 sm:flex-col">
            <For each={Object.entries(tagsState())}>
              {([tag, isActive]) => (
                <button
                  onClick={() => handleTags(tag)}
                  disabled={!availableTags().includes(tag)}
                  class="flex cursor-pointer items-center justify-start gap-2 rounded-md bg-slate-700/80 p-2 hover:bg-slate-700 disabled:cursor-auto disabled:opacity-50 sm:w-full"
                >
                  <svg class="size-5">
                    <use
                      href={`/icons.svg#${isActive ? 'cb-checked' : 'cb'}`}
                      class={isActive ? 'fill-yellow-500' : 'fill-white'}
                    />
                  </svg>
                  {tag}
                </button>
              )}
            </For>
          </div>
        </div>
        <div class="col-span-6 sm:col-span-5">
          <div class="mb-2 flex justify-between">
            <p>{`${filteredProjects().length} of ${initialData().length} projects`}</p>
            <button onClick={handleSort} class="flex items-center gap-2">
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
            <For each={sortedProjects()}>
              {(project) => <Card project={project} />}
            </For>
          </div>
        </div>
      </div>
    </section>
  );
};
