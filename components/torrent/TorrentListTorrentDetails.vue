<template>
  <div
    class="group/details flex flex-col items-center w-full rounded-2xl"
    @click.stop="$router.push(`/torrent/${props.infoHash}`)"
  >
    <div class="p-4 max-h-96 border-2 border-base-content/20 hover:border-primary text-center text-base-content/75 rounded-2xl overflow-y-auto w-full duration-500">
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
  infoHash: {
    type: String,
    required: true
  }
});

onMounted(() => {
  rest.value.torrent.getTorrent(props.infoHash)
    .then((data) => {
      torrent.value = data;
    });
});
</script>

<style scoped>

</style>
