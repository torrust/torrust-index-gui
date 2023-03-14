<template>
  <div id="torrent-files" class="flex flex-col gap-6">
    <div class="flex flex-row justify-between items-center">
      <h2 class="mr-1 text-2xl text-left text-themeText/50 font-medium">
        Files
      </h2>

      <button
        class="w-10 h-10 flex flex-col items-center justify-center bg-secondary hover:bg-tertiary rounded-xl duration-200"
        @click="collapsed = !collapsed"
      >
        <ChevronDownIcon class="text-themeText/50 w-6 duration-200" :class="{ 'rotate-90': collapsed }" />
      </button>
    </div>
    <template v-if="!collapsed">
      <div class="w-full h-full flex flex-col">
        <div
          v-for="file in files()"
          class="mb-3 p-6 w-full h-full flex flex-row grow justify-between items-center text-sm border-2 border-secondary rounded-2xl overflow-x-auto"
        >
          <span class="text-themeText font-semibold">{{ file.name }}</span>
          <div class="px-3 flex flex-row flex-nowrap items-center justify-center text-themeText/50 font-semibold">
            <CircleStackIcon class="mr-1" size="18" />
            <span class="whitespace-nowrap">{{ fileSize(file.size) }}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { CircleStackIcon } from "@heroicons/vue/24/outline";
import { ChevronDownIcon } from "@heroicons/vue/24/solid";
import { PropType } from "vue";
import { Torrent } from "torrust-index-types-lib";
import { ref, fileSize } from "#imports";

const collapsed = ref(true);

const props = defineProps({
    torrent: {
        type: Object as PropType<Torrent>,
        required: true
    }
});

function files () {
    const files = [];

    if (props.torrent.files) {
        for (const file of props.torrent.files) {
            let filename = "";
            for (const [i, path] of file.path.entries()) {
                filename += path;
                if (i !== file.path.length - 1) {
                    filename += "/";
                }
            }
            files.push({
                name: filename,
                size: file.length
            });
        }
    }

    return files;
}
</script>

<style scoped>

</style>
