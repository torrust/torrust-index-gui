<template>
  <div class="flex flex-col min-h-fit grow">
    <div class="flex flex-col items-center max-w-full">
      <div id="torrent-view" class="flex flex-col-reverse items-start w-full gap-3 mb-8 md:flex-row flex-nowrap">
        <div id="torrent-view-details" class="flex flex-col items-center flex-auto w-full">
          <div id="torrent-view-details-body" class="flex flex-col w-full grow">
            <div class="flex flex-col gap-6">
              <div class="hidden md:block">
                <button
                  class="pl-2 pr-4 border-none btn bg-base-100 hover:bg-base-100 text-base-content/75 hover:text-base-content"
                  @click.prevent="$router.go(-1)"
                >
                  <ChevronLeftIcon class="w-5 mr-2" />
                  back
                </button>
              </div>
              <div v-if="torrent" class="flex flex-col flex-auto w-full gap-6">
                <span class="text-lg font-bold capitalize truncate" :v-if="torrent">{{ torrent.title }}</span>
                <TorrentDescriptionTab :torrent="torrent" @updated="reloadTorrent" />
                <TorrentCommentTab :torrent="torrent" @updated="reloadTorrent" />
                <TorrentCreationDateTab :torrent="torrent" @updated="reloadTorrent" />
                <TorrentCreatedByTab :torrent="torrent" @updated="reloadTorrent" />
                <TorrentEncodingTab :torrent="torrent" @updated="reloadTorrent" />
                <TorrentFilesTab :torrent="torrent" @updated="reloadTorrent" />
                <TorrentTrackersTab :torrent="torrent" @updated="reloadTorrent" />
                <CanonicalInfoHashGroup :torrent="torrent" @updated="reloadTorrent" />
              </div>
            </div>
          </div>
        </div>
        <TorrentActionCard v-if="torrent" class="max-w-md top-8 md:sticky" :torrent="torrent" @updated="reloadTorrent" @deleted="navigateToTorrentList" />
        <div class="block md:hidden">
          <button
            class="border-none btn bg-base-200"
            @click.prevent="$router.go(-1)"
          >
            <ChevronLeftIcon class="w-5 mr-2 text-base-content/50" />
            back
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeftIcon } from "@heroicons/vue/24/solid";
import type { Ref } from "vue";
import type { TorrentResponse } from "torrust-index-types-lib";
import { notify } from "notiwind-ts";
import CanonicalInfoHashGroup from "./CanonicalInfoHashGroup.vue";
import { useRoute, navigateTo, ref, useRestApi } from "#imports";
import TorrentActionCard from "~/components/torrent/TorrentActionCard.vue";
import TorrentDescriptionTab from "~/components/torrent/TorrentDescriptionTab.vue";
import TorrentFilesTab from "~/components/torrent/TorrentFilesTab.vue";
import TorrentTrackersTab from "~/components/torrent/TorrentTrackersTab.vue";

const route = useRoute();
const rest = useRestApi().value;

const infoHash = route.params.infoHash as string;

const loadingTorrent: Ref<boolean> = ref(false);
const torrent: Ref<TorrentResponse> = ref(null);
const title = ref("");

useSeoMeta({
  title: () => `${title.value} - Torrent`
});

onBeforeMount(() => {
  if (!infoHash) {
    navigateTo("/", { replace: true });
  }

  getTorrentFromApi(infoHash);
});

function getTorrentFromApi (infoHash: string) {
  loadingTorrent.value = true;

  rest.torrent.getTorrentInfo(infoHash)
    .then((data) => {
      torrent.value = data;
      title.value = data.title;
    })
    .catch((err) => {
      loadingTorrent.value = false;
      notify({
        group: "error",
        title: "Error",
        text: `Trying to get the torrent information. ${err.message}.`
      }, 10000);
    });
}

function reloadTorrent () {
  getTorrentFromApi(torrent.value.info_hash);
}

function navigateToTorrentList () {
  navigateTo("/torrents", { replace: true });
}
</script>

  <style scoped>
  .active {
    @apply bg-primary/20 text-primary;
  }
  </style>

  <style>
  img {
    @apply rounded-2xl;
  }

  .markdown-body {
    @apply text-neutral-content;
  }

  .markdown-body a {
    @apply text-sky-500;
  }

  .markdown-body blockquote {
    @apply text-slate-400 dark:text-neutral-400 border-slate-600 dark:border-neutral-600;
  }

  .markdown-body hr {
    @apply bg-slate-200/50 dark:bg-white/5;
  }

  .markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6 {
    @apply border-slate-200/50 dark:border-white/5;
  }

  .markdown-body .highlight pre, .markdown-body pre {
    @apply bg-slate-800 dark:bg-neutral-800 text-slate-400 dark:text-neutral-400 rounded-md;
  }

  .markdown-body table tr, .markdown-body table td, .markdown-body table th {
    @apply bg-slate-800 dark:bg-neutral-800 border-slate-700 dark:border-white/5;
  }
  </style>
