<template>
  <div
    class="flex flex-col items-center w-full group/details rounded-2xl"
    @click.stop="$router.push(`/torrent/${props.infoHash}`)"
  >
    <div class="flex justify-center w-full p-4 overflow-y-auto duration-500 border-2 max-h-96 border-base-content/20 hover:border-primary text-base-content/75 rounded-2xl">
      <template v-if="torrent?.description">
        <Markdown :source="torrent.description" />
      </template>
      <template v-else>
        <span class="italic">No description.</span>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { TorrentResponse } from "torrust-index-types-lib";
import { notify } from "notiwind-ts";
import { onMounted, ref, useRestApi } from "#imports";

const rest = useRestApi();

const torrent: Ref<TorrentResponse> = ref(null);

const props = defineProps({
  infoHash: {
    type: String,
    required: true
  }
});

onMounted(() => {
  rest.value.torrent.getTorrentInfo(props.infoHash)
    .then((data) => {
      torrent.value = data;
    })
    .catch((err) => {
      notify({
        group: "error",
        title: "Error",
        text: `Trying to get the torrent information. ${err.message}.`
      }, 10000);
    });
});
</script>

<style scoped>

</style>
