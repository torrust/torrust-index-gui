<template>
  <div>
    <div class="flex justify-between">
      <h1 class="view-title">Category</h1>
      <TableOrder />
    </div>
    <TorrentList />
    <Pagination />
  </div>
</template>

<script>
import TorrentList from "../components/TorrentList";
import Pagination from "../components/Pagination";
import TableOrder from "../components/TableOrder";
export default {
  name: "CategoryDetail",
  components: {TableOrder, Pagination, TorrentList}
}
</script>

<style scoped>

</style>