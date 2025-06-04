<template>
  <div class="flex flex-col max-w-md gap-2 mx-auto">
    <div class="flex flex-col gap-2">
      <div class="pl-0.5 flex flex-wrap gap-2">
        <input
          v-model="searchQuery"
          name="search"
          type="text"
          class="h-8 border-2 input input-bordered rounded-2xl placeholder-neutral-content"
          :placeholder="`Filter by username`"
        >

      </div>
      <UserTable :user-profiles="userProfiles" />
      <Pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :total-results="userProfilesTotal" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { notify } from "notiwind-ts";
import type { UserProfile } from "torrust-index-types-lib";
import { onMounted, ref, watch } from "#imports";
import { useRestApi } from "~/composables/states";

const route = useRoute();
const router = useRouter();
const rest = useRestApi();

const defaultPageSize = 50;
const rawPageSize = route.query.pageSize;
const queryPageSize = isNaN(Number(rawPageSize)) ? defaultPageSize : parseInt(rawPageSize as string, 10);
const pageSize: Ref<number> = ref(isNaN(queryPageSize) ? defaultPageSize : queryPageSize);
const userProfiles: Ref<Array<UserProfile>> = ref([]);
const userProfilesTotal = ref(0);
const currentPage: Ref<number> = ref(Number(route.query?.page as string) || 1);
const searchQuery: Ref<string> = ref(null);

watch(() => route.fullPath, () => {
  searchQuery.value = (route.query.search as string) ?? null;

  const page = parseInt(route.query.page as string);
  currentPage.value = isNaN(page) ? 1 : page;

  const size = parseInt(route.query.pageSize as string);
  pageSize.value = isNaN(size) ? defaultPageSize : size;
});

watch(currentPage, () => {
  router.push({
    query: {
      search: searchQuery.value,
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
      pageSize: pageSize.value,
      page: 1
    }
  });

  loadUserProfiles();
});

onActivated(() => {
  searchQuery.value = (route.query.search as string) ?? null;

  const size = parseInt(route.query.pageSize as string);
  pageSize.value = isNaN(size) ? defaultPageSize : size;

  const page = parseInt(route.query.page as string);
  currentPage.value = isNaN(page) ? 1 : page;
});

onMounted(() => {
  searchQuery.value = route.query.search as string ?? null;
  loadUserProfiles();
});

function loadUserProfiles () {
  rest.value.user.getUserProfiles({
    pageSize: pageSize.value,
    page: currentPage.value,
    searchQuery: searchQuery.value
  })
    .then((v: { total: number; results: UserProfile[] }) => {
      userProfilesTotal.value = v.total;
      userProfiles.value = v.results;
    })
    .catch((err: Error) => {
      notify({
        group: "error",
        title: "Error",
        text: `Trying to get the information for the user profiles. ${err.message}.`
      }, 10000);
    });
}

</script>
