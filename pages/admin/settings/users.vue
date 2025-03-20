<template>
  <div class="flex flex-col max-w-md gap-2 mx-auto">
    <div class="flex flex-col gap-2">
      <div class="pl-0.5 flex flex-col gap-2">
        <div class="flex gap-2">
          <TorrustSelect
            v-model:selected="filters"
            :options="filteringOptions.map(entry => ({ name: entry.name, value: entry.value }))"
            label="Filter by"
            :multiple="true"
          />
          <TorrustSelect
            v-model:selected="selectedSorting"
            :options="sortingOptions"
            label="Sort by"
          />

        </div>
        <div class="flex flex-col w-full gap-2">
          <input
            v-model="searchQuery"
            name="search"
            type="text"
            class="h-8 w-full border-2 input input-bordered rounded-2xl placeholder-neutral-content"
            :placeholder="`Filter by username`"
          >
        </div>
        <UserTable :user-profiles="userProfiles" />
        <Pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total-results="userProfilesTotal"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { notify } from "notiwind-ts";
import type { UserProfile } from "torrust-index-types-lib";
import { onMounted, ref, watch } from "#imports";
import { useRestApi } from "~/composables/states";
import type { TorrustSelectOption } from "components/TorrustSelect.vue";

const filteringOptions: Array<TorrustSelectOption> = [
  { name: "Email verified", value: "EmailVerified" },
  { name: "Email not verified", value: "EmailNotVerified" },
  { name: "Torrent uploader", value: "TorrentUploader" }
];

const sortingOptions: Array<TorrustSelectOption> = [
  { name: "Registration date (Newest first)", value: "DateRegisteredNewest" },
  { name: "Registration date (Oldest first)", value: "DateRegisteredOldest" },
  { name: "Username (A to Z)", value: "UsernameAZ" },
  { name: "Username (Z to A)", value: "UsernameZA" }
];

const route = useRoute();
const router = useRouter();
const rest = useRestApi();

const defaultPageSize = 50;
const queryPageSize = isNaN(route.query?.pageSize) ? defaultPageSize : parseInt(route.query?.pageSize as string, 10);
const pageSize: Ref<number> = ref(isNaN(queryPageSize) ? defaultPageSize : queryPageSize);
const userProfiles: Ref<Array<UserProfile>> = ref([]);
const userProfilesTotal = ref(0);
const currentPage: Ref<number> = ref(Number(route.query?.page as string) || 1);
const searchQuery: Ref<string> = ref(null);
const itemsFilters: Ref<string> = ref(route.query?.filters as string || filteringOptions[0].value);
const queryFilters = route.query?.filters as string[] || [];
const filters: Ref<string[]> = ref(Array.isArray(queryFilters) ? queryFilters : [queryFilters]);
const itemsSorting: Ref<string> = ref(route.query?.sorting as string || sortingOptions[0].value);

const selectedSorting = computed({
  get () {
    return [itemsSorting.value];
  },
  set (value) {
    itemsSorting.value = value[0];
    currentPage.value = 1;
  }
});

watch(currentPage, () => {
  router.replace({
    query: {
      search: searchQuery.value,
      filters: filters.value.length > 0 ? filters.value : [],
      sorting: itemsSorting.value ? itemsSorting.value : sortingOptions[0].value,
      pageSize: pageSize.value,
      page: currentPage.value
    }
  });

  loadUserProfiles();
});

watch([pageSize, searchQuery, filters, itemsSorting], () => {
  router.replace({
    query: {
      search: searchQuery.value,
      filters: filters.value.length > 0 ? filters.value : [],
      sorting: itemsSorting.value ? itemsSorting.value : sortingOptions[0].value,
      pageSize: pageSize.value,
      page: 1
    }
  });

  loadUserProfiles();
});

onActivated(() => {
  searchQuery.value = route.query.search as string ?? null;
  filters.value = route.query.filters as string[] ?? null;
  itemsSorting.value = route.query.sorting as string ?? sortingOptions[0].value;
  pageSize.value = route.query.pageSize as number ?? defaultPageSize;
  currentPage.value = route.query.page as number ?? 1;
});

onMounted(() => {
  searchQuery.value = route.query.search as string ?? null;
  loadUserProfiles();
});

function loadUserProfiles () {
  rest.value.user.getUserProfiles(
    {
      filters: filters.value,
      sorting: itemsSorting.value,
      pageSize: pageSize.value,
      page: currentPage.value,
      searchQuery: searchQuery.value
    }
  )
    .then((v) => {
      userProfilesTotal.value = v.total;
      userProfiles.value = v.results;
    })
    .catch((err) => {
      notify({
        group: "error",
        title: "Error",
        text: `Trying to get the information for the user profiles. ${err.message}.`
      }, 10000);
    });
}
</script>
