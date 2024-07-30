import type { TagsStateType } from '@/types';
import { mapTagsState } from '@/utils/mapTagsState';
import type { CollectionEntry } from 'astro:content';
import { createEffect, createMemo, createSignal } from 'solid-js';
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

  const filteredProjects = createMemo(() => {
    const activeTags = Object.keys(tags()).filter((tag) => tags()[tag]);
    if (activeTags.length === 0) return data;

    return data.filter((project) => activeTags.every((tag) => project.data.tags.includes(tag)));
  });

  const filteredTags = createMemo(() => [
    ...new Set(filteredProjects().flatMap((project) => project.data.tags)),
  ]);

  return (
    <section class="mt-6">
      <div class="grid grid-cols-6 gap-2">
        <div class="col-span-6 sm:col-span-1">
          <p class="mb-4">Filter</p>
          <ul class="flex flex-wrap gap-2 flex-row sm:flex-col">
            {Object.entries(tags()).map(([tag, isActive]) => (
              <li onClick={() => toggleTag(tag)}>
                <input
                  type="checkbox"
                  checked={isActive}
                  disabled={!filteredTags().includes(tag)}
                  class="mr-2"
                />
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <div class="col-span-6 sm:col-span-5">
          <p class="mb-4">{`Show ${filteredProjects().length} of ${data.length} projects`}</p>
          <ul class="grid grid-cols-2 gap-2">
            {filteredProjects().map((project) => (
              <li class="col-span-2 md:col-span-1">
                <Card project={project} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
