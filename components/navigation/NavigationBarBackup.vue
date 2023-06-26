<template>
  <div
    class="sticky top-0 z-40 flex flex-col justify-center h-16 md:h-20 bg-base-100/80"
    style="backdrop-filter: blur(20px);"
    @mouseleave="closeDropdowns()"
  >
    <div class="flex flex-col w-full">
      <!-- MOBILE -->
      <div id="mobile-menu" class="flex flex-row items-center max-w-full md:hidden">
        <div v-if="mobileState === MobileState.Navigate" id="open-mobile-search-bar-toggle" class="px-3.5 h-10 mr-1 flex md:hidden flex-col justify-center items-center bg-white/5 border border-slate-600 rounded-2xl">
          <button class="flex flex-col" @click="mobileState = MobileState.Search">
            <MagnifyingGlassIcon size="18" class="text-slate-400" />
          </button>
        </div>
        <div id="tabs" class="flex flex-row">
          <div class="flex flex-col">
            <span
              id="explore"
              class="flex flex-row items-center h-10 px-6 text-lg font-medium duration-200 appearance-none cursor-pointer flex-nowrap text-slate-200 hover:text-white"
              @mouseover="exploreDropdown = true"
              @mouseleave="exploreDropdown = false"
            >
              <span>Explore</span>
              <!--                <ChevronDownIcon size="18" class="ml-1"></ChevronDownIcon>-->
              <div
                class="absolute z-10 -ml-4 pt-60"
                :class="{hidden: !exploreDropdown}"
              >
                <div class="w-48 overflow-hidden divide-y bg-base-200 rounded-2xl drop-shadow" @click.prevent="exploreDropdown = false">
                  <ul class="text-sm font-medium duration-200 text-slate-400" aria-labelledby="dropdownDefault">
                    <li class="w-full p-4 duration-200 hover:bg-slate-700 hover:text-white">
                      <router-link to="/torrents" replace class="inline-flex items-center">
                        <span class="flex flex-nowrap whitespace-nowrap">Torrents</span>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </span>
          </div>
        </div>
        <div v-if="mobileState === MobileState.Navigate" id="extra-options" class="flex flex-row items-center justify-end flex-1 ml-auto">
          <router-link to="/upload" class="inline-flex items-center self-start justify-center h-10 px-4 text-sm font-medium text-white duration-200 appearance-none cursor-pointer flex-nowrap bg-sky-500 hover:bg-sky-600 rounded-2xl">
            <ArrowUpTrayIcon size="24" />
          </router-link>
        </div>
        <div v-if="mobileState === MobileState.Search" id="mobile-search-bar" class="block md:hidden grow">
          <div class="flex flex-col mr-3">
            <div class="flex flex-col">
              <div class="px-3.5 bg-slate-800/60 text-sm border border-slate-600 focus:border-slate-400 rounded-2xl duration-200">
                <div class="flex flex-row items-center">
                  <div class="flex flex-col grow">
                    <input
                      v-model="searchQuery"
                      name="search"
                      type="text"
                      class="h-12 text-sm font-medium bg-transparent outline-0 text-slate-200 placeholder-slate-400"
                      placeholder="Search by torrent, category or user"
                      @keyup.enter="submitSearch"
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="mobileState === MobileState.Search" id="close-mobile-search-bar-toggle" class="flex flex-col items-center justify-center h-12 px-4 md:hidden bg-white/5 rounded-2xl">
          <button class="flex flex-col" @click="mobileState = MobileState.Navigate">
            <XMarkIcon size="18" class="text-slate-400" />
          </button>
        </div>
      </div>

      <!-- DESKTOP -->
      <div id="desktop-menu" class="flex-row items-center hidden md:flex">
        <div id="left-menu" class="flex-row justify-start hidden md:flex">
          <div id="site-name" class="flex-row hidden md:flex">
            <div class="flex flex-col">
              <router-link class="block text-2xl duration-200 text-neutral-content" to="/">
                <div class="flex flex-row flex-nowrap">
                  <!-- Placeholder LOGO -->
                  <div class="flex flex-col items-center justify-center w-8 h-8 mr-3 rounded-md bg-gradient-to-bl from-primary to-primary-focus shrink-0">
                    <span class="text-2xl antialiased font-bold text-base-100">T</span>
                  </div>
                  <span class="block w-full text-2xl font-semibold">{{ settings?.website_name || "Torrust" }}</span>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div id="search-bar" class="hidden max-w-sm mx-5 ml-6 md:block grow">
          <div class="flex flex-col">
            <div class="flex flex-col">
              <div class="px-3.5 text-sm bg-base-200 ring-2 ring-base-content/25 hover:[&:not(:focus-within)]:ring-primary/50 focus-within:ring-primary rounded-xl duration-200">
                <div class="flex flex-row items-center group">
                  <div class="flex flex-col grow">
                    <input
                      v-model="searchQuery"
                      name="search"
                      type="text"
                      class="h-10 font-medium bg-transparent outline-0 text-neutral-content placeholder-neutral-content/40"
                      :placeholder="`Search ${settings?.website_name ?? 'Torrust'}`"
                      @keyup.enter="submitSearch"
                      @focusin="typingInSearch = true"
                      @focusout="typingInSearch = false"
                    >
                  </div>
                  <div class="flex flex-col p-1 font-medium rounded-lg bg-neutral-content/10 text-neutral-content/50">
                    <template v-if="typingInSearch">
                      <span class="px-1 text-xs">enter</span>
                    </template>
                    <template v-else>
                      <MagnifyingGlassIcon class="w-4" />
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul class="px-1 menu menu-horizontal">
          <li tabindex="0">
            <a>
              Explore
            </a>
            <ul class="p-2 shadow-2xl bg-base-100">
              <li>
                <NuxtLink to="/torrents" replace>
                  Popular
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
        <div id="extra-options" class="flex flex-row items-center justify-end flex-1 gap-3 ml-auto">
          <template v-if="user?.username">
            <NuxtLink to="/upload" class="inline-flex items-center justify-center btn btn-sm btn-primary flex-nowrap">
              <span class="flex flex-nowrap whitespace-nowrap">upload torrent</span>
            </NuxtLink>
            <div class="dropdown dropdown-end">
              <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                  <UserCircleIcon />
                </div>
              </label>
              <ul tabindex="0" class="p-2 mt-3 menu menu-compact dropdown-content drop-shadow-2xl bg-base-100 rounded-box w-52">
                <li v-if="user?.admin">
                  <NuxtLink to="/admin/settings/backend">
                    Settings
                  </NuxtLink>
                </li>
                <li>
                  <a @click="logoutUser()">Logout</a>
                </li>
              </ul>
            </div>
          </template>
          <template v-else>
            <button class="inline-flex items-center justify-center h-10 px-4 text-sm font-bold capitalize duration-500 cursor-pointer flex-nowrap bg-base-200 text-primary hover:bg-primary/20 rounded-xl" @click="login()">
              <span class="flex flex-nowrap whitespace-nowrap">login</span>
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowUpTrayIcon, UserCircleIcon, XMarkIcon, MagnifyingGlassIcon } from "@heroicons/vue/20/solid";
import { Ref } from "vue";
import { useRouter } from "#app";
import { ref, useAuthenticationModal, useSettings, useUser, logoutUser } from "#imports";

const router = useRouter();
const settings = useSettings();
const user = useUser();
const authModalOpen = useAuthenticationModal();

enum MobileState {
  Search,
  Navigate
}

const mobileState: Ref<MobileState> = ref(MobileState.Navigate);
const searchQuery: Ref<string> = ref("");
const exploreDropdown: Ref<boolean> = ref(false);
const userDropdown: Ref<boolean> = ref(false);
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

function closeDropdowns () {
  exploreDropdown.value = false;
  userDropdown.value = false;
}
</script>

<style scoped>
img {
  image-rendering: crisp-edges;
}
</style>
