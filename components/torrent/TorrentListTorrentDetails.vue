<template>
  <div
      @mouseleave="opened = false"
      class="group/details flex flex-col items-center w-full rounded-2xl"
      :class="{ 'bg-gradient-to-t from-tertiary/50 to-tertiary/25': opened }"
  >
    <button
        @mouseenter="openDetails"
        class="flex flex-row items-center justify-center text-sm text-themeText/50 rounded-2xl duration-200"
        :class="{ 'pt-4': opened, 'text-themeText': opened }"
    >
      <span>Hover to see more</span>
      <ChevronRightIcon class="w-5 duration-200" :class="{ 'rotate-90': opened }" />
    </button>
    <div v-if="opened && !!torrent" class="p-4 w-full flex flex-col">
      <div class="flex flex-row">
        <div class="flex flex-col grow">
          <div class="p-4 max-h-96 text-center text-themeText/50 border-2 border-themeText/10 rounded-2xl overflow-y-auto">
            <span v-if="torrent.description">{{ torrent.description }}</span>
            <span v-else class="italic">No description.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ChevronRightIcon} from "@heroicons/vue/20/solid";
import {Ref} from "@vue/reactivity";
import {ref} from "#imports";
import {Torrent} from "torrust-index-types-lib";
import {useRuntimeConfig} from "#app";
import {rest} from "torrust-index-api-lib";

const config = useRuntimeConfig();

const opened: Ref<boolean> = ref(false);
const torrent: Ref<Torrent> = ref(null);

const props = defineProps({
  torrentId: Number
})

function openDetails() {
  if (opened.value) return;

  opened.value = true;

  rest.torrent.getTorrent(config.public.apiBase, props.torrentId)
      .then((data) => {
        torrent.value = data;
      })
      .catch((err) => {
        console.error(err);
      });
}
</script>

<style scoped>

</style>
