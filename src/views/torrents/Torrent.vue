<template>
  <div class="min-h-fit max-w-full flex flex-col grow">
    <div class="max-w-full flex flex-col">
      <div id="torrent-view" class="mb-8 max-w-full flex flex-row flex-nowrap items-start">
        <div id="torrent-view-details" class="mr-8 flex flex-col flex-auto items-center">
          <div id="torrent-view-details-body" class="w-full max-w-3xl flex flex-col grow">
            <div class="flex flex-col items-center">
              <div id="details-switcher" class="mb-4 max-w-md h-12">
                <ul class="flex flex-row border-b-2 border-slate-600">
                  <li v-for="(option) in tabs">
                    <button
                        class="inline-flex py-2 px-6 font-medium text-center text-slate-400 hover:text-slate-200 border-b-2 border-transparent duration-200"
                        :class="{ 'active': option.tab === tab }"
                        style="margin-bottom: -2px;"
                        @click="tab = option.tab"
                    >
                      {{ option.name }}
                    </button>
                  </li>
                </ul>
<!--                <ul class="p-1 grid grid-flow-col text-center text-slate-400 font-semibold bg-slate-800/60 rounded-2xl">-->
<!--                  <li>-->
<!--                    <a href="#page1" class="active px-4 py-2 mr-3 flex justify-center rounded-2xl">Overview</a>-->
<!--                  </li>-->
<!--                  <li>-->
<!--                    <a href="#page2" class="px-4 py-2 mr-3 flex justify-center rounded-2xl">Files</a>-->
<!--                  </li>-->
<!--                  <li>-->
<!--                    <a href="#page3" class="px-4 py-2 flex justify-center rounded-2xl">Trackers</a>-->
<!--                  </li>-->
<!--                </ul>-->
              </div>
              <div class="mt-4 w-full flex flex-col flex-auto">
                <div v-if="tab === Tabs.overview" class="flex flex-col">
                  <div id="torrent-description" class="mb-10 flex flex-col">
                    <div class="mb-5 px-5 flex flex-col">
                      <h2 class="text-2xl text-left text-slate-200 font-medium">Description</h2>
                    </div>
                    <div class="w-full h-full flex flex-col">
                      <div class="p-6 w-full h-full flex flex-col grow border border-slate-800 rounded-2xl">
                        <MarkdownItVue v-if="torrent.description" :content="torrent.description" class="md-body max-w-none prose-sm prose-blue" />
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="tab === Tabs.files" class="flex flex-col">
                  <div id="torrent-description" class="mb-10 flex flex-col">
                    <div class="w-full h-full flex flex-col">
                      <div class="p-6 w-full h-full flex flex-row grow justify-between items-center text-sm border border-slate-800 rounded-2xl">
                        <span class="text-slate-200 font-semibold">movie.mp4</span>
                        <div class="px-3 flex flex-row flex-nowrap items-center justify-center text-slate-400 font-semibold">
                          <DatabaseIcon class="mr-1" size="18" />
                          <span>4.7 GB</span>
                        </div>
                      </div>
                      <div class="mt-3 p-6 w-full h-full flex flex-row grow justify-between items-center text-sm border border-slate-800 rounded-2xl">
                        <span class="text-slate-200 font-semibold">images/poster.jpg</span>
                        <div class="px-3 flex flex-row flex-nowrap items-center justify-center text-slate-400 font-semibold">
                          <DatabaseIcon class="mr-1" size="18" />
                          <span>320 KB</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="tab === Tabs.trackers" class="flex flex-col">
                  <div id="torrent-description" class="mb-10 flex flex-col">
                    <div class="w-full h-full flex flex-col">
                      <div class="px-6 py-4 w-full h-full flex flex-row grow justify-between items-center text-sm border border-slate-800 rounded-2xl">
                        <span class="text-slate-200 font-semibold">https://tracker.torrust.org/announce</span>
                        <div class="flex flex-row flex-nowrap justify-between">
                          <div class="px-4 py-2 mr-3 flex flex-col items-center bg-slate-800/60 rounded-2xl grow">
                            <span id="seeders" class="text-green-500 font-semibold">246</span>
                          </div>
                          <div class="px-4 py-2 flex flex-col items-center bg-slate-800/60 rounded-2xl grow">
                            <span id="leechers" class="text-red-500 font-semibold">687</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="torrent-view-options" class="top-24 sticky flex flex-col basis-full max-w-md" style="min-width: 300px;">
          <div class="flex flex-col">
            <div class="mb-8 px-7 flex flex-col">
              <div class="mb-4 flex flex-col">
                <div class="flex flex-col">
                  <span class="mb-1 font-semibold text-sky-600">Movies</span>
                  <h2 class="mb-1 text-slate-200 font-bold">This is a cool movie torrent in mp4 format.</h2>
                  <span class="text-sm font-semibold text-slate-600">F27D89F8F200192176EE7C1BF5720FD5BE8FB02F</span>
                </div>
              </div>
              <div class="mb-4 h-0.5 flex flex-col bg-slate-800/60"></div>
              <div class="flex flex-row flex-nowrap justify-between">
                <div class="flex flex-row flex-nowrap">
                  <div class="mr-1 h-8 px-3 flex flex-row flex-nowrap items-center justify-center text-slate-500 font-semibold text-sm">
                    <DatabaseIcon class="mr-1" size="18" />
                    <span>317.15 MB</span>
                  </div>
                  <div class="h-8 px-3 flex flex-row flex-nowrap items-center justify-center text-slate-500 font-semibold text-sm">
                    <CalendarIcon class="mr-1" size="18" />
                    <span>16/07/2020</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="w-full h-full flex flex-col">
              <div class="p-6 w-full h-full flex flex-col grow border border-slate-800 rounded-2xl">
                <div class="flex flex-col">
                  <div class="mb-3 flex flex-row flex-nowrap justify-between">
                    <div class="p-2 mr-3 flex flex-col items-center bg-slate-800/60 rounded-2xl grow">
                      <span class="text-xs text-slate-600 font-semibold">SEEDERS</span>
                      <span id="seeders" class="text-green-500 font-semibold">246</span>
                    </div>
                    <div class="p-2 flex flex-col items-center bg-slate-800/60 rounded-2xl grow">
                      <span class="text-xs text-slate-600 font-semibold">LEECHERS</span>
                      <span id="leechers" class="text-red-500 font-semibold">687</span>
                    </div>
                  </div>
                  <button class="mt-3 px-4 h-12 bg-white text-sm text-black font-medium rounded-2xl">Magnet link</button>
                  <button class="mt-3 px-4 h-12 bg-sky-500 text-sm text-white font-medium rounded-2xl">Download torrent</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownItVue from "markdown-it-vue";
