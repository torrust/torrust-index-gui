<template>
  <div class="flex flex-col">
    <div id="torrent-description" class="mb-10 flex flex-col">
      <div class="mb-5 px-5 flex flex-row justify-between">
        <h2 class="mr-1 text-2xl text-left text-themeText font-medium">
          Files
        </h2>
      </div>
      <div class="w-full h-full flex flex-col">
        <div
          v-for="file in files"
          class="mb-3 p-6 w-full h-full flex flex-row grow justify-between items-center text-sm border border-slate-800 dark:border-white/5 rounded-2xl overflow-x-auto"
        >
          <span class="text-themeText font-semibold">{{ file.name }}</span>
          <div class="px-3 flex flex-row flex-nowrap items-center justify-center text-themeText/50 font-semibold">
            <CircleStackIcon class="mr-1" size="18" />
            <span class="whitespace-nowrap">{{ fileSize(file.size) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { CircleStackIcon } from "@heroicons/vue/24/outline";

export default {
  name: "TorrentFilesTab",
  components: { CircleStackIcon },
  props: {
    torrent: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  computed: {
    files () {
      const files = [];

      if (this.torrent.files) {
        for (const file of this.torrent.files) {
          let filename = "";
          for (const [i, path] of file.path.entries()) {
            filename += path;
            if (i !== file.path.length - 1) {
              filename += "/";
            }
          }
          files.push({
            name: filename,
            size: file.length
          });
        }
      }

      return files;
    }
  }
};
</script>

<style scoped>

</style>
