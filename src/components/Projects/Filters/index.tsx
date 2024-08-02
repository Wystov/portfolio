import type { TagsStateType } from '@/types';
import { Show, For, type Accessor } from 'solid-js';

type Props = {
  activeTags: Accessor<string[]>;
  handleTags: (tag?: string) => TagsStateType | undefined;
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
            reset
          </button>
        </Show>
      </div>
      <div class="flex flex-row flex-wrap gap-2 sm:flex-col">
        <For each={Object.entries(props.tagsState())}>
          {([tag, isActive]) => (
            <button
              onClick={() => props.handleTags(tag)}
              disabled={!props.availableTags().includes(tag)}
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
  );
};
