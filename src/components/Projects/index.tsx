import type { ProjectsType, SortOrderType } from '@/types';
import { createMemo, createSignal, onMount, createEffect } from 'solid-js';
import { Filters } from './Filters';
import { ProjectList } from './ProjectList';
import { sortProjects } from '@/utils/sortProjects';

type Props = { data: ProjectsType };

export const Projects = (props: Props) => {
  const initialData = () => props.data;
  const [searchParams, setSearchParams] = createSignal<URLSearchParams | null>(
    null
  );
  const [sortOrder, setSortOrder] = createSignal<SortOrderType>('New');

  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchParams(params);

    const sort = params.get('sort') as SortOrderType | null;
    if (sort) setSortOrder(sort);
  });

  createEffect(() => {
    if (!searchParams()) return;
    const params = searchParams()?.size
      ? '?' + searchParams()!.toString().replace(/%2C/g, ',')
      : '';
    window.history.replaceState({}, '', window.location.pathname + params);
  });

  const activeTags = createMemo(
    () => searchParams()?.get('filter')?.split(',') ?? []
  );

  const filteredProjects = createMemo(() =>
    activeTags().length
      ? initialData().filter(({ data: project }) =>
          activeTags().every((tag) => project.tags.includes(tag))
        )
      : initialData()
  );

  const sortedProjects = createMemo(() =>
    sortProjects(filteredProjects(), sortOrder())
  );

  const availableTags = createMemo(() =>
    filteredProjects()
      .flatMap(({ data: project }) => project.tags)
      .reduce((acc, tag) => {
        acc.set(tag, (acc.get(tag) ?? 0) + 1);
        return acc;
      }, new Map<string, number>())
  );

  const handleTags = (tag?: string) => {
    if (!searchParams()) return;

    const currentTags = new Set(activeTags());

    if (tag) {
      currentTags.has(tag) ? currentTags.delete(tag) : currentTags.add(tag);
    } else {
      currentTags.clear();
    }

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev!);
      currentTags.size
        ? params.set('filter', [...currentTags].join(','))
        : params.delete('filter');
      return params;
    });
  };

  const handleSort = () => {
    setSortOrder((prev) => (prev === 'New' ? 'Old' : 'New'));

    setSearchParams((prev) => {
      const params = new URLSearchParams(prev!);
      params.set('sort', sortOrder());
      return params;
    });
  };

  return (
    <section class="mt-6">
      <div class="grid grid-cols-[200px,1fr] gap-6">
        <Filters
          activeTags={activeTags}
          availableTagsCount={availableTags}
          handleTags={handleTags}
          data={props.data}
        />
        <ProjectList
          projectsCount={{
            init: props.data.length,
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
