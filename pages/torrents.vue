<template>
  <div class="flex flex-col">
    <div class="flex flex-col">
      <h2 class="text-2xl font-semibold text-neutral-content">
        Browse Torrents
      </h2>
    </div>
    <div class="mt-6 flex flex-row">
      <div class="w-full flex flex-row flex-nowrap gap-3">
        <TorrustSelect
          v-model:selected="categoryFilters"
          :options="categories.map(entry => ({ name: entry.name, value: entry.name }))"
          :label="'Category'"
          :multiple="true"
          search
        />
        <!--        <TorrustSelect :options="tags" :label="'Tags'" multiple search />-->
        <TorrustSelect v-model:selected="selectedLayout" :options="layoutOptions" label="Layout" />
        <TorrustSelect v-model:selected="selectedSorting" class="ml-auto" :options="sortingOptions" label="Sort by" />
      </div>
    </div>
    <div class="mt-6 flex flex-col">
      <div class="flex flex-row flex-nowrap items-start">
        <div class="w-full">
          <template v-if="torrents.length > 0">
            <template v-if="layout === 'default'">
              <TorrentList :torrents="torrents" />
            </template>
            <template v-else-if="layout === 'table'">
              <TorrentTable :torrents="torrents" />
            </template>
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
import { TorrentCompact } from "torrust-index-types-lib";
import { Ref } from "vue";
import { useRoute, useRouter } from "#app";
import { computed, onMounted, ref, useTags, watch } from "#imports";
import { useCategories, useRestApi } from "~/composables/states";
import { TorrustSelectOption } from "~/components/TorrustSelect.vue";

// TODO: provide sorting options from backend.
const sortingOptions: Array<TorrustSelectOption> = [
  { name: "Uploaded (Newest first)", value: "UploadedDesc" },
  { name: "Uploaded (Oldest first)", value: "UploadedAsc" },
  { name: "Seeders (High to low)", value: "SeedersDesc" },
  { name: "Leechers (High to low)", value: "LeechersDesc" }
];

const layoutOptions: Array<TorrustSelectOption> = [
  { name: "Default", value: "default" },
  { name: "Table", value: "table" }
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
const queryCategoryFilters = route.query?.categoryFilters as string[] || [];
const categoryFilters: Ref<string[]> = ref(Array.isArray(queryCategoryFilters) ? queryCategoryFilters : [queryCategoryFilters]);
const torrents: Ref<Array<TorrentCompact>> = ref([]);
const torrentsTotal = ref(0);
const searchQuery: Ref<string> = ref(null);
const currentPage: Ref<number> = ref(Number(route.query?.page as string) || 1);
const itemsSorting: Ref<string> = ref(route.query?.sorting as string || sortingOptions[0].value);
const layout = ref(route.query?.layout as string || "default");

const selectedSorting = computed({
  get () {
    return [itemsSorting.value];
  },
  set (value) {
    itemsSorting.value = value[0];
    currentPage.value = 1;
  }
});

const selectedLayout = computed({
  get () {
    return [layout.value];
  },
  set (value) {
    layout.value = value[0];
  }
});

watch([route], () => {
  if (route.query.search !== searchQuery.value) {
    searchQuery.value = route.query.search as string;
  }
});

watch([searchQuery, itemsSorting, pageSize, currentPage, layout, categoryFilters], () => {
  router.push({
    query: {
      search: searchQuery.value,
      sorting: itemsSorting.value,
      pageSize: pageSize.value,
      page: currentPage.value,
      layout: layout.value,
      categoryFilters: categoryFilters.value
    }
  });

  loadTorrents();
});

onMounted(() => {
  searchQuery.value = route.query.search as string ?? null;
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
</script>

<style scoped>

</style>
