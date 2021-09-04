<template>
  <div>
    <div class="flex justify-between">
      <h1 class="view-title">{{ titleCase(category) }}</h1>
      <TableOrder/>
    </div>

    <transition
        enter-active-class="transition ease-out duration-100 transform"
        enter-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75 transform"
        leave-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
    >
      <router-view/>
    </transition>

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