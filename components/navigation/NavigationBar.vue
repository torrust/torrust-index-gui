<template>
  <div class="flex flex-col px-4 md:pb-0 md:px-8 lg:px-24 bg-base-200">
    <div class="gap-2 p-0 navbar">
      <button class="flex md:hidden btn btn-square btn-ghost" @click="mobileCollapsed = !mobileCollapsed">
        <Bars3Icon class="w-8" />
      </button>
      <NuxtLink to="/" class="flex flex-row text-xl normal-case btn btn-ghost">
        <span>{{ settings?.website_name || "Torrust" }}</span>
      </NuxtLink>
      <div class="hidden form-control md:flex">
        <input
          v-model="searchQuery"
          name="search"
          type="text"
          class="border-2 input input-bordered rounded-2xl placeholder-neutral-content"
          :placeholder="`Search ${settings?.website_name ?? 'Torrust'}`"
          @keyup.enter="submitSearch"
          @focusin="typingInSearch = true"
          @focusout="typingInSearch = false"
        >
      </div>
      <div class="hidden px-2 dropdown dropdown-hover md:inline-block text-base-content/75 hover:text-base-content">
        <div tabindex="0" class="px-1">
          <NuxtLink to="/torrents" class="flex">
            Torrents
            <ChevronDownIcon class="w-5 ml-2" />
          </NuxtLink>
        </div>
        <ul tabindex="0" class="p-2 rounded shadow menu dropdown-content bg-base-100 w-52">
          <li><NuxtLink to="/torrents?sorting=LeechersDesc">
            Most Popular
          </NuxtLink></li>
          <li><NuxtLink to="/torrents?sorting=UploadedDesc">
            Most Recent
          </NuxtLink></li>
        </ul>
      </div>
      <div class="flex-none gap-2 ml-auto">
        <template v-if="user">
          <NuxtLink to="/upload" class="hidden md:flex btn bg-base-100 rounded-2xl">
            Upload Torrent
          </NuxtLink>
          <div data-cy="user-menu" class="dropdown dropdown-end z-[1]">
            <div tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                <UserCircleIcon />
              </div>
            </div>
            <ul tabindex="0" class="p-2 mt-3 shadow menu dropdown-content bg-base-100 rounded-box w-52">
              <li v-if="user.admin" data-cy="admin-settings-link"><NuxtLink to="/admin/settings/backend">
                Admin Settings
              </NuxtLink></li>
              <li><a data-cy="logout-link" @click="logoutUser()">Logout {{ user.username }}</a></li>
            </ul>
          </div>
        </template>
        <template v-else>
          <NuxtLink to="/signin">
            Sign In
          </NuxtLink>
          <NuxtLink to="/signup">
            Sign Up
          </NuxtLink>
        </template>
        <div>
          <label class="swap swap-rotate">
            <!-- this hidden checkbox controls the state -->
            <input type="checkbox" class="theme-controller" value="torrustlight" @click="changeTheme">
            <!-- moon icon -->
            <svg class="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
            <!-- sun icon -->
            <svg class="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
          </label>
        </div>
      </div>
    </div>
    <template v-if="!mobileCollapsed">
      <div class="items-center justify-between w-full py-4 md:hidden">
        <div class="flex flex-row gap-2">
          <div class="w-full form-control">
            <input
              v-model="searchQuery"
              name="search"
              type="text"
              class="border-2 input input-bordered"
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
        <ul id="mobile-menu" class="flex flex-col gap-2 p-4 mt-4 font-medium rounded-lg bg-base-content/10">
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
          <NuxtLink to="/upload" class="w-full mt-4 btn btn-secondary">
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
import { ref, useSettings, useUser, logoutUser } from "#imports";

const settings = useSettings();
const user = useUser();

const mobileCollapsed = ref(true);
const searchQuery: Ref<string> = ref("");
const typingInSearch = ref(false);

function submitSearch () {
  navigateTo({
    path: "/torrents",
    query: {
      search: searchQuery.value ?? null
    }
  });
}

function changeTheme () {
  useColorMode().preference = "torrust";
}

</script>

<style scoped>
#mobile-menu a.router-link-exact-active {
  @apply bg-primary;
}
</style>
