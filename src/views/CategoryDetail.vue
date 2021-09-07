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

    <TorrentList :torrents="torrents.results" />
    <Pagination :current-page.sync="currentPage" :total-pages="totalPages" :total-results="torrents.total" :page-size="pageSize" />
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
    sorting: "uploaded",
    torrents: {
      total: 0,
      results: []
    },
    currentPage: 1,
    pageSize: 20,
  }),
  methods: {
    loadTorrents(category, page, sort) {
      HttpService.get(`/category/${category}/torrents?page_size=${this.pageSize}&page=${page-1}&sort=${sort}`, (res) => {
        this.torrents = res.data.data;
      });
    }
  },
  computed: {
    category() {
      return this.$route.params?.name;
    },
    totalPages() {
      return Math.ceil(this.torrents.total / this.pageSize);
    },
  },
  watch: {
    category(newCat) {
      this.loadTorrents(newCat, this.currentPage, this.sorting);
    },
    sorting(newSort) {
      this.loadTorrents(this.category, this.currentPage, newSort);
    },
    currentPage(newPage) {
      this.loadTorrents(this.category, newPage, this.sorting);
    }
  },
  mounted() {
    let category = this.$route.params?.name;
    this.loadTorrents(category, this.currentPage, this.sorting);
  }
}
</script>

<style scoped>

</style>
