<template>
  <div class="w-full flex flex-col basis-full">
    <template v-if="torrent">
      <div class="px-0 md:px-6 py-6 flex flex-col rounded-2xl">
        <div class="mb-4 flex flex-col">
          <div class="mb-4 flex flex-col">
            <div class="flex flex-col gap-1">
              <span class="font-semibold text-accent capitalize">{{ torrent.category.name }}</span>
              <div class="flex flex-row justify-between">
                <h2 v-if="state === State.Viewing" class="mb-1 text-themeText font-bold overflow-hidden break-words">
                  {{ torrent.title }}
                </h2>
              </div>
              <div class="mt-2 flex flex-row gap-4 flex-nowrap justify-between">
                <div class="px-2 py-2 flex flex-col items-center justify-center bg-tertiary/25 w-1/2 rounded-md">
                  <span id="seeders" class="px-2 text-green-500/95 font-semibold">{{ Number(torrent.seeders).toLocaleString() }}</span>
                </div>
                <div class="px-2 py-2 flex flex-col items-center justify-center bg-tertiary/25 w-1/2 rounded-md">
                  <span id="leechers" class="px-2 text-red-500/95 font-semibold">{{ Number(torrent.leechers).toLocaleString() }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="p-6 w-full h-full flex flex-col border-2 border-secondary rounded-2xl">
          <div class="flex flex-row flex-nowrap gap-3 font-medium text-sm text-themeText/50 text-sm">
            <div class="flex flex-row flex-nowrap items-center justify-center">
              <CalendarIcon class="mr-1 w-4" />
              <span>{{ new Date(torrent.upload_date).toLocaleDateString() }}</span>
            </div>
            <div class="flex flex-row flex-nowrap items-center justify-center">
              <CircleStackIcon class="mr-1 w-4" />
              <span>{{ fileSize(torrent.file_size) }}</span>
            </div>
            <div class="flex flex-row flex-nowrap justify-start items-center text-sm">
              <UserCircleIcon class="mr-1 w-4" />
              <a class="mr-1 cursor-pointer">{{ torrent.uploader }}</a>
            </div>
          </div>
          <div class="my-6 h-0.5 flex flex-col bg-secondary" />
          <div class="flex flex-col">
            <div v-if="showDownloadButtons" class="flex flex-row flex-nowrap items-center">
              <TorrustButton
                label="download torrent"
                @click="downloadTorrent(torrent.torrent_id, torrent.title)"
              >
                Download torrent
              </TorrustButton>
              <button class="ml-2 w-12 h-12 flex flex-col shrink-0 items-center justify-center bg-secondary text-themeText/50 hover:text-themeText rounded-2xl duration-1000">
                <LinkIcon class="w-6" />
              </button>
            </div>
            <template v-else>
              <button
                class="mt-3 px-4 h-12 bg-white text-sm text-black font-medium rounded-2xl"
                @click="$store.dispatch('openAuthModal')"
              >
                Please sign in to download
              </button>
              <button
                class="mt-3 px-4 h-12 bg-sky-500 text-sm text-white font-medium rounded-2xl"
                @click="$store.dispatch('openAuthModal')"
              >
                Please sign in to download
              </button>
            </template>
          </div>
<!--          <TorrustButton-->
<!--            v-if="hasEditRights()"-->
<!--            label="delete torrent"-->
<!--            class="text-red-500 font-medium rounded-2xl"-->
<!--            @click="deleteTorrent"-->
<!--          >-->
<!--            Delete torrent-->
<!--          </TorrustButton>-->
        </div>
      </div>
    </template>
    <template v-else>
      <div class="mb-1 h-24 bg-gray-700 animate-pulse rounded-2xl" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { CalendarIcon, CircleStackIcon, UserCircleIcon } from "@heroicons/vue/20/solid";
import { CheckIcon, PencilIcon, XMarkIcon, LinkIcon } from "@heroicons/vue/24/solid";
import { Ref, PropType } from "vue";
import { Torrent } from "torrust-index-types-lib";
import { useRuntimeConfig } from "#app";
import {
  fileSize,
  downloadTorrent,
  ref,
  useRestApi,
  useSettings,
  useUser,
  isUserLoggedIn,
  isTrackerPublic
} from "#imports";
import { canEditThisTorrent } from "~/composables/helpers";

enum State {
  Viewing,
  Editing
}

const config = useRuntimeConfig();
const rest = useRestApi();
const settings = useSettings();
const user = useUser();

const state: Ref<State> = ref(State.Viewing);
const updatedTitle: Ref<String> = ref(null);

const emit = defineEmits([
  "updated"
]);

const props = defineProps({
  torrent: {
    type: Object as PropType<Torrent>,
    required: true
  }
});

function hasEditRights (): boolean {
  return canEditThisTorrent(props.torrent);
}

function showDownloadButtons () {
  return isUserLoggedIn() || isTrackerPublic();
}

function startEditingTitle () {
  updatedTitle.value = props.torrent.title;
  state.value = State.Editing;
}

function saveChanges () {
  // TODO: Submit changes.
  emit("updated");
  state.value = State.Viewing;
}

function deleteTorrent () {
  rest.value.torrent.deleteTorrent(props.torrent.torrent_id)
    .then(() => {
      emit("updated");
    });
}
</script>
