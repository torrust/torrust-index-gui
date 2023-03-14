<template>
  <div
    class="group/details flex flex-col items-center w-full rounded-2xl"
    :class="{ 'bg-gradient-to-t from-tertiary/50 to-tertiary/25': opened }"
    @mouseleave="opened = false"
  >
    <button
      class="flex flex-row items-center justify-center font-medium text-sm text-themeText/50 hover:text-themeText rounded-2xl duration-200"
      :class="{ 'pt-4': opened, 'text-themeText': opened }"
      @click.stop="openDetails"
    >
      <template v-if="!opened">
        <span>Click to see more</span>
      </template>
      <template v-else>
        <span>Click to close</span>
      </template>
      <ChevronRightIcon class="w-5 duration-200" :class="{ 'rotate-90': opened }" />
    </button>
    <template v-if="opened && !!torrent">
      <div class="p-4 w-full flex flex-col">
        <div class="flex flex-row">
          <div class="flex flex-col grow">
            <div class="p-4 max-h-96 text-center text-themeText/50 border-2 border-themeText/10 rounded-2xl overflow-y-auto">
              <template v-if="torrent.description">
                <span>{{ torrent.description }}</span>
              </template>
              <template v-else>
                <span class="italic">No description.</span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ChevronRightIcon } from "@heroicons/vue/20/solid";
import { Ref } from "vue";
import { Torrent } from "torrust-index-types-lib";
import { useRuntimeConfig } from "#app";
import { ref, useRestApi } from "#imports";

const config = useRuntimeConfig();
const rest = useRestApi();

const opened: Ref<boolean> = ref(false);
const torrent: Ref<Torrent> = ref(null);

const props = defineProps({
    torrentId: Number
});

function openDetails () {
    if (opened.value) {
        opened.value = false;
        return;
    }

    opened.value = true;

    rest.value.torrent.getTorrent(props.torrentId)
        .then((data) => {
            torrent.value = data;
        });
}
</script>

<style scoped>

</style>
