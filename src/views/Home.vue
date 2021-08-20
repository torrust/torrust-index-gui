<template>
    <div id="home">
      <h1 class="view-title">Trending Torrents</h1>
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
