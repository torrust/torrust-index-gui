<template>
  <div id="torrent-files" class="flex flex-col gap-6">
    <div class="flex flex-row justify-between items-center">
      <h2 class="mr-1 text-2xl text-left text-neutral-content/50 font-medium">
        Files ({{ files().length }})
      </h2>

      <button
        class="w-10 h-10 flex flex-col items-center justify-center bg-transparent text-base-content/50 hover:text-base-content rounded-xl duration-200"
        @click="collapsed = !collapsed"
      >
        <ChevronDownIcon class="w-6" :class="{ 'rotate-90': collapsed }" />
      </button>
    </div>
    <template v-if="!collapsed">
      <div class="overflow-x-auto">
        <table class="table table-zebra w-full">
          <!-- head -->
          <thead>
            <tr>
              <th />
              <th>file</th>
              <th>size</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(file, index) in files()">
              <tr>
                <th>{{ index + 1 }}</th>
                <td>{{ file.name }}</td>
                <td>{{ fileSize(file.size) }}</td>
              </tr>
            </template>
          </tbody>
        </table>
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
