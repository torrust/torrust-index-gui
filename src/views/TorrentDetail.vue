<template>
  <div
      class="flex overflow-auto fixed top-0 left-0 z-30 flex-col justify-center w-full h-screen bg-black bg-opacity-50"
      @click.self="closeModal"
  >
    <div class="mx-auto mt-8 w-11/12 h-full sm:w-full sm:max-w-5xl">

      <div
          class="relative px-4 py-12 mx-auto mb-4 max-w-3xl bg-white shadow xl:py-8 sm:px-6 lg:px-8 xl:max-w-5xl xl:grid xl:grid-cols-3 md:rounded-lg">
        <button
            @click="closeModal"
            class="absolute top-0 right-0">
          <XIcon class="m-2 xl:m-5"/>
        </button>
        <div class="xl:col-span-2 xl:pr-8 xl:border-r xl:border-gray-200">
          <div>
            <div class="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6">
              <h1 class="text-2xl font-bold text-gray-900">Cyberpunk 2077 Pre-cracked All patches</h1>
              <button type="button"
                      class="text-white bg-green-600 border-transparent shadow-sm button hover:bg-red-700">
                <DownloadIcon class="mr-2 -ml-1 w-5 h-5"/>
                Download
              </button>
            </div>

            <!-- Mobile sidebar -->
            <DetailsSidebar class="mt-8 xl:hidden"/>

            <div class="py-3 xl:pt-6 xl:pb-0">
              <h2 class="sr-only">Description</h2>
              <div class="flex justify-center w-full">
                <img class="mb-5 max-w-full h-auto rounded-lg"
                     src="https://images.pushsquare.com/c1143ad56a9e2/cyberpunk-2077-reversible-cover.original.jpg">
              </div>
              <div v-html="compiledMarkdown" class="max-w-none prose-sm md:prose"></div>
            </div>
          </div>

          <Files/>

        </div>

        <!-- Desktop sidebar -->
        <DetailsSidebar class="hidden xl:block xl:pl-8"/>

      </div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it';
import Files from "../components/torrent-details/Files";
import DetailsSidebar from "../components/torrent-details/DetailsSidebar";
import {DownloadIcon, XIcon} from "@vue-hero-icons/outline";


export default {
  name: "TorrentDetail",
  components: {DetailsSidebar, Files, DownloadIcon, XIcon},
  data: () => ({
    md: new MarkdownIt(),
  }),
  mounted() {
    document.body.classList.add("modal-open");
  },
  beforeDestroy() {
    document.body.classList.remove("modal-open");
  },
  methods: {
    closeModal() {
      this.$router.push({name: 'CategoryDetail'});
    }
  },
  computed: {
    torrentId() {
      return this.$route.params.torrentId;
    },
    compiledMarkdown() {
      return this.md.render("# Markdown title\n ### Markdown title");
    }
  }
}
</script>

<style scoped>
.button {
  @apply inline-flex justify-center px-4 py-2 text-sm font-medium rounded-md border shadow-sm;
}
</style>