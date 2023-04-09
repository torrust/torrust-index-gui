<template>
  <div
    class="flex flex-col sticky top-0 h-16 md:h-20 justify-center bg-base-100/80 z-40"
    style="backdrop-filter: blur(20px);"
    @mouseleave="closeDropdowns()"
  >
    <div class="flex flex-col w-full">
      <!-- MOBILE -->
      <div id="mobile-menu" class="flex md:hidden flex-row items-center max-w-full">
        <div v-if="mobileState === MobileState.Navigate" id="open-mobile-search-bar-toggle" class="px-3.5 h-10 mr-1 flex md:hidden flex-col justify-center items-center bg-white/5 border border-slate-600 rounded-2xl">
          <button class="flex flex-col" @click="mobileState = MobileState.Search">
            <MagnifyingGlassIcon size="18" class="text-slate-400" />
          </button>
        </div>
        <div id="tabs" class="flex flex-row">
          <div class="flex flex-col">
            <span
              id="explore"
              class="px-6 h-10 flex flex-row flex-nowrap items-center appearance-none text-lg text-slate-200 hover:text-white font-medium cursor-pointer duration-200"
              @mouseover="exploreDropdown = true"
              @mouseleave="exploreDropdown = false"
            >
              <span>Explore</span>
              <!--                <ChevronDownIcon size="18" class="ml-1"></ChevronDownIcon>-->
              <div
                class="absolute -ml-4 pt-60 z-10"
                :class="{hidden: !exploreDropdown}"
              >
                <div class="w-48 divide-y bg-base-200 rounded-2xl overflow-hidden drop-shadow" @click.prevent="exploreDropdown = false">
                  <ul class="text-sm text-slate-400 font-medium duration-200" aria-labelledby="dropdownDefault">
                    <li class="p-4 w-full hover:bg-slate-700 hover:text-white duration-200">
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
        <div v-if="mobileState === MobileState.Navigate" id="extra-options" class="flex flex-row flex-1 ml-auto items-center justify-end">
          <router-link to="/upload" class="px-4 h-10 inline-flex flex-nowrap justify-center items-center self-start appearance-none bg-sky-500 hover:bg-sky-600 text-sm text-white font-medium rounded-2xl cursor-pointer duration-200">
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
                      class="h-12 bg-transparent outline-0 text-slate-200 text-sm font-medium placeholder-slate-400"
                      placeholder="Search by torrent, category or user"
                      @keyup.enter="submitSearch"
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="mobileState === MobileState.Search" id="close-mobile-search-bar-toggle" class="px-4 h-12 flex md:hidden flex-col justify-center items-center bg-white/5 rounded-2xl">
          <button class="flex flex-col" @click="mobileState = MobileState.Navigate">
            <XMarkIcon size="18" class="text-slate-400" />
          </button>
        </div>
      </div>

      <!-- DESKTOP -->
      <div id="desktop-menu" class="hidden md:flex flex-row items-center">
        <div id="left-menu" class="hidden md:flex flex-row justify-start">
          <div id="site-name" class="hidden md:flex flex-row">
            <div class="flex flex-col">
              <router-link class="block text-2xl text-neutral-content duration-200" to="/">
                <div class="flex flex-row flex-nowrap">
                  <!-- Placeholder LOGO -->
                  <div class="mr-3 w-8 h-8 flex flex-col items-center justify-center bg-gradient-to-bl from-primary to-primary-focus rounded-md shrink-0">
                    <span class="font-bold text-2xl text-base-100 antialiased">T</span>
                  </div>
                  <span class="block w-full text-2xl font-semibold">{{ settings?.website_name || "Torrust" }}</span>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div id="search-bar" class="ml-6 hidden md:block mx-5 grow max-w-sm">
          <div class="flex flex-col">
            <div class="flex flex-col">
              <div class="px-3.5 text-sm bg-base-200 ring-2 ring-base-content/25 hover:[&:not(:focus-within)]:ring-primary/50 focus-within:ring-primary rounded-xl duration-200">
                <div class="flex flex-row items-center group">
                  <div class="flex flex-col grow">
                    <input
                      v-model="searchQuery"
                      name="search"
                      type="text"
                      class="h-10 bg-transparent outline-0 text-neutral-content font-medium placeholder-neutral-content/40"
                      :placeholder="`Search ${settings?.website_name ?? 'Torrust'}`"
                      @keyup.enter="submitSearch"
                      @focusin="typingInSearch = true"
                      @focusout="typingInSearch = false"
                    >
                  </div>
                  <div class="p-1 flex flex-col bg-neutral-content/10 font-medium text-neutral-content/50 rounded-lg">
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
        <ul class="menu menu-horizontal px-1">
          <li tabindex="0">
            <a>
              Explore
            </a>
            <ul class="p-2 bg-base-100 shadow-2xl">
              <li>
                <NuxtLink to="/torrents" replace>
                  Browse all torrents
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
        <div id="extra-options" class="flex flex-row flex-1 ml-auto items-center justify-end gap-3">
          <template v-if="user?.username">
            <NuxtLink to="/upload" class="btn btn-sm btn-primary inline-flex flex-nowrap justify-center items-center">
              <span class="flex flex-nowrap whitespace-nowrap">upload torrent</span>
            </NuxtLink>
            <div class="dropdown dropdown-end">
              <label tabindex="0" class="btn btn-ghost btn-circle avatar">
                <div class="w-10 rounded-full">
                  <UserCircleIcon />
                </div>
              </label>
              <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 drop-shadow-2xl bg-base-100 rounded-box w-52">
                <li v-if="user?.admin">
                  <NuxtLink to="/admin/settings/general">
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
            <button class="px-4 h-10 inline-flex flex-nowrap justify-center items-center bg-base-200 font-bold text-sm text-primary hover:bg-primary/20 capitalize rounded-xl cursor-pointer duration-500" @click="login()">
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
