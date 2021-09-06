<template>
  <div>
    <div class="flex justify-between">
      <h1 class="view-title">{{ titleCase(category) }}</h1>
      <TableOrder :sorting.sync="sorting"/>
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

    <TorrentList :torrents="sortedTorrents" />
    <Pagination :current-page.sync="currentPage" :total-pages="totalPages" :total-results="torrents.length || 0" page-size="20" />
  </div>
</template>

<script>
import TorrentList from "../components/TorrentList";
import Pagination from "../components/Pagination";
import TableOrder from "../components/TableOrder";
import HttpService from "@/common/http-service";

export default {
  name: "CategoryDetail",
  components: {TableOrder, Pagination, TorrentList},
  data: () => ({
    sorting: "uploadDate",
    torrents: [],
    currentPage: 1,
    pageSize: 20,
  }),
  methods: {
    loadTorrents(category, page) {
      HttpService.get(`/category/${category}/torrents?page_size=${this.pageSize}&page=${page-1}`, (res) => {
        this.torrents = res.data.data;
      });
    }
  },
  computed: {
    category() {
      return this.$route.params?.name;
    },
    totalPages() {
      return Math.ceil(this.torrents.length / this.pageSize);
    },
    sortedTorrents() {
      let sortedTorrents = this.torrents;
      if (this.sorting === "seeders") {
        return sortedTorrents.sort((a, b) => b.seeders - a.seeders);
      } else {
        return sortedTorrents.sort((a, b) => b.upload_date - a.upload_date);
      }
    },
  },
  watch: {
    category(newCat) {
      this.loadTorrents(newCat, this.currentPage);
    },
    currentPage(newPage) {
      this.loadTorrents(this.category, newPage);
    }
  },
  mounted() {
    let category = this.$route.params?.name;
    this.loadTorrents(category, this.currentPage);
  }
}
</script>

<style scoped>

</style>
