<template>
  <div>
    <h1 class="view-title">Category</h1>
    <div class="flex justify-between view-title">
      <h1>hello</h1>
      <h1>hello</h1>
    </div>
    <TorrentList />
  </div>
</template>

<script>
import TorrentList from "../components/TorrentList";
export default {
  name: 'CategoryOverview',
  components: {TorrentList}
}
</script>

<style scoped>

</style>