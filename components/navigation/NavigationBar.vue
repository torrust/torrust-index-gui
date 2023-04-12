<template>
  <div class="pb-4 px-4 md:pb-0 md:px-8 lg:px-24 flex flex-col bg-base-200">
    <div class="p-0 navbar gap-2">
      <button class="flex md:hidden btn btn-square btn-ghost" @click="mobileCollapsed = !mobileCollapsed">
        <Bars3Icon class="w-8" />
      </button>
      <NuxtLink to="/" class="flex flex-row btn btn-ghost normal-case text-xl">
        <span>{{ settings?.website_name || "Torrust" }}</span>
      </NuxtLink>
      <div class="form-control hidden md:flex">
        <input
          v-model="searchQuery"
          name="search"
          type="text"
          class="input border-2 input-bordered rounded-2xl"
          :placeholder="`Search ${settings?.website_name ?? 'Torrust'}`"
          @keyup.enter="submitSearch"
          @focusin="typingInSearch = true"
          @focusout="typingInSearch = false"
        >
      </div>
      <div class="px-2 dropdown dropdown-hover hidden md:inline-block">
        <label tabindex="0" class="px-1">
          <NuxtLink to="/torrents" class="flex">
            Torrents
            <ChevronDownIcon class="ml-2 w-5" />
          </NuxtLink>
        </label>
        <ul tabindex="0" class="p-2 shadow menu dropdown-content bg-base-100 rounded w-52">
          <li><NuxtLink to="/torrents?sorting=LeechersDesc">
            Most Popular
          </NuxtLink></li>
          <li><NuxtLink to="/torrents?sorting=UploadedDesc">
            Most Recent
          </NuxtLink></li>
        </ul>
      </div>
      <div class="ml-auto flex-none gap-2">
        <template v-if="user">
          <NuxtLink to="/upload" class="hidden md:flex btn bg-base-100 rounded-2xl">
            Upload Torrent
          </NuxtLink>
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <UserCircleIcon />
              </div>
            </label>
            <ul tabindex="0" class="mt-3 p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
              <li><NuxtLink to="/admin/settings/general">
                Admin Settings
              </NuxtLink></li>
              <li><a @click="logoutUser()">Logout</a></li>
            </ul>
          </div>
        </template>
        <template v-else>
          <button class="btn btn-primary" @click="login">
            Login
          </button>
        </template>
      </div>
    </div>
    <template v-if="!mobileCollapsed">
      <div class="md:hidden items-center justify-between w-full">
        <div class="mt-2 flex flex-row gap-2">
          <div class="form-control w-full">
            <input
              v-model="searchQuery"
              name="search"
              type="text"
              class="input input-bordered border-2"
              :placeholder="`Search ${settings?.website_name ?? 'Torrust'}`"
              @keyup.enter="submitSearch"
              @focusin="typingInSearch = true"
              @focusout="typingInSearch = false"
            >
          </div>
          <button class="btn btn-square btn-ghost" @click="submitSearch">
            <MagnifyingGlassIcon class="w-6" />
          </button>
        </div>
        <ul id="mobile-menu" class="flex flex-col gap-2 p-4 mt-4 font-medium bg-base-content/10 rounded-lg">
          <li>
            <NuxtLink to="/" class="block py-2 pl-3 pr-4 text-white rounded-lg">
              Home
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/torrents" class="block py-2 pl-3 pr-4 text-white rounded-lg">
              Torrents
            </NuxtLink>
          </li>
        </ul>
        <template v-if="user">
          <NuxtLink to="/upload" class="mt-4 btn btn-secondary w-full">
            Upload Torrent
          </NuxtLink>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { UserCircleIcon, Bars3Icon, MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
import { ChevronDownIcon } from "@heroicons/vue/20/solid";
import { Ref } from "vue";
import { useRouter } from "#app";
import { ref, useAuthenticationModal, useSettings, useUser, logoutUser } from "#imports";

const router = useRouter();
const settings = useSettings();
const user = useUser();
const authModalOpen = useAuthenticationModal();

const mobileCollapsed = ref(true);
const searchQuery: Ref<string> = ref("");
const typingInSearch = ref(false);

function submitSearch () {
  router.push({
    path: "/torrents",
    query: {
      search: searchQuery.value ?? null
    }
  });
}

function login () {
  authModalOpen.value = true;
}
</script>

<style scoped>
#mobile-menu a.router-link-exact-active {
  @apply bg-primary;
}
</style>
