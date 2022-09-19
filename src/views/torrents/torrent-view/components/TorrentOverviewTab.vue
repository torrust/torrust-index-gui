<template>
  <div class="flex flex-col">
    <div id="torrent-description" class="mb-10 flex flex-col">
      <div class="mb-5 px-5 flex flex-col">
        <h2 class="text-2xl text-left text-slate-200 font-medium">Description</h2>
      </div>
      <div class="w-full h-full flex flex-col">
        <div class="p-6 w-full h-full flex flex-col grow border border-slate-800 rounded-2xl">
          <MarkdownItVue v-if="torrent.description" :content="torrent.description" class="md-body max-w-none prose-sm prose-blue" />
          <span v-else class="text-slate-400 italic">No description provided.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownItVue from "markdown-it-vue";
import 'markdown-it-vue/dist/markdown-it-vue.css';

export default {
  name: "TorrentOverviewTab",
  components: {MarkdownItVue},
  data: () => ({
    torrent: {}
  })
}
</script>

<style scoped>

</style>
