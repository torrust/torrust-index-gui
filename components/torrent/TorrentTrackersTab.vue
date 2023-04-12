<template>
  <div id="torrent-description" class="flex flex-col gap-6">
    <div class="flex flex-row justify-between items-center">
      <h2 class="mr-1 text-2xl text-left text-neutral-content/50 font-medium">
        Trackers ({{ torrent.trackers.length }})
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
              <th>tracker</th>
              <th>seeders / leechers</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(tracker, index) in torrent.trackers">
              <tr>
                <th>{{ index + 1 }}</th>
                <td>{{ tracker }}</td>
                <td />
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from "@heroicons/vue/24/solid";
import { PropType } from "vue";
import { Torrent } from "torrust-index-types-lib";
import { ref } from "#imports";

const collapsed = ref(false);

const props = defineProps({
  torrent: {
    type: Object as PropType<Torrent>,
    required: true
  }
});
</script>

<style scoped>

</style>
