<template>
  <div class="flex flex-col gap-6">
    <div class="flex w-full">
      <div class="flex flex-wrap justify-between  gap-2">
        <div class="pl-0.5 flex flex-wrap gap-2">
          <input
            v-model="searchQuery"
            name="search"
            type="text"
            class="h-8 border-2 input input-bordered rounded-2xl placeholder-neutral-content"
            :placeholder="`Filter by username`"
          >
          <div class="flex flex-wrap gap-1">
            <TorrustSelect
              v-model:selected="selectedFilters"
              class="ml-auto"
              :options="filteringOptions"
              label="Filter by"
            />
            <TorrustSelect
              v-model:selected="selectedSorting"
              class="ml-auto"
              :options="sortingOptions"
              label="Sort by"
            />
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
// const filters = useFilters();

const defaultPageSize = 50;
const queryPageSize = isNaN(route.query?.pageSize) ? defaultPageSize : parseInt(route.query?.pageSize as string, 10);
const pageSize: Ref<number> = ref(isNaN(queryPageSize) ? defaultPageSize : queryPageSize);
const userProfiles: Ref<Array<UserProfile>> = ref([]);
const userProfilesTotal = ref(0);
const currentPage: Ref<number> = ref(Number(route.query?.page as string) || 1);
const searchQuery: Ref<string> = ref(null);
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

watch(() => route.fullPath, () => {
  searchQuery.value = route.query.search as string ?? null;
  itemsSorting.value = route.query.sorting as string ?? sortingOptions[0].value;
  currentPage.value = isNaN(route.query.page) ? 1 : parseInt(route.query.page);
  pageSize.value = isNaN(route.query.pageSize) ? defaultPageSize : parseInt(route.query.pageSize);
});

watch(currentPage, () => {
  router.push({
    query: {
      search: searchQuery.value,
      sorting: itemsSorting.value ? itemsSorting.value : sortingOptions[0].value,
      pageSize: pageSize.value,
      page: currentPage.value
    }
  });

  loadUserProfiles();
});

// Resets the current page value to 1 when the page size is changed to display results correctly
watch([pageSize, searchQuery], () => {
  router.push({
    query: {
      search: searchQuery.value,
      sorting: itemsSorting.value ? itemsSorting.value : sortingOptions[0].value,
      pageSize: pageSize.value,
      page: 1
    }
  });

  loadUserProfiles();
});

onActivated(() => {
  searchQuery.value = route.query.search as string ?? null;
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
