import type { TagsStateType } from '@/types';
import { Show, For, type Accessor } from 'solid-js';

type Props = {
  activeTags: Accessor<string[]>;
  handleTags: (category?: string, tag?: string) => void;
  tagsState: Accessor<TagsStateType>;
  availableTags: Accessor<string[]>;
};

export const Filters = (props: Props) => {
  return (
    <div class="col-span-6 sm:col-span-1">
      <div class="mb-2 flex justify-between">
        <p>Filter</p>
        <Show when={props.activeTags().length}>
          <button onClick={() => props.handleTags()} class="hover:opacity-70">
            <svg class="size-5">
              <use
                href="/icons.svg#x-mark"
                class="fill-black dark:fill-white"
              />
            </svg>
          </button>
        </Show>
      </div>
      <div class="flex flex-row flex-wrap gap-3 sm:flex-col">
        <For each={[...props.tagsState().entries()]}>
          {([category, tags]) => (
            <div class="pb-3 [&:not(:last-child)]:border-b-2">
              <p class="mb-1 font-semibold">{category}</p>
              <For each={[...tags.entries()]}>
                {([tag, { isActive, count }]) => (
                  <button
                    onClick={() => props.handleTags(category, tag)}
                    disabled={!props.availableTags().includes(tag)}
                    class="flex cursor-pointer items-center justify-start gap-2 hover:bg-slate-700 disabled:cursor-auto disabled:opacity-50 sm:w-full"
                  >
                    <svg class="size-5">
                      <use
                        href={`/icons.svg#${isActive ? 'cb-checked' : 'cb'}`}
                        class={isActive ? 'fill-yellow-500' : 'fill-white'}
                      />
                    </svg>
                    {tag}
                    <span class="ml-auto opacity-70">{`(${count})`}</span>
                  </button>
                )}
              </For>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};
