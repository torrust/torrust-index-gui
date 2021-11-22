<template>
  <div class="py-6 overflow-auto fixed top-0 left-0 z-20 flex-col justify-center w-full h-screen bg-black bg-opacity-50"
      @click.self="closeModal"
  >
    <div class="mt-16 mx-auto w-11/12 max-w-5xl">
      <div class="px-5 pb-5 rounded-3xl bg-secondary flex flex-col">
        <div class="py-5 flex flex-row items-center w-full">
          <h1 class="text-gray-100 truncate">{{ torrent.title }}</h1>
          <a @click="closeModal" class="ml-auto cursor-pointer text-gray-300 hover:text-white">
            <XIcon />
          </a>
        </div>
        <div class="p-4 bg-primary text-gray-300 rounded-3xl flex flex-col lg:flex-row justify-center items-center w-full overflow-auto">
          <div class="mb-4 lg:mb-0 flex flex-row">
            <div class="px-2 text-gray-300 text-sm">Seeders: <span class="text-green-500">{{ torrent.seeders }}</span></div>
            <div class="px-2 text-gray-300 text-sm">Leechers: <span class="text-red-500">{{ torrent.leechers }}</span></div>
          </div>
          <button type="button" @click="downloadTorrent"
                  class="ml-0 lg:ml-auto text-white bg-green-600 border-transparent shadow-sm button hover:bg-green-500">
            <DownloadIcon class="mr-2 -ml-1 w-5 h-5"/>
            Torrent file
          </button>
        </div>

        <h2 class="p-4 text-gray-300">Torrent information</h2>
        <div class="p-4 bg-primary text-sm text-gray-300 rounded-3xl flex flex-col w-full overflow-auto">
          <div><span class="font-bold">Infohash:</span> {{ torrent.info_hash }}</div>
          <div><span class="font-bold mt-1">Total size:</span> {{ fileSize(torrent.file_size) }}</div>
          <div><span class="font-bold mt-1">Upload date:</span> {{ new Date(torrent.upload_date * 1000).toLocaleString() }}</div>
          <div><span class="font-bold mt-1">Uploader:</span> {{ torrent.uploader }}</div>
        </div>

        <h2 class="p-4 text-gray-300">Torrent files</h2>
        <div class="p-4 bg-primary text-sm text-gray-300 rounded-3xl flex flex-col w-full overflow-auto">
          <div v-for="(file, i) in groupedFiles" :key="i">{{ file.name }} <span class="font-bold">({{ fileSize(file.length) }})</span></div>
        </div>

        <h2 class="p-4 text-gray-300">Torrent Description</h2>
        <div class="p-4 bg-primary text-gray-300 rounded-3xl flex flex-col w-full overflow-auto">
          <div v-html="compiledMarkdown" class="max-w-none prose-sm prose-blue"></div>
        </div>
      </div>

<!--      <div class="relative px-4 py-12 mx-auto mb-4 max-w-3xl bg-secondary shadow xl:py-8 sm:px-6 lg:px-8 xl:max-w-5xl xl:grid xl:grid-cols-1 md:rounded-lg">-->
<!--        <button-->
<!--            @click="closeModal"-->
<!--            class="absolute top-0 right-0">-->
<!--          <XIcon class="m-2 xl:m-5 text-white"/>-->
<!--        </button>-->

<!--        <div class="xl:col-span-2 xl:pr-8">-->
<!--          <div>-->
<!--            <div class="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6">-->
<!--              <h1 class="text-xl break-all md:text-2xl font-bold text-gray-900">{{ torrent.title }}</h1>-->
<!--            </div>-->

<!--            &lt;!&ndash; Mobile sidebar &ndash;&gt;-->
<!--            <DetailsSidebar class="mt-8 xl:hidden" :torrent="torrent"/>-->

<!--            <div class="flex flex-wrap overflow-hidden">-->
<!--              <div class="p-4 pl-0 w-full overflow-hidden xl:w-2/3">-->
<!--                <h2 class="sr-only">Description</h2>-->
<!--  &lt;!&ndash;              <div class="flex justify-center w-full">&ndash;&gt;-->
<!--  &lt;!&ndash;                <img class="mb-5 max-w-full h-auto rounded-lg"&ndash;&gt;-->
<!--  &lt;!&ndash;                     :src="torrent.image" :alt="torrent.title">&ndash;&gt;-->
<!--  &lt;!&ndash;              </div>&ndash;&gt;-->
<!--                <div v-html="compiledMarkdown" class="max-w-none prose-sm md:prose"></div>-->
<!--              </div>-->
<!--              &lt;!&ndash; Desktop sidebar &ndash;&gt;-->
<!--              <DetailsSidebar class="hidden xl:block p-4 border-l w-full overflow-hidden xl:w-1/3" :torrent="torrent"/>-->
<!--            </div>-->
<!--          </div>-->

<!--          <FileTree :files="groupedFiles" />-->

<!--        </div>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
import MarkdownIt from 'markdown-it';
// import FileTree from "../components/torrent-details/FileTree";
// import DetailsSidebar from "../components/torrent-details/DetailsSidebar";
import {XIcon, DownloadIcon} from "@vue-hero-icons/outline";
import HttpService from "@/common/http-service";


export default {
  name: "TorrentDetail",
  components: {XIcon, DownloadIcon},
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
      //this.$router.push({name: 'CategoryDetail'});
      this.$router.push({
        name: this.$route.matched[this.$route.matched.length - 2].name
      })
    },
    getTorrent(torrentId) {
      const self = this;
      HttpService.get(`/torrent/${torrentId}`, (res) => {
        this.torrent = res.data.data;
      }).catch(() => {
        self.closeModal();
      })
    },
    downloadTorrent() {
      //window.open(`${process.env.VUE_APP_API_BASE_URL}/torrent/download`, '_blank');
      HttpService.getBlob(`/torrent/download/${this.torrent.torrent_id}`, (res) => {
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
