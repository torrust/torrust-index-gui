<template>
  <div class="flex flex-col grow">
    <div id="torrent-description" class="mb-10 flex flex-col">
      <div class="mb-5 px-5 flex flex-row justify-between">
        <h2 class="mr-1 text-2xl text-left text-themeText font-medium">Description</h2>
        <button
            v-if="hasEditRights() && state === State.Viewing"
            class="text-slate-400 dark:text-dark-400 hover:text-white duration-200"
            @click="startEditingDescription"
        >
          <PencilIcon size="18" />
        </button>
        <div v-else-if="state === State.Editing" class="flex flex-row flex-nowrap">
          <button
              class="mr-3 text-slate-400 dark:text-dark-400 hover:text-white duration-200"
              @click="state = State.Viewing"
          >
            <XMarkIcon size="18" />
          </button>
          <button
              class="text-slate-400 dark:text-dark-400 hover:text-white duration-200"
              @click="saveChanges"
          >
            <CheckIcon size="18" />
          </button>
        </div>
      </div>
      <div class="w-full h-full flex flex-col">
        <div class="p-6 w-full h-full flex flex-col grow border-2 border-secondary rounded-2xl">
          <template v-if="torrent.description && state === State.Viewing">
            <div v-html="sanitizedDescription()" class="md-body max-w-none prose-sm prose-blue"/>
          </template>
          <template v-else-if="state === State.Editing">
            <textarea rows="8" v-model="updatedDescription" class="mb-8 px-4 py-4 bg-transparent text-slate-200 dark:text-dark-200 border border-slate-800 dark:border-dark-800 rounded-2xl"></textarea>
            <div v-html="markdown(updatedDescription)" class="torrust-md px-4 py-4 max-h-64 overflow-auto md-body max-w-none prose-sm prose-blue bg-slate-800/50 dark:bg-white/5 rounded-2xl"/>
          </template>
          <span v-else class="text-slate-400 dark:text-dark-400 italic">No description provided.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {marked} from "marked";
import {CheckIcon, PencilIcon, XMarkIcon} from "@heroicons/vue/24/solid";
import {Torrent} from "torrust-index-types-lib";
import {Ref} from "@vue/reactivity";
import {canEditThisTorrent, isUserLoggedIn, ref, useRuntimeConfig, useUser} from "#imports";
import {PropType} from "@vue/runtime-core";

enum State {
  Viewing,
  Editing
}

const config = useRuntimeConfig();
const user = useUser();

const state: Ref<State> = ref(State.Viewing);
const updatedDescription: Ref<string> = ref(null);

const emit = defineEmits([
  'updated'
])

const props = defineProps({
  torrent: {
    type: Object as PropType<Torrent>,
    required: true
  }
})

function markdown(src: string) {
  return marked(src, { sanitize: true });
}

function hasEditRights(): boolean {
  return canEditThisTorrent(props.torrent)
}

function startEditingDescription() {
  updatedDescription.value = props.torrent.description;
  state.value = State.Editing;
}

function saveChanges() {
  // TODO: Submit changes.
  emit('updated');
  state.value = State.Viewing;
}

function sanitizedDescription() {
  let description = markdown(props.torrent.description);

  // Proxy all images through the backend.
  return description.replace(/img src="(.*?)"/gi, (match, p1, p2): string => {
    let proxied = `${config.public.apiBase}/proxy/image?url=${encodeURIComponent(p1)}`;

    return `img src="${proxied}"`;
  });
}
</script>

<style scoped>

</style>
