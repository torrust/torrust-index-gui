<template>
  <div class="flex flex-col">
    <div class="p-0 navbar bg-base-100 gap-2">
      <button class="flex md:hidden btn btn-square btn-ghost" @click="mobileCollapsed = !mobileCollapsed">
        <Bars3Icon class="w-8" />
      </button>
      <NuxtLink to="/" class="flex flex-row btn btn-ghost normal-case text-xl">
        <span>{{ settings?.website_name || "Torrust" }}</span>
      </NuxtLink>
      <div class="form-control hidden md:flex">
        <input v-model="searchQuery"
               name="search"
               type="text"
               class="input input-bordered"
               :placeholder="`Search ${settings?.website_name ?? 'Torrust'}`"
               @keyup.enter="submitSearch"
               @focusin="typingInSearch = true"
               @focusout="typingInSearch = false"
        />
      </div>
      <div class="hidden md:block flex-none">
        <ul class="menu menu-horizontal px-1">
          <li tabindex="0">
            <NuxtLink to="/torrents">
              Torrents
              <ChevronDownIcon class="w-5" />
            </NuxtLink>
            <ul class="p-2 bg-base-100">
              <li><NuxtLink to="/torrents?sorting=popular">Most Popular</NuxtLink></li>
              <li><NuxtLink to="/torrents?sorting=recent">Most Recent</NuxtLink></li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="ml-auto flex-none gap-2">
        <template v-if="user">
          <NuxtLink to="/upload" class="hidden md:flex btn btn-secondary">Upload Torrent</NuxtLink>
          <div class="dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <UserCircleIcon />
              </div>
            </label>
            <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <li><NuxtLink to="/admin/settings/general">Admin Settings</NuxtLink></li>
              <li><a @click="logoutUser()">Logout</a></li>
            </ul>
          </div>
        </template>
        <template v-else>
          <button @click="login" class="btn btn-primary">Login</button>
        </template>
      </div>
    </div>
    <template v-if="!mobileCollapsed">
      <div class="md:hidden items-center justify-between w-full">
        <div class="flex flex-row gap-2">
          <div class="form-control w-full">
            <input v-model="searchQuery"
                   name="search"
                   type="text"
                   class="input input-bordered"
                   :placeholder="`Search ${settings?.website_name ?? 'Torrust'}`"
                   @keyup.enter="submitSearch"
                   @focusin="typingInSearch = true"
                   @focusout="typingInSearch = false"
            />
          </div>
          <button class="btn btn-square btn-ghost" @click="submitSearch">
            <MagnifyingGlassIcon class="w-6" />
          </button>
        </div>
        <ul id="mobile-menu" class="flex flex-col gap-2 p-4 mt-4 font-medium bg-base-content/10 rounded-lg">
          <li>
            <NuxtLink to="/" class="block py-2 pl-3 pr-4 text-white rounded-lg">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/torrents" class="block py-2 pl-3 pr-4 text-white rounded-lg">Torrents</NuxtLink>
          </li>
        </ul>
        <template v-if="user">
          <NuxtLink to="/upload" class="mt-4 btn btn-secondary w-full">Upload Torrent</NuxtLink>
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
