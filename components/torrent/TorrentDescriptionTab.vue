<template>
  <div id="torrent-description" class="flex flex-col gap-6">
    <div class="flex flex-row justify-between items-center">
      <h2 class="mr-1 text-2xl text-left text-neutral-content/50 font-medium">
        Description
      </h2>
      <button
        class="w-10 h-10 flex flex-col items-center justify-center bg-transparent text-base-content/50 hover:text-base-content rounded-xl duration-200"
        @click="collapsed = !collapsed"
      >
        <ChevronDownIcon class="w-6" :class="{ 'rotate-90': collapsed }" />
      </button>
    </div>
    <template v-if="!collapsed">
      <div class="p-6 w-full h-full flex flex-col grow bg-base-300 rounded-2xl">
        <template v-if="torrent.description && state === State.Viewing">
          <div class="md-body max-w-none prose-sm prose-blue" v-html="sanitizedDescription" />
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
import { PropType, Ref } from "vue";
import { onMounted, ref, useRestApi, useRuntimeConfig } from "#imports";

enum State {
    Viewing,
    Editing
}

const config = useRuntimeConfig();
const rest = useRestApi().value;

const state: Ref<State> = ref(State.Viewing);
const collapsed = ref(false);
const sanitizedDescription = ref("");
const updatedDescription: Ref<string> = ref(null);

const props = defineProps({
  torrent: {
    type: Object as PropType<Torrent>,
    required: true
  }
});

onMounted(() => {
  sanitizeDescription();
});

function markdown (src: string) {
  return marked(src, {});
}

function randomId (length: number) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;

  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }

  return result;
}

async function sanitizeDescription () {
  // Get the original not sanitized description as markdown string.
  const description = markdown(props.torrent.description);

  // Replace the img src with a random id and return a map
  // of these ids mapped to the original url.
  const [filteredDescriptionWithImageIds, imageIdUrlMap] = filterDescriptionImagesWithRandomIds(description);

  // Get the image data using the backend's image proxy.
  const imageIdDataUrlMap = await getImageDataUrlsFromUrls(imageIdUrlMap);

  // Update the rendered description with the final result.
  sanitizedDescription.value = replaceDescriptionImageIdsWithDataUrls(filteredDescriptionWithImageIds, imageIdDataUrlMap);
}

function filterDescriptionImagesWithRandomIds (description: string): [string, Map<string, string>] {
  const filteredImageMap = new Map();

  // Replace all image urls with a random id.
  description = description.replace(/img src="(.*?)"/gi, (match, url): string => {
    const imageId = randomId(32);

    filteredImageMap.set(imageId, url);

    return `img src="${imageId}"`;
  });

  return [description, filteredImageMap];
}

async function getImageDataUrlsFromUrls (imageMap: Map<string, string>): Promise<Map<string, string>> {
  const imageDataMap: Map<string, string> = new Map();

  for (const [id, url] of imageMap) {
    const imageBlob = await rest.torrent.proxiedImage(url);
    const imageDataUrl = await blobToDataURL(imageBlob);

    imageDataMap.set(id, imageDataUrl);
  }

  return imageDataMap;
}

function blobToDataURL (blob: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = _e => resolve(reader.result as string);
    reader.onerror = _e => reject(reader.error);
    reader.onabort = _e => reject(new Error("Read aborted"));
    reader.readAsDataURL(blob);
  });
}

function replaceDescriptionImageIdsWithDataUrls (description: string, imageIdDataUrlMap: Map<string, string>): string {
  imageIdDataUrlMap.forEach((dataUrl, id) => {
    description = description.replace(id, dataUrl);
  });

  return description;
}
</script>

<style scoped>

</style>
