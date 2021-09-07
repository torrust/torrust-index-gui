<template>
  <div
      class="flex overflow-auto fixed top-0 left-0 z-30 flex-col justify-center w-full h-screen bg-black bg-opacity-50"
      @click.self="closeModal"
  >
    <div class="mx-auto mt-8 w-11/12 h-full sm:w-full sm:max-w-5xl">

      <div
          class="relative px-4 py-12 mx-auto mb-4 max-w-3xl bg-white shadow xl:py-8 sm:px-6 lg:px-8 xl:max-w-5xl xl:grid xl:grid-cols-1 md:rounded-lg">
        <button
            @click="closeModal"
            class="absolute top-0 right-0">
          <XIcon class="m-2 xl:m-5"/>
        </button>
        <div class="xl:col-span-2 xl:pr-8">
          <div>
            <div class="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6">
              <h1 class="text-xl break-all md:text-2xl font-bold text-gray-900">{{ torrent.title }}</h1>
            </div>

            <!-- Mobile sidebar -->
            <DetailsSidebar class="mt-8 xl:hidden" :torrent="torrent"/>

            <div class="flex flex-wrap overflow-hidden">
              <div class="p-4 pl-0 w-full overflow-hidden xl:w-2/3">
                <h2 class="sr-only">Description</h2>
  <!--              <div class="flex justify-center w-full">-->
  <!--                <img class="mb-5 max-w-full h-auto rounded-lg"-->
  <!--                     :src="torrent.image" :alt="torrent.title">-->
  <!--              </div>-->
                <div v-html="compiledMarkdown" class="max-w-none prose-sm md:prose"></div>
              </div>
              <!-- Desktop sidebar -->
              <DetailsSidebar class="hidden xl:block p-4 border-l w-full overflow-hidden xl:w-1/3" :torrent="torrent"/>
            </div>
          </div>

          <FileTree :files="groupedFiles" />

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it';
import FileTree from "../components/torrent-details/FileTree";
import DetailsSidebar from "../components/torrent-details/DetailsSidebar";
import {XIcon} from "@vue-hero-icons/outline";
import HttpService from "@/common/http-service";


export default {
  name: "TorrentDetail",
  components: {DetailsSidebar, FileTree, XIcon},
  data: () => ({
    torrent: {
      name: "",
      seeders: 0,
      leechers: 0,
      date: Date.now(),
      size: 0,
      uploader: "null",
      image: "",
      categories: [],
      files: [],
      // files: [
      //   {
      //     name: "child folder",
      //     children: [
      //       {
      //         name: "child folder",
      //         children: [{name: "hello.jpg"}, {name: "wat.pdf"}]
      //       },
      //       {name: "hello.jpg"},
      //       {name: "wat.pdf"},
      //       {
      //         name: "child folder",
      //         children: [{name: "hello.jpg"}, {name: "wat.pdf"}]
      //       }
      //     ]
      //   },
      //   {name: "hello.jpg"},
      //   {name: "wat.pdf"},
      //   {
      //     name: "child folder",
      //     children: [
      //       {
      //         name: "child folder",
      //         children: [{name: "hello.jpg"}, {name: "wat.pdf", }]
      //       },
      //       {name: "hello.jpg"},
      //       {name: "wat.pdf"},
      //       {
      //         name: "child folder",
      //         children: [{name: "hello.jpg"}, {name: "wat.pdf"}]
      //       }
      //     ]
      //   }
      // ]
    },
    md: new MarkdownIt(),
  }),
  mounted() {
    document.body.classList.add("modal-open");
    this.getTorrent(this.$route.params.torrentId);
  },
  // beforeRouteUpdate() {
  //   this.getTorrent(this.$route.params.torrentId);
  // },
  beforeDestroy() {
    document.body.classList.remove("modal-open");
  },
  methods: {
    closeModal() {
      this.$router.push({name: 'CategoryDetail'});
    },
    getTorrent(torrentId) {
      const self = this;
      HttpService.get(`/torrent/${torrentId}`, (res) => {
        this.torrent = res.data.data;
      }).catch(() => {
        self.closeModal();
      })
    },
  },
  computed: {
    torrentId() {
      return this.$route.params.torrentId;
    },
    compiledMarkdown() {
      return this.md.render(this.torrent.description || "This torrent has no description.");
    },
    groupedFiles() {
      let files = [];

      if (this.torrent.files) {
        for (const file of this.torrent.files) {
          let filename = "";
          for (const [i, path] of file.path.entries()) {
            filename += path;
            if (i !== file.path.length - 1) {
              filename += "/"
            }
          }
          files.push({
            name: filename,
            length: file.length
          });
        }
      }

      return files;
    },
  }
}
</script>

<style scoped>
.button {
  @apply inline-flex justify-center px-4 py-2 text-sm font-medium rounded-md border shadow-sm;
}
</style>
