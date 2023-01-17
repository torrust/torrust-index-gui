<template>
  <div id="torrent-description" class="flex flex-col gap-6">
    <div class="flex flex-row justify-between items-center">
      <h2 class="mr-1 text-2xl text-left text-themeText/50 font-medium">
        Description
      </h2>
      <button
          class="w-10 h-10 flex flex-col items-center justify-center bg-secondary hover:bg-tertiary rounded-xl duration-200"
          @click="collapsed = !collapsed"
      >
        <ChevronDownIcon class="text-themeText/50 w-6 duration-200" :class="{ 'rotate-90': collapsed }" />
      </button>
    </div>
    <template v-if="!collapsed">
      <div class="w-full h-full flex flex-col grow border-secondary rounded-2xl">
        <template v-if="torrent.description && state === State.Viewing">
          <div class="md-body max-w-none prose-sm prose-blue" v-html="sanitizedDescription()" />
        </template>
        <template v-else-if="state === State.Editing">
          <textarea v-model="updatedDescription" rows="8" class="mb-8 px-4 py-4 bg-transparent text-slate-200 dark:text-dark-200 border border-slate-800 dark:border-dark-800 rounded-2xl" />
          <div class="torrust-md px-4 py-4 max-h-64 overflow-auto md-body max-w-none prose-sm prose-blue bg-slate-800/50 dark:bg-white/5 rounded-2xl" v-html="markdown(updatedDescription)" />
        </template>
        <span v-else class="text-slate-400 dark:text-dark-400 italic">No description provided.</span>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { marked } from "marked";
import { ChevronDownIcon } from "@heroicons/vue/24/solid";
import { Torrent } from "torrust-index-types-lib";
import { Ref, PropType } from "vue";
import { ref, useRuntimeConfig } from "#imports";

enum State {
  Viewing,
  Editing
}

const config = useRuntimeConfig();

const state: Ref<State> = ref(State.Viewing);
const collapsed = ref(false);
const updatedDescription: Ref<string> = ref(null);

const props = defineProps({
  torrent: {
    type: Object as PropType<Torrent>,
    required: true
  }
});

function markdown (src: string) {
  return marked(src, { sanitize: true });
}

function sanitizedDescription () {
  const description = markdown(props.torrent.description);

  // Proxy all images through the backend.
  return description.replace(/img src="(.*?)"/gi, (match, url): string => {
    const proxied = `${config.public.apiBase}/proxy/image?url=${encodeURIComponent(url)}`;

    return `img src="${proxied}"`;
  });
}
</script>

<style scoped>

</style>
