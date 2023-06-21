<template>
  <div class="w-full flex flex-col basis-full">
    <template v-if="torrent">
      <div class="md:px-6 flex flex-col gap-3">

        <span class="text-lg font-bold capitalize truncate">{{ torrent.title }}</span>

        <template v-if="torrent.tags?.length">
          <div class="flex flex-wrap space-x-2">
            <template v-for="tag in torrent.tags">
              <NuxtLink :to="`/torrents?tagFilters=${tag.name}`" class="px-2 py-1 bg-base-content/25 hover:bg-base-content/50 font-semibold capitalize text-xs rounded-lg cursor-pointer">
                {{ tag.name }}
              </NuxtLink>
            </template>
          </div>
        </template>

        <div />

        <div class="p-6 stats bg-base-100 flex flex-col gap-3 rounded-2xl">
          <div class="flex flex-col items-center justify-between w-full">
            <div class="w-full h-2 bg-transparent rounded-full overflow-hidden">
              <template v-if="seedersPercentage() === 0 && leechersPercentage() === 0">
                <div class="h-full bg-green-500 float-left" :style="{ width: '50%' }" />
                <div class="h-full bg-red-500 float-right" :style="{ width: '50%' }" />
              </template>
              <template v-else>
                <div class="h-full bg-green-500 float-left" :style="{ width: seedersPercentage() }" />
                <div class="h-full bg-red-500 float-right" :style="{ width: leechersPercentage() }" />
              </template>
            </div>
            <div class="mt-2 px-6 flex flex-row justify-between w-full">
              <div class="mr-4 flex flex-col items-center">
                <span class="stat-value text-2xl text-green-500 font-bold">{{ torrent.seeders }}</span>
                <span class="stat-title text-sm capitalize">seeders</span>
              </div>
              <div class="flex flex-col items-center">
                <span class="stat-value text-2xl text-red-500 font-bold">{{ torrent.leechers }}</span>
                <span class="stat-title text-sm capitalize">leechers</span>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6 stats bg-base-100 flex flex-col rounded-2xl">
          <div class="flex flex-col text-base-content/60 text-sm">
            <div class="py-2 pt-0 flex flex-row">
              <div class="flex flex-row w-1/2">
                <TagIcon class="mr-2 w-4" />
                <span>Category</span>
              </div>
              <div class="flex flex-row w-1/2">
                <NuxtLink :to="`/torrents?categoryFilters=${torrent.category.name}`" class="link-primary capitalize">
                  {{ torrent.category.name }}
                </NuxtLink>
              </div>
            </div>
            <div class="py-2 flex flex-row">
              <div class="flex flex-row w-1/2">
                <CalendarIcon class="mr-2 w-4" />
                <span>Upload Date</span>
              </div>
              <div class="flex flex-row w-1/2">
                <span>{{ new Date(torrent.upload_date).toLocaleDateString() }}</span>
              </div>
            </div>
            <div class="py-2 flex flex-row">
              <div class="flex flex-row w-1/2">
                <CircleStackIcon class="mr-2 w-4" />
                <span>File Size</span>
              </div>
              <div class="flex flex-row w-1/2">
                <span>{{ fileSize(torrent.file_size) }}</span>
              </div>
            </div>
            <div class="flex flex-row">
              <div class="py-2 flex flex-row w-1/2">
                <HashtagIcon class="mr-2 w-4" />
                <span>Info Hash</span>
              </div>
              <div class="py-1 flex flex-row w-1/2">
                <div class="relative border border-base-content/10 flex items-center max-w-full overflow-x-auto rounded-lg">
                  <span class="px-2">{{ torrent.info_hash }}</span>
                </div>
              </div>
            </div>
            <div class="py-2 pb-0 flex flex-row">
              <div class="flex flex-row w-1/2">
                <UserCircleIcon class="mr-2 w-4" />
                <span>Uploader</span>
              </div>
              <div class="flex flex-row w-1/2">
                <span>{{ torrent.uploader }}</span>
              </div>
            </div>
          </div>
        </div>

        <div />

        <div class="flex flex-row gap-3">
          <template v-if="showDownloadButtons">
            <button class="btn btn-primary grow" @click="downloadTorrent(torrent.info_hash, torrent.title)">
              download torrent
            </button>
            <button class="p-0 btn btn-primary w-12">
              <a class="flex items-center" :href="torrent.magnet_link">
                <LinkIcon class="w-6" />
              </a>
            </button>
          </template>
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

        <div />

        <template v-if="hasEditRights()">
          <button
            class="btn btn-secondary"
            @click="editTorrent"
          >
            edit torrent
          </button>
          <button
            class="btn btn-error"
            @click="deleteTorrent"
          >
            delete torrent
          </button>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { CheckIcon, PencilIcon, XMarkIcon, LinkIcon, CalendarIcon, CircleStackIcon, UserCircleIcon, HashtagIcon, TagIcon } from "@heroicons/vue/24/solid";
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
  isTrackerPublic, navigateTo
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

function seedersPercentage () {
  const total = props.torrent.seeders + props.torrent.leechers;
  return props.torrent.seeders > 0 ? `${(props.torrent.seeders / total) * 100}%` : 0;
}

function leechersPercentage () {
  const total = props.torrent.seeders + props.torrent.leechers;
  return props.torrent.leechers > 0 ? `${(props.torrent.leechers / total) * 100}%` : 0;
}

function editTorrent () {
  navigateTo(`/torrent/edit/${props.torrent.info_hash}`, { replace: true });
}

function deleteTorrent () {
  rest.value.torrent.deleteTorrent(props.torrent.info_hash)
    .then(() => {
      emit("updated");
    });
}
</script>
