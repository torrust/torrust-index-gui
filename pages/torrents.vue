<template>
  <div class="flex flex-col">
    <div class="flex flex-col">
      <h2 class="text-2xl font-semibold text-neutral-content">
        Browse Torrents
      </h2>
    </div>
    <div class="mt-6 flex flex-row">
      <div class="w-full flex flex-row flex-nowrap gap-3">
        <TorrustSelect :options="categories" :label="'Category'" multiple search @updated="setCategoryFilters" />
        <TorrustSelect :options="tags" :label="'Tags'" multiple search />
        <TorrustSelect class="ml-auto" :options="sortingOptions" :label="'Sort by'" @updated="updateSorting" />
      </div>
    </div>
    <div class="mt-6 flex flex-col">
      <div class="flex flex-row flex-nowrap items-start">
        <div class="w-full">
          <template v-if="torrents?.length > 0">
            <TorrentList
              :torrents="torrents"
              :sorting="itemsSorting"
              :update-sorting="updateSorting"
            />
            <Pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :total-results="torrentsTotal" />
          </template>
          <template v-else>
            <span class="text-neutral-content">No results.</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from "nuxt/app";
import { TorrentCategory, TorrentCompact } from "torrust-index-types-lib";
import { Ref } from "vue";
import { useRoute, useRouter } from "#app";
import { onMounted, ref, useTags, watch } from "#imports";
import { useCategories, useRestApi } from "~/composables/states";

type SortingOption = {
  name: string;
  value: string;
}

// TODO: provide sorting options from backend.
const sortingOptions: Array<SortingOption> = [
  { name: "Uploaded (Newest first)", value: "UploadedDesc" },
  { name: "Uploaded (Oldest first)", value: "UploadedAsc" },
  { name: "Seeders (High to low)", value: "SeedersDesc" },
  { name: "Leechers (High to low)", value: "LeechersDesc" }
];

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const categories = useCategories();
const tags = useTags();
const rest = useRestApi();

const defaultPageSize = 20;
const queryPageSize = parseInt(route.query?.pageSize as string, 10);
const pageSize: Ref<number> = ref(isNaN(queryPageSize) ? defaultPageSize : queryPageSize);

// TODO: Set categoryFilters in view.
const categoryFilters: Ref<Array<string>> = ref(new Array<string>());
const torrents: Ref<Array<TorrentCompact>> = ref(null);
const torrentsTotal = ref(0);
const searchQuery: Ref<string> = ref(null);
const currentPage: Ref<number> = ref(1);
const itemsSorting: Ref<string> = ref(sortingOptions[0].value);

watch([itemsSorting, pageSize, currentPage, categoryFilters], () => {
  router.push({
    query: {
      search: searchQuery.value,
      sorting: itemsSorting.value,
      pageSize: pageSize.value
    }
  });

  loadTorrents();
});

onMounted(() => {
  searchQuery.value = route.query.search as string ?? null;
  updateSortFromRoute();
  loadTorrents();
});

function loadTorrents () {
  rest.value.torrent.getTorrents(
    {
      pageSize: pageSize.value,
      page: currentPage.value,
      sorting: itemsSorting.value,
      categories: categoryFilters.value,
      searchQuery: searchQuery.value
    }
  )
    .then((v) => {
      torrentsTotal.value = v.total;
      torrents.value = v.results;
    });
}

function updateSortFromRoute () {
  if (route.query.sorting) {
    itemsSorting.value = route.query.sorting as string;
  }
}

function updateSorting (sorting: SortingOption) {
  currentPage.value = 1;
  itemsSorting.value = sorting.value;
  loadTorrents();
}

function clearSearch () {
  router.push({
    replace: true,
    query: {
      ...route.query,
      search: ""
    }
  });
}

function setCategoryFilters (categories: Array<TorrentCategory>) {
  const filters: Array<string> = [];

  categories.forEach((category) => {
    filters.push(category.name);
  });

  categoryFilters.value = filters;

  loadTorrents();
}
</script>

<style scoped>

</style>
