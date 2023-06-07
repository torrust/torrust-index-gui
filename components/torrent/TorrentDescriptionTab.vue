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
      <div class="p-6 w-full h-full flex flex-col grow bg-base-100 rounded-2xl">
        <template v-if="torrent.description">
          <Markdown :source="torrent.description" />
        </template>
        <template v-else>
          <span class="text-neutral-content italic">No description provided.</span>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ChevronDownIcon } from "@heroicons/vue/24/solid";
import { Torrent } from "torrust-index-types-lib";
import { PropType } from "vue";
import { ref } from "#imports";
import Markdown from "~/components/Markdown.vue";

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
