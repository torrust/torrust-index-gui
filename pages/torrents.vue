<template>
  <div class="min-h-fit max-w-full flex flex-col grow">
    <div class="max-w-full flex flex-col">
      <div id="torrents-header" class="mb-6 px-6">
        <div class="flex flex-row flex-nowrap items-center">
          <div class="text-3xl font-semibold text-themeText">Browse Torrents</div>
          <div class="ml-auto">
            <FiltersTorrustSelect :options="sortingOptions" :label="'Sort by'" @updated="updateSorting"/>
          </div>
        </div>
      </div>
      <div id="torrents-body" class="flex flex-col">
        <div class="flex flex-row flex-nowrap items-start">
          <div id="torrent-filters" class="mr-7 sticky w-full max-w-xs">
            <div class="flex flex-col flex-nowrap w-full justify-between">
              <FiltersTorrustSelect :options="categories" :label="'Category'" @updated="setCategoryFilters" multiple/>
              <FiltersTorrustSelect :options="categories" :label="'Tags'" multiple class="mt-4"/>
            </div>
          </div>
          <div id="torrent-list" class="grow">
            <TorrentList
                v-if="torrents?.length > 0"
                :torrents="torrents"
                :sorting="itemsSorting"
                :update-sorting="updateSorting"
            />
            <span v-else class="text-themeText">No results.</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {getCategories, useCategories, useRestApi} from "~/composables/states";
import {useRuntimeConfig} from "nuxt/app";
import {Torrent, TorrentCategory, TorrentCompact} from "torrust-index-types-lib";
import {onBeforeMount, onMounted, ref, watch} from "#imports";
import {Ref} from "@vue/reactivity";
import {useRoute, useRouter} from "#app";

type SortingOption = {
  name: string;
  value: string;
}

const pageSizeList = [20, 50, 100, 200];

// TODO: provide sorting options from backend.
const sortingOptions: Array<SortingOption> = [
      {name: 'Uploaded (Newest first)', value: 'UploadedDesc'},
      {name: 'Uploaded (Oldest first)', value: 'UploadedAsc'},
      {name: 'Seeders (High to low)', value: 'SeedersDesc'},
      {name: 'Leechers (High to low)', value: 'LeechersDesc'},
];

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const categories = useCategories();
const rest = useRestApi()

// TODO: Set categoryFilters in view.
const categoryFilters: Ref<Array<string>> = ref(new Array<string>())
const pageSize: Ref<number> = ref(20);
const torrents: Ref<Array<TorrentCompact>> = ref(null);
const torrentsTotal = ref(0)
const searchQuery: Ref<string> = ref(null);
const currentPage: Ref<number> = ref(1);
const itemsSorting: Ref<SortingOption> = ref(sortingOptions[0]);

watch([route], () => {
  searchQuery.value = route.query.search as string ?? null;
  loadTorrents();
})

onMounted(() => {
  getCategories()
  searchQuery.value = route.query.search as string ?? null;
  updateSortFromRoute();
  loadTorrents();
})

function loadTorrents() {
  rest.value.torrent.getTorrents(
      {
        pageSize: pageSize.value,
        page: currentPage.value,
        sorting: itemsSorting.value.value,
        categories: categoryFilters.value,
        searchQuery: searchQuery.value
      }
  )
      .then((v) => {
        torrentsTotal.value = v.total
        torrents.value = v.results
      })
}

function updateSortFromRoute() {
  if (route.query.sorting) {
    switch (route.query.sorting) {
      case "popular":
        itemsSorting.value = sortingOptions[2];
        break;
      case 'recent':
        itemsSorting.value = sortingOptions[0];
        break;
      default:
        itemsSorting.value = sortingOptions[2];
    }
  }
}

function updateSorting(sorting: SortingOption) {
  currentPage.value = 1;
  itemsSorting.value = sorting;
  loadTorrents();
}

function clearSearch() {
  router.push({
    replace: true,
    query: {
      ...route.query,
      search: ""
    }
  });
}

function setCategoryFilters(categories: Array<TorrentCategory>) {
  let filters: Array<string> = [];

  categories.forEach((category) => {
    filters.push(category.name);
  });

  categoryFilters.value = filters;
}

function setPageSize(size: number) {
  pageSize.value = size;
  loadTorrents();
}

function totalPages() {
  return Math.ceil(torrentsTotal.value / pageSize.value);
}

// export default {
//   watch: {
//     '$route.query.search': function (search) {
//       search ? this.search = search : this.search = '';
//       this.currentPage = 1;
//       this.loadTorrents(this.currentPage, this.sorting);
//     },
//     '$route.params.sorting': function () {
//       this.updateSortFromRoute();
//       this.loadTorrents(this.currentPage, this.sorting);
//     },
//     filters() {
//       this.loadTorrents(this.currentPage, this.sorting);
//     },
//     currentPage(newPage) {
//       this.loadTorrents(newPage, this.sorting);
//       document.getElementById("TorrentList").scrollIntoView({behavior: "smooth"});
//     },
//     categoryFilters() {
//       this.loadTorrents(this.currentPage, this.sorting);
//     }
//   },
// }
</script>

<style scoped>

</style>