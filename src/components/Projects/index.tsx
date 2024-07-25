import type { TagsStateType } from '@/types';
import { mapTagsState } from '@/utils/mapTagsState';
import type { CollectionEntry } from 'astro:content';
import { createEffect, createMemo, createSignal } from 'solid-js';

type Props = {
  data: CollectionEntry<'projects'>[];
};

export const Projects = ({ data }: Props) => {
  const [tags, setTags] = createSignal<TagsStateType>(mapTagsState(data));

  const toggleTag = (tag: string) => {
    setTags((prev) => ({ ...prev, [tag]: !prev[tag] }));
  };

  const filteredProjects = createMemo(() => {
    const activeTags = Object.keys(tags()).filter((tag) => tags()[tag]);
    if (activeTags.length === 0) return data;

    return data.filter((project) => activeTags.every((tag) => project.data.tags.includes(tag)));
  });

  return (
    <>
      <p>tags</p>
      <ul class="flex gap-2 border-2 p-2">
        {Object.entries(tags()).map(([tag, isActive]) => (
          <li onClick={() => toggleTag(tag)}>
            <input type="checkbox" checked={isActive} class="mr-2" />
            {tag}
          </li>
        ))}
      </ul>
      <p>projects</p>
      <ul>
        {filteredProjects().map((project) => (
          <li>
            <a href={`/projects/${project.slug}`}>{project.data.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
};
