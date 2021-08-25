<template>
  <div>
    <div class="flex justify-between">
      <h1 class="view-title">{{ titleCase(category) }}</h1>
      <TableOrder/>
    </div>
    <TorrentList/>
    <Pagination/>
  </div>
</template>

<script>
import TorrentList from "../components/TorrentList";
import Pagination from "../components/Pagination";
import TableOrder from "../components/TableOrder";

export default {
  name: "CategoryDetail",
  components: {TableOrder, Pagination, TorrentList},
  computed: {
    category() {
      return this.$route.params?.name;
    }
  }
}
</script>

<style scoped>

</style>