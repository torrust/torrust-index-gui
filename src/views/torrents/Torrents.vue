<template>
  <div class="min-h-fit max-w-full flex flex-col grow">
    <div class="max-w-full flex flex-col">
      <div id="torrents-header" class="mb-6 px-6">
        <div class="flex flex-row flex-nowrap items-center">
          <div class="text-3xl font-semibold text-white">Browse Torrents</div>
          <div class="ml-auto">
            <TorrustSelect :options="sortingOptions" :label="'Sort by'" @updated="updateSorting" />
          </div>
        </div>
      </div>
      <div id="torrents-body" class="flex flex-col">
        <div class="flex flex-row flex-nowrap items-start">
          <div id="torrent-filters" class="mr-7 sticky w-full max-w-md">
            <div class="flex flex-col flex-nowrap w-full justify-between">
              <TorrustSelect :options="categoryOptions" :label="'Category'" @updated="updateCategories" multiple/>
              <TorrustSelect :options="categoryOptions" :label="'Tags'" multiple class="mt-4"/>
            </div>
          </div>
          <div id="torrent-list" class="grow">
            <TorrentList
                v-if="torrents.results.length > 0"
                :torrents="torrents.results"
                :sorting="sorting"
                :update-sorting="updateSorting"
            />
            <span v-else class="text-dark-400">No results.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import TorrentList from "@/views/torrents/TorrentList.vue";
import Pagination from "@/components/Pagination.vue";
import PageSize from "@/components/PageSize.vue";
import HttpService from "@/common/http-service";
import Breadcrumb from "@/components/Breadcrumb.vue";
import FilterCategory from "@/components/FilterCategory.vue";
import { AdjustmentsIcon, FilterIcon } from "@vue-hero-icons/outline";
import { ChevronDownIcon } from '@vue-hero-icons/solid'
import TorrustSelect from "@/components/filters/TorrustSelect.vue";

export default {
  name: "Torrents",
  components: {
    TorrustSelect,
    FilterCategory,
    Pagination,
    PageSize,
    TorrentList,
    Breadcrumb,
    AdjustmentsIcon,
    FilterIcon,
    ChevronDownIcon
  },
  data: () => ({
    sorting: { name: 'Uploaded (Newest first)', value: 'UploadedDesc' },
    sortingOptions: [
      { name: 'Uploaded (Newest first)', value: 'UploadedDesc' },
      { name: 'Uploaded (Oldest first)', value: 'UploadedAsc' },
      { name: 'Seeders (High to low)', value: 'SeedersDesc' },
      { name: 'Leechers (High to low)', value: 'LeechersDesc' },
    ],
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
      HttpService.get(`/torrents?page_size=${this.pageSize}&page=${page-1}&sort=${this.sorting.value}&categories=${this.categoryFilters.join(',')}&search=${this.search}`, (res) => {
        this.torrents = res.data.data;
      }).catch(() => {});
    },
    updateSortFromRoute() {
      if (this.$route.params.sorting) {
        let sort = this.$route.params.sorting;
        switch (sort) {
          case 'popular':
            this.sorting = { name: 'Seeders (High to low)', value: 'SeedersDesc' };
            break;
          case 'recent':
            this.sorting = { name: 'Uploaded (Newest first)', value: 'UploadedDesc' };
            break;
          default:
            this.sorting = { name: 'Seeders (High to low)', value: 'SeedersDesc' };
        }
      }
    },
    clearSearch() {
      this.$router.replace({ query: {...this.$route.query, search: ''}})
    },
    updateSorting(sorting) {
      //this.currentPage = Math.floor((this.currentPage - 1) * this.pageSize / pageSize) + 1;
      this.currentPage = 1;
      this.sorting = sorting;
      this.loadTorrents(this.currentPage);
    },
    updateCategories(categories) {
      let filters = [];

      categories.forEach((category) => {
        filters.push(category.name);
      });

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
    categoryOptions() {
      let options = [];

      this.categories.forEach((category) => {
        options.push({ name: category.name, value: category.name });
      });

      return options;
    },
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
  },
  created() {
    HttpService.get('/category', (res) => {
      const categories = res.data.data;
      this.$store.commit('setCategories', categories);
    }).catch(() => {
    });
  },
}
</script>

<style scoped>
</style>
