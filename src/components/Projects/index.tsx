import type { TagsStateType, ProjectsType } from '@/types';
import { mapTagsState } from '@/utils/mapTagsState';
import { createEffect, createMemo, createSignal, onMount } from 'solid-js';
import { Filters } from './Filters';
import { ProjectList } from './ProjectList';

type Props = {
  data: ProjectsType;
};

export const Projects = (props: Props) => {
  const initialData = () => props.data;
  const [searchParams, setSearchParams] = createSignal(new URLSearchParams());

  onMount(() => {
    setSearchParams(new URLSearchParams(window.location.search));
    const sort = searchParams().get('sort');
    if (sort) setSortOrder(sort as 'Old' | 'New');

    const filter = searchParams().get('filter');
    if (filter) {
      const activeTags = filter.split(',');
      setTagsState((prev) => {
        const newTagsState = new Map(prev);
        activeTags.forEach((tag) => {
          for (const [category, tags] of newTagsState.entries()) {
            if (tags.has(tag)) {
              tags.set(tag, { ...tags.get(tag)!, isActive: true });
              newTagsState.set(category, tags);
            }
          }
        });
        return newTagsState;
      });
    }
  });

  createEffect(() => {
    const params = searchParams().toString().replace(/%2C/g, ',');
    window.history.replaceState({}, '', `?${params}`);
  });

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

  const availableTags = createMemo(() =>
    filteredProjects()
      .flatMap(({ data: project }) => project.tags)
      .reduce((acc, tag) => {
        acc.set(tag, (acc.get(tag) ?? 0) + 1);
        return acc;
      }, new Map<string, number>())
  );

  const handleTags = (category?: string, tag?: string) => {
    if (!category || !tag) return setTagsState(mapTagsState(initialData()));
    if (!availableTags().has(tag)) return;

    const filter = searchParams().get('filter')?.split(',') ?? [];
    const newFilter = filter.includes(tag)
      ? filter.filter((t) => t !== tag)
      : [...filter, tag];
    console.log(newFilter);

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      newFilter.length
        ? params.set('filter', newFilter.join(','))
        : params.delete('filter');
      console.log(params.getAll('filter'));
      console.log(params.toString());

      return params;
    });

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
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('sort', sortOrder());
      return params;
    });
  };

  return (
    <section class="mt-6">
      <div class="grid grid-cols-[200px,1fr] gap-6">
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
