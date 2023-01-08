<template>
  <div class="min-h-fit flex flex-col grow">
    <div class="max-w-full flex flex-col items-center">

      <!-- MOBILE -->
      <div id="torrent-view" class="mb-8 max-w-full flex lg:hidden flex-col items-center">
        <TorrentActionCard v-if="torrent" class="mb-8 w-full" :torrent="torrent" @updated="reloadTorrent"/>
        <div id="torrent-view-details" class="w-full flex flex-col flex-auto items-center">
          <div id="torrent-view-details-body" class="w-full flex flex-col grow">
            <div class="flex flex-col items-center">
              <div id="details-switcher" class="mb-4 max-w-md h-12">
                <ul class="flex flex-row border-b-2 border-slate-600 dark:border-neutral-600">
                  <li v-for="(option) in tabs">
                    <button
                        class="inline-flex py-2 px-6 font-medium text-center text-slate-400 dark:text-neutral-200 hover:text-slate-200 border-b-2 border-transparent duration-200"
                        :class="{ 'active': option.tab === tab }"
                        style="margin-bottom: -2px;"
                        @click="tab = option.tab"
                    >
                      {{ option.name }}
                    </button>
                  </li>
                </ul>
              </div>
              <div v-if="torrent" class="mt-4 w-full flex flex-col flex-auto">
                <TorrentOverviewTab v-if="tab === Tab.Overview" :torrent="torrent" @updated="reloadTorrent"/>
                <TorrentFilesTab v-else-if="tab === Tab.Files" :torrent="torrent" @updated="reloadTorrent"/>
                <TorrentTrackersTab v-else-if="tab === Tab.Trackers" :torrent="torrent" @updated="reloadTorrent"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- DESKTOP -->
      <div id="torrent-view" class="hidden mb-8 max-w-8xl lg:flex flex-row flex-nowrap items-start grow w-full">
        <div id="torrent-view-details" class="mr-8 flex flex-col flex-auto items-center grow w-full">
          <div id="torrent-view-details-body" class="w-full max-w-3xl flex flex-col grow">
            <div class="flex flex-col items-center">
              <div v-if="torrent" id="details-switcher" class="mb-4 max-w-md h-12">
                <ul class="flex flex-row border-b-2 border-slate-600 dark:border-white/5">
                  <li v-for="(option) in tabs">
                    <button
                        class="inline-flex py-2 px-6 font-medium text-center text-themeText/50 hover:text-themeText border-b-2 border-transparent dark:hover:border-white/10 duration-200"
                        :class="{ 'active': option.tab === tab }"
                        style="margin-bottom: -2px;"
                        @click="tab = option.tab"
                    >
                      {{ option.name }}
                    </button>
                  </li>
                </ul>
              </div>
              <div v-if="torrent" class="mt-4 w-full flex flex-col flex-auto">
                <TorrentOverviewTab v-if="tab === Tab.Overview" :torrent="torrent" @updated="reloadTorrent"/>
                <TorrentFilesTab v-else-if="tab === Tab.Files" :torrent="torrent" @updated="reloadTorrent"/>
                <TorrentTrackersTab v-else-if="tab === Tab.Trackers" :torrent="torrent" @updated="reloadTorrent"/>
              </div>
            </div>
          </div>
        </div>
        <TorrentActionCard class="top-24 sticky max-w-md" :torrent="torrent" @updated="reloadTorrent"/>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import TorrentActionCard from "~/components/torrent/TorrentActionCard.vue";
import TorrentOverviewTab from "~/components/torrent/TorrentOverviewTab.vue";
import TorrentFilesTab from "~/components/torrent/TorrentFilesTab.vue";
import TorrentTrackersTab from "~/components/torrent/TorrentTrackersTab.vue";
import {onMounted, ref, useRestApi} from "#imports";
import {Ref} from "@vue/reactivity";
import {useRoute, useRuntimeConfig} from "#app";
import {Torrent} from "torrust-index-types-lib";

const config = useRuntimeConfig();
const route = useRoute();
const rest = useRestApi()

enum Tab {
  Overview,
  Files,
  Trackers
}

const tabs = [
  { name: 'Overview', tab: 0 },
  { name: 'Files', tab: 1 },
  { name: 'Trackers', tab: 2 },
];

const tab: Ref<Tab> = ref(Tab.Overview);
const loadingTorrent: Ref<boolean> = ref(false);
const torrent: Ref<Torrent> = ref(null);

onMounted(async () => {
  await getTorrentFromApi(Number(route.params.id));
})

function getTorrentFromApi(torrentId: number) {
  loadingTorrent.value = true;

  rest.value.torrent.getTorrent(torrentId)
      .then((data) => {
        torrent.value = data;
      })
      .catch(() => {
        loadingTorrent.value = false;
      });

  // TODO: Set torrent title in URL.
}

function reloadTorrent() {
  getTorrentFromApi(torrent.value.torrent_id);
}
</script>

<style scoped>
.active {
  @apply text-themeText border-accent;
}
</style>

<style>
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
