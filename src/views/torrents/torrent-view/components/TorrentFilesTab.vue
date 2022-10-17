<template>
  <div class="flex flex-col">
    <div id="torrent-description" class="mb-10 flex flex-col">
      <div class="mb-5 px-5 flex flex-row justify-between">
        <h2 class="mr-1 text-2xl text-left text-slate-200 dark:text-dark-200 font-medium">Files</h2>
      </div>
      <div class="w-full h-full flex flex-col">
        <div
            v-for="file in files"
            class="mb-3 p-6 w-full h-full flex flex-row grow justify-between items-center text-sm border border-slate-800 dark:border-white/5 rounded-2xl overflow-x-auto"
        >
          <span class="text-slate-200 dark:text-dark-200 font-semibold">{{ file.name }}</span>
          <div class="px-3 flex flex-row flex-nowrap items-center justify-center text-slate-500 dark:text-dark-500 font-semibold">
            <DatabaseIcon class="mr-1" size="18" />
            <span class="whitespace-nowrap">{{ fileSize(file.size) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DatabaseIcon } from "@vue-hero-icons/outline"

export default {
  name: "TorrentFilesTab",
  components: {DatabaseIcon},
  props: {
    torrent: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  computed: {
    files() {
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
            size: file.length
          });
        }
      }

      return files;
    },
  }
}
</script>

<style scoped>

</style>
