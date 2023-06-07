<template>
  <div class="prose" v-html="sanitizedDescription" />
</template>

<script setup lang="ts">
import { marked } from "marked";
import { onMounted, ref, useRestApi, watch } from "#imports";

const props = defineProps({
  source: {
    type: String,
    required: true
  }
});

const rest = useRestApi().value;

const sanitizedDescription = ref("");

watch([props.source], () => {
  sanitizeDescription();
});

onMounted(() => {
  sanitizeDescription();
});

function markdown (src: string) {
  return marked(src, {});
}

async function sanitizeDescription () {
  // Get the original not sanitized markdown string.
  const description = markdown(props.source);

  // Replace the img src's with a random id and return a map
  // of these ids mapped to the original url.
  const [filteredDescriptionWithImageIds, imageIdUrlMap] = filterDescriptionImagesWithRandomIds(description);

  // Get the image data using the backend's image proxy.
  const imageIdDataUrlMap = await getImageDataUrlsFromUrls(imageIdUrlMap);

  // Replace the img id's with the proxied sources.
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
</script>

<style scoped>

</style>