import 'markdown-it-vue/dist/markdown-it-vue.css';
import { DatabaseIcon, CalendarIcon } from "@vue-hero-icons/outline"

export default {
  name: "Torrent",
  components: {MarkdownItVue, DatabaseIcon, CalendarIcon},
  data: () => ({
    Tabs: {
      overview: 0,
      files: 1,
      trackers: 2
    },
    tabs: [
      { name: 'Overview', tab: 0 },
      { name: 'Files', tab: 1 },
      { name: 'Trackers', tab: 2 },
    ],
    tab: 2,
    torrent: {
      description: "---\n" +
          "__Advertisement :)__\n" +
          "\n" +
          "- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image\n" +
          "  resize in browser.\n" +
          "- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly\n" +
          "  i18n with plurals support and easy syntax.\n" +
          "\n" +
          "You will like those projects!\n" +
          "\n" +
          "---\n" +
          "\n" +
          "# h1 Heading 8-)\n" +
          "## h2 Heading\n" +
          "### h3 Heading\n" +
          "#### h4 Heading\n" +
          "##### h5 Heading\n" +
          "###### h6 Heading"
    }
  }),
}
</script>

<style scoped>
.active {
  @apply text-slate-200 border-slate-200;
}
</style>

<style>
.markdown-body {
  @apply text-slate-400;
}

.markdown-body a {
  @apply text-sky-500;
}

.markdown-body blockquote {
  @apply text-slate-400 border-slate-600;
}

.markdown-body hr {
  @apply bg-slate-200/50;
}

.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6 {
  @apply border-slate-200/50;
}

.markdown-body .highlight pre, .markdown-body pre {
  @apply bg-slate-800 text-slate-400 rounded-md;
}

.markdown-body table tr, .markdown-body table td, .markdown-body table th {
  @apply bg-slate-800 border-slate-700;
}
</style>
