<template>
  <div class="min-h-fit flex flex-col grow">
    <div class="max-w-full flex flex-col items-center">
      <div id="torrent-view" class="mb-8 flex flex-col-reverse md:flex-row flex-nowrap items-start w-full">
        <div id="torrent-view-details" class="mr-8 flex flex-col flex-auto items-center w-full">
          <div id="torrent-view-details-body" class="w-full flex flex-col grow">
            <div class="flex flex-col gap-6">
              <div v-if="torrent" class="hidden md:flex flex-row flex-nowrap items-center gap-3">
                <button
                  class="w-10 h-10 flex flex-col items-center justify-center bg-secondary hover:bg-tertiary rounded-md duration-200"
                  @click.prevent="$router.go(-1)"
                >
                  <ChevronLeftIcon class="text-themeText/50 w-6 duration-200" />
                </button>
                <h2 class="md:text-2xl font-semibold text-themeText">
                  {{ torrent.title }}
                </h2>
              </div>
              <div v-if="torrent" class="w-full flex flex-col flex-auto gap-6">
                <TorrentDescriptionTab :torrent="torrent" @updated="reloadTorrent" />
                <TorrentFilesTab :torrent="torrent" @updated="reloadTorrent" />
                <TorrentTrackersTab :torrent="torrent" @updated="reloadTorrent" />
              </div>
            </div>
          </div>
        </div>
        <TorrentActionCard class="top-24 md:sticky max-w-md" :torrent="torrent" @updated="reloadTorrent" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeftIcon } from "@heroicons/vue/24/solid";
import { Ref } from "vue";
import { useRoute, useRuntimeConfig } from "#app";
import { Torrent } from "torrust-index-types-lib";
import TorrentActionCard from "~/components/torrent/TorrentActionCard.vue";
import TorrentDescriptionTab from "~/components/torrent/TorrentDescriptionTab.vue";
import TorrentFilesTab from "~/components/torrent/TorrentFilesTab.vue";
import TorrentTrackersTab from "~/components/torrent/TorrentTrackersTab.vue";
import { onMounted, ref, useRestApi } from "#imports";

const config = useRuntimeConfig();
const route = useRoute();
const rest = useRestApi().value;

const loadingTorrent: Ref<boolean> = ref(false);
const torrent: Ref<Torrent> = ref(null);

onMounted(async () => {
    await getTorrentFromApi(Number(route.params.id));
});

function getTorrentFromApi (torrentId: number) {
    loadingTorrent.value = true;

    rest.torrent.getTorrent(torrentId)
        .then((data) => {
            torrent.value = data;
        })
        .catch(() => {
            loadingTorrent.value = false;
        });

    // TODO: Set torrent title in URL.
}

function reloadTorrent () {
    getTorrentFromApi(torrent.value.torrent_id);
}
</script>

<style scoped>
.active {
  @apply bg-accent/20 text-accent;
}
</style>

<style>
img {
  @apply rounded-2xl;
}

.markdown-body {
  @apply text-themeText;
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
