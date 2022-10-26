<template>
  <div class="mt-10">
    <div v-if="search" class="mb-2 flex flex-row">
      <h2 class="text-slate-400">Search results for '{{ this.search }}'</h2>
      <button @click="clearSearch" class="px-2 py-1 ml-2 text-sm rounded-md bg-red-500 bg-opacity-10 text-red-400 hover:text-red-500 transition duration-200">Clear search</button>
    </div>
    <div class="flex flex-row">
      <FilterCategory />
      <PageSize :update-page-size="updatePageSize" :page-size-list="pageSizeList"/>
    </div>
    <TorrentList id="TorrentList" class="mt-4" v-if="torrents.results.length > 0" :torrents="torrents.results" :sorting="sorting" :update-sorting="updateSorting"/>
    <Pagination v-if="torrents.results.length > 0" :current-page.sync="currentPage" :total-pages="totalPages" :total-results="torrents.total" :page-size="pageSize" />
    <div v-else class="py-6 text-slate-400">This category has no results.</div>
  </div>
</template>

<script>
import TorrentList from "./torrents/TorrentList.vue";
import Pagination from "../components/Pagination.vue";
import PageSize from "../components/PageSize.vue";
import HttpService from "@/common/http-service";
import {mapState} from "vuex";
import Breadcrumb from "../components/Breadcrumb.vue";
import { AdjustmentsIcon, FilterIcon } from "@vue-hero-icons/outline";
import FilterCategory from "../components/FilterCategory.vue";

export default {
  name: "Torrents",
  components: {FilterCategory, Pagination, PageSize, TorrentList, Breadcrumb, AdjustmentsIcon, FilterIcon},
  data: () => ({
    sorting: {
      name: 'Uploaded',
      direction: 'Desc',
    },
    search: '',
    torrents: {
      total: 0,
      results: []
    },
    currentPage: 1,
    pageSize: 20,
    pageSizeList: [20,50,100,200]
  }),
  methods: {
    loadTorrents(page) {
      HttpService.get(`/torrents?page_size=${this.pageSize}&page=${page-1}&sort=${this.sorting.name}${this.sorting.direction}&categories=${this.categoryFilters.join(',')}&search=${this.search}`, (res) => {
        this.torrents = res.data.data;
      }).catch(() => {});
    },
    updateSortFromRoute() {
      if (this.$route.params.sorting) {
        let sort = this.$route.params.sorting;
        switch (sort) {
          case 'popular':
            this.sorting.name = 'Seeders';
            this.sorting.direction = 'Desc';
            break;
          case 'recent':
            this.sorting.name = 'Uploaded';
            this.sorting.direction = 'Desc';
            break;
          default:
            this.sorting.name = sort;
        }
      }
    },
    clearSearch() {
      this.$router.replace({ query: {...this.$route.query, search: ''}})
    },
    updateSorting(sorting) {
      this.currentPage = Math.floor((this.currentPage - 1) * this.pageSize / pageSize) + 1;
      this.sorting = sorting;
      this.loadTorrents(this.currentPage);
    },
    updateCategories(categories) {
      let filters = this.categoryFilters;
      this.$store.commit('setCategoryFilters', filters);
    },
    updatePageSize(pageSize) {
      this.pageSize = pageSize;
      this.loadTorrents(this.currentPage);
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      categories: state => state.categories,
      categoryFilters: state => state.categoryFilters
    }),
    totalPages() {
      return Math.ceil(this.torrents.total / this.pageSize);
    },
  },
  watch: {
    '$route.query.search': function (search) {
      search ? this.search = search : this.search = '';
      this.currentPage = 1;
      this.loadTorrents(this.currentPage, this.sorting);
    },
    '$route.params.sorting': function () {
      this.updateSortFromRoute();
      this.loadTorrents(this.currentPage, this.sorting);
    },
    filters() {
      this.loadTorrents(this.currentPage, this.sorting);
    },
    currentPage(newPage) {
      this.loadTorrents(newPage, this.sorting);
      document.getElementById("TorrentList").scrollIntoView({behavior: "smooth"});
    },
    categoryFilters() {
      this.loadTorrents(this.currentPage, this.sorting);
    }
  },
  mounted() {
    this.$route.query.search ? this.search = this.$route.query.search : this.search = '';
    this.updateSortFromRoute();
    this.loadTorrents(this.currentPage, this.sorting);
  }
}
</script>

<style scoped>
</style>
