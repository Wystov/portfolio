import type { TagsStateType } from '@/types';
import { mapTagsState } from '@/utils/mapTagsState';
import type { CollectionEntry } from 'astro:content';
import { createMemo, createSignal } from 'solid-js';
import { Filters } from './Filters';
import { ProjectList } from './ProjectList';

type Props = {
  data: CollectionEntry<'projects'>[];
};

export const Projects = (props: Props) => {
  const initialData = () => props.data;
  const allTags = createMemo(() => mapTagsState(initialData()));

  // eslint-disable-next-line solid/reactivity
  const [tagsState, setTagsState] = createSignal<TagsStateType>(allTags());
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
    if (!tag) return setTagsState(allTags());
    if (!availableTags().includes(tag)) return;
    setTagsState((prev) => ({ ...prev, [tag]: !prev[tag] }));
  };

  const handleSort = () => {
    setSortOrder((prev) => (prev === 'New' ? 'Old' : 'New'));
  };

  return (
    <section class="mt-6">
      <div class="grid grid-cols-6 gap-4">
        <Filters
          activeTags={activeTags}
          handleTags={handleTags}
          tagsState={tagsState}
          availableTags={availableTags}
        />
        <ProjectList
          projectsCount={{
            init: initialData().length,
            filtered: filteredProjects().length,
          }}
          sortedProjects={sortedProjects}
          sortOrder={sortOrder}
          handleSort={handleSort}
        />
      </div>
    </section>
  );
};
