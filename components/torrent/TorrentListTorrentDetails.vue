<template>
  <div
    class="group/details flex flex-col items-center w-full rounded-2xl"
    @click.stop="$router.push(`/torrent/${props.torrentId}`)"
  >
    <div class="mb-3 italic text-base-content/50">
      Click on description to open torrent.
    </div>
    <div class="p-4 max-h-96 border-2 border-base-content/20 hover:border-base-content/40 text-center text-base-content/75 rounded-2xl overflow-y-auto w-full">
      <template v-if="torrent?.description">
        <span>{{ torrent.description }}</span>
      </template>
      <template v-else>
        <span class="italic">No description.</span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { Torrent } from "torrust-index-types-lib";
import { useRuntimeConfig } from "#app";
import { onMounted, ref, useRestApi } from "#imports";

const config = useRuntimeConfig();
const rest = useRestApi();

const torrent: Ref<Torrent> = ref(null);

const props = defineProps({
  torrentId: Number
});

onMounted(() => {
  rest.value.torrent.getTorrent(props.torrentId)
    .then((data) => {
      torrent.value = data;
    });
});
</script>

<style scoped>

</style>
