import type { TagsStateType } from '@/types';
import { Show, For, type Accessor, createSignal, onMount } from 'solid-js';

type Props = {
  activeTags: Accessor<string[]>;
  handleTags: (category?: string, tag?: string) => void;
  tagsState: Accessor<TagsStateType>;
  availableTags: Accessor<Map<string, number>>;
};

export const Filters = (props: Props) => {
  const [isLargeScreen, setIsLargeScreen] = createSignal(false);
  const [openFilter, setOpenFilter] = createSignal<number | null>(null);

  onMount(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 640);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  });

  return (
    <div class="col-span-2 sm:col-span-1">
      <div class="mb-2 flex justify-between">
        <p>Filter</p>
        <Show when={props.activeTags().length}>
          <button
            onClick={() => props.handleTags()}
            class="flex items-center gap-1 hover:opacity-70"
          >
            <span>reset</span>
            <svg class="size-5">
              <use
                href="/icons.svg#x-mark"
                class="fill-black dark:fill-white"
              />
            </svg>
          </button>
        </Show>
      </div>
      <div class="flex flex-row flex-wrap gap-x-3 overflow-hidden sm:gap-3">
        <For each={[...props.tagsState().entries()]}>
          {([category, tags], i) => (
            <details
              open={isLargeScreen() || openFilter() === i()}
              class="w-[200px] pb-3 sm:[&:not(:last-child)]:border-b-2"
            >
              <summary
                class="mb-1 font-semibold max-sm:cursor-pointer sm:list-none"
                onClick={(e) => {
                  e.preventDefault();
                  if (isLargeScreen()) return;

                  setOpenFilter((prev) => (i() === prev ? null : i()));
                }}
              >
                {category}
              </summary>
              <For each={[...tags.entries()]}>
                {([tag, { isActive }]) => (
                  <button
                    onClick={() => props.handleTags(category, tag)}
                    disabled={!props.availableTags().has(tag)}
                    class="flex cursor-pointer items-center justify-start gap-2 rounded hover:bg-slate-700/50 disabled:cursor-auto disabled:opacity-50 disabled:hover:bg-transparent sm:w-full"
                  >
                    <svg class="size-5">
                      <use
                        href={`/icons.svg#${isActive ? 'cb-checked' : 'cb'}`}
                        class={isActive ? 'fill-amber-300' : 'fill-white'}
                      />
                    </svg>
                    {tag}
                    <span class="ml-auto opacity-70">{`(${props.availableTags().get(tag) ?? 0})`}</span>
                  </button>
                )}
              </For>
            </details>
          )}
        </For>
      </div>
    </div>
  );
};
