<template>
    <div id="home">
      <h1 class="text-2xl font-semibold text-tbk-80 mb-2 lg:mb-0">Trending Torrents</h1>
      <TorrentList />
    </div>
</template>

<script>
import TorrentList from "@/components/TorrentList";
export default {
  name: 'Home',
  components: {TorrentList},
}
</script>
