import type { TagsStateType, ProjectsType } from '@/types';
import { mapTagsState } from '@/utils/mapTagsState';
import { createMemo, createSignal } from 'solid-js';
import { Filters } from './Filters';
import { ProjectList } from './ProjectList';

type Props = {
  data: ProjectsType;
};

export const Projects = (props: Props) => {
  const initialData = () => props.data;

  const [tagsState, setTagsState] = createSignal<TagsStateType>(
    mapTagsState(initialData())
  );
  const [sortOrder, setSortOrder] = createSignal<'Old' | 'New'>('New');

  const activeTags = createMemo(() =>
    [...tagsState().values()].flatMap((tags) =>
      [...tags.entries()]
        .filter(([, { isActive }]) => isActive)
        .map(([tag]) => tag)
    )
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

  const handleTags = (category?: string, tag?: string) => {
    if (!category || !tag) return setTagsState(mapTagsState(initialData()));
    if (!availableTags().includes(tag)) return;

    setTagsState((prev) => {
      const newTagsState = new Map(prev);
      const tags = newTagsState.get(category);
      const tagState = tags?.get(tag);
      if (tags && tagState) {
        tags.set(tag, { ...tagState, isActive: !tagState.isActive });
        newTagsState.set(category, tags);
      }
      return newTagsState;
    });
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
