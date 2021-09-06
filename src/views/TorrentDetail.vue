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
              <h1 class="text-xl break-all md:text-2xl font-bold text-gray-900">{{ torrent.title }}</h1>
              <button type="button" @click="downloadTorrent"
                      class="text-white bg-green-600 border-transparent shadow-sm button hover:bg-green-700">
                <DownloadIcon class="mr-2 -ml-1 w-5 h-5"/>
                Download
              </button>
            </div>

            <!-- Mobile sidebar -->
            <DetailsSidebar class="mt-8 xl:hidden" :torrent="torrent"/>

            <div class="py-3 xl:pt-6 xl:pb-0">
              <h2 class="sr-only">Description</h2>
<!--              <div class="flex justify-center w-full">-->
<!--                <img class="mb-5 max-w-full h-auto rounded-lg"-->
<!--                     :src="torrent.image" :alt="torrent.title">-->
<!--              </div>-->
              <div v-html="compiledMarkdown" class="max-w-none prose-sm md:prose"></div>
            </div>
          </div>

<!--          <FileTree :files="torrent.files" />-->

        </div>

        <!-- Desktop sidebar -->
        <DetailsSidebar class="hidden xl:block xl:pl-8" :torrent="torrent"/>

      </div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it';
// import FileTree from "../components/torrent-details/FileTree";
import DetailsSidebar from "../components/torrent-details/DetailsSidebar";
import {DownloadIcon, XIcon} from "@vue-hero-icons/outline";
import HttpService from "@/common/http-service";


export default {
  name: "TorrentDetail",
  components: {DetailsSidebar, DownloadIcon, XIcon},
  data: () => ({
    torrent: {
      name: "The.Suicide.Squad.2021.1080p.WEBRip.x264-RARBG",
      seeders: 13164,
      leechers: 4391,
      date: Date.now(),
      size: 2500000000,
      uploader: "TheMorozko",
      image: "https://lx1.dyncdn.cc/cdn/f1/f171fca83dbbcbcbd0dfedee5f27b4c3.jpg",
      categories: ["Movies"],
      files: [
        {
          name: "child folder",
          children: [
            {
              name: "child folder",
              children: [{name: "hello.jpg"}, {name: "wat.pdf"}]
            },
            {name: "hello.jpg"},
            {name: "wat.pdf"},
            {
              name: "child folder",
              children: [{name: "hello.jpg"}, {name: "wat.pdf"}]
            }
          ]
        },
        {name: "hello.jpg"},
        {name: "wat.pdf"},
        {
          name: "child folder",
          children: [
            {
              name: "child folder",
              children: [{name: "hello.jpg"}, {name: "wat.pdf", }]
            },
            {name: "hello.jpg"},
            {name: "wat.pdf"},
            {
              name: "child folder",
              children: [{name: "hello.jpg"}, {name: "wat.pdf"}]
            }
          ]
        }
      ]
    },
    md: new MarkdownIt(),
  }),
  mounted() {
    document.body.classList.add("modal-open");
    this.getTorrent(this.torrentId);
  },
  beforeDestroy() {
    document.body.classList.remove("modal-open");
  },
  methods: {
    closeModal() {
      this.$router.push({name: 'CategoryDetail'});
    },
    getTorrent(torrentId) {
      HttpService.get(`/torrent/${torrentId}`, (res) => {
        this.torrent = res.data.data;
      });
    },
    downloadTorrent() {
      //window.open(`${process.env.VUE_APP_API_BASE_URL}/torrent/download`, '_blank');
      HttpService.getBlob(`/torrent/download/${this.torrentId}`, (res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${this.torrent.title}.torrent`);
        document.body.appendChild(link);
        link.click();
      });
    }
  },
  computed: {
    torrentId() {
      return this.$route.params.torrentId;
    },
    compiledMarkdown() {
      return this.md.render(this.torrent.description || "");
    }
  }
}
</script>

<style scoped>
.button {
  @apply inline-flex justify-center px-4 py-2 text-sm font-medium rounded-md border shadow-sm;
}
</style>
