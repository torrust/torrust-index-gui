<template>
  <div class="min-h-fit max-w-full flex flex-col grow">
    <div class="max-w-full flex flex-col">
      <div id="torrents-header" class="mb-6 px-6">
        <div class="flex flex-row flex-nowrap items-center">
          <div class="text-3xl font-semibold text-white">Browse Torrents</div>
          <div class="ml-auto">
            <TorrustSelect :options="sortingOptions" :label="'Sort by'" @updated="updateSorting"/>
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
            <span v-else class="text-themeText">No results.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import TorrentList from "~/components/torrent/TorrentList.vue";
import {AdjustmentsHorizontalIcon, FunnelIcon} from "@heroicons/vue/24/outline";
import {ChevronDownIcon} from '@heroicons/vue/24/solid'
import TorrustSelect from "~/components/filters/TorrustSelect.vue";
import {rest} from "~/api";
import {useCategories} from "~/store";
import {useRuntimeConfig} from "nuxt/app";
import {Torrent} from "torrust-index-types-lib";
import {ref} from "#imports";
import {Ref} from "@vue/reactivity";

type Torrents = {
  total: number;
  results: Array<Torrent>;
}

const config = useRuntimeConfig();
const categories = useCategories();

// TODO: categoryFilters

const torrents: Ref<Torrents> = ref(null);

export default {
  name: "Torrents",
  components: {
    TorrustSelect,
    TorrentList,
    AdjustmentsHorizontalIcon,
    FunnelIcon,
    ChevronDownIcon
  },
  data: () => ({
    sorting: {name: 'Uploaded (Newest first)', value: 'UploadedDesc'},
    sortingOptions: [
      {name: 'Uploaded (Newest first)', value: 'UploadedDesc'},
      {name: 'Uploaded (Oldest first)', value: 'UploadedAsc'},
      {name: 'Seeders (High to low)', value: 'SeedersDesc'},
      {name: 'Leechers (High to low)', value: 'LeechersDesc'},
    ],
    search: '',
    currentPage: 1,
    pageSize: 20,
    pageSizeList: [20, 50, 100, 200]
  }),
  methods: {
    loadTorrents(page: number) {
      rest.torrent.getTorrents(config.public.apiBase, this.pageSize, page, this.sorting.value, this.categoryFilters, this.search)
          .then((torrents) => {
            this.torrents = torrents;
          })
    },
    updateSortFromRoute() {
      if (this.$route.params.sorting) {
        let sort = this.$route.params.sorting;
        switch (sort) {
          case 'popular':
            this.sorting = {name: 'Seeders (High to low)', value: 'SeedersDesc'};
            break;
          case 'recent':
            this.sorting = {name: 'Uploaded (Newest first)', value: 'UploadedDesc'};
            break;
          default:
            this.sorting = {name: 'Seeders (High to low)', value: 'SeedersDesc'};
        }
      }
    },
    clearSearch() {
      this.$router.replace({query: {...this.$route.query, search: ''}})
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
    categoryOptions() {
      let options = [];

      this.categories.forEach((category) => {
        options.push({name: category.name, value: category.name});
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
    rest.category.getCategories(config.public.apiBase)
        .then((categories) => {
          categories.value = categories;
        })
  },
}
</script>

<style scoped>

</style>
