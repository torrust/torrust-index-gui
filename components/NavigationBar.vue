<template>
  <div class="flex flex-col sticky top-0 h-16 md:h-20 justify-center bg-primary/50 border-b border-secondary z-40 max-w-full" style="backdrop-filter: blur(20px);">
    <div class="px-4 md:px-8 flex flex-col w-full">

      <!-- MOBILE -->
      <div id="mobile-menu" class="flex md:hidden flex-row items-center max-w-full">
        <div id="open-mobile-search-bar-toggle" v-if="mobileState === MobileState.Navigate" class="px-3.5 h-10 mr-1 flex md:hidden flex-col justify-center items-center bg-white/5 border border-slate-600 rounded-2xl">
          <button class="flex flex-col" @click="mobileState = MobileState.Search">
            <MagnifyingGlassIcon size="18" class="text-slate-400" />
          </button>
        </div>
        <div id="tabs" class="flex flex-row">
          <div class="flex flex-col">
            <span
                id="explore"
                class="px-6 h-10 flex flex-row flex-nowrap items-center appearance-none text-lg text-slate-200 hover:text-white font-medium cursor-pointer duration-200"
                @mouseover="dropdownOpened = true"
                @mouseleave="dropdownOpened = false"
            >
              <span>Explore</span>
              <!--                <ChevronDownIcon size="18" class="ml-1"></ChevronDownIcon>-->
              <div
                  class="absolute -ml-4 pt-60 z-10"
                  :class="{hidden: !dropdownOpened}"
              >
                <div @click.prevent="dropdownOpened = false" class="w-48 divide-y bg-secondary rounded-2xl overflow-hidden drop-shadow">
                  <ul class="text-sm text-slate-400 font-medium duration-200" aria-labelledby="dropdownDefault">
                    <li class="p-4 w-full hover:bg-slate-700 hover:text-white duration-200">
                      <router-link to="/torrents/trending" replace class="inline-flex items-center">
                        <span class="flex flex-nowrap whitespace-nowrap">Trending Torrents</span>
                      </router-link>
                    </li>
                    <li class="p-4 w-full hover:bg-slate-700 hover:text-white duration-200">
                      <router-link to="/torrents/popular" replace class="inline-flex items-center">
                        <span class="flex flex-nowrap whitespace-nowrap">Most Popular Torrents</span>
                      </router-link>
                    </li>
                    <li class="p-4 w-full hover:bg-slate-700 hover:text-white duration-200">
                      <router-link to="/torrents/recent" replace class="inline-flex items-center">
                        <span class="flex flex-nowrap whitespace-nowrap">Most Recent Torrents</span>
                      </router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </span>
          </div>
        </div>
        <div id="extra-options" v-if="mobileState === MobileState.Navigate" class="flex flex-row flex-1 ml-auto items-center justify-end">
          <NavigationBarProfileButton class="mr-3" />
          <router-link to="/upload" class="px-4 h-10 inline-flex flex-nowrap justify-center items-center self-start appearance-none bg-sky-500 hover:bg-sky-600 text-sm text-white font-medium rounded-2xl cursor-pointer duration-200">
            <ArrowUpTrayIcon size="24" />
          </router-link>
        </div>
        <div id="mobile-search-bar" v-if="mobileState === MobileState.Search" class="block md:hidden grow">
          <div class="flex flex-col mr-3">
            <div class="flex flex-col">
              <div class="px-3.5 bg-slate-800/60 text-sm border border-slate-600 focus:border-slate-400 rounded-2xl duration-200">
                <div class="flex flex-row items-center">
                  <div class="flex flex-col grow">
                    <input
                        @keyup.enter="submitSearch"
                        v-model="searchQuery"
                        name="search"
                        type="text"
                        class="h-12 bg-transparent outline-0 text-slate-200 text-sm font-medium placeholder-slate-400"
                        placeholder="Search by torrent, category or user"
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="close-mobile-search-bar-toggle" v-if="mobileState === MobileState.Search" class="px-4 h-12 flex md:hidden flex-col justify-center items-center bg-white/5 rounded-2xl">
          <button class="flex flex-col" @click="mobileState = MobileState.Navigate">
            <XMarkIcon size="18" class="text-slate-400" />
          </button>
        </div>
      </div>

      <!-- DESKTOP -->
      <div id="desktop-menu" class="hidden md:flex flex-row items-center max-w-full">
        <div id="left-menu" class="hidden md:flex flex-row justify-start">
          <div id="site-name" class="hidden md:flex flex-row">
            <div class="flex flex-col">
              <router-link class="block text-2xl text-themeText duration-200" to="/">
                <div class="flex flex-row flex-nowrap">
                  <span class="block w-full text-3xl font-semibold">{{ settings.website_name || "Torrust" }}</span>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div id="search-bar" class="ml-6 hidden md:block mx-5 grow max-w-md">
          <div class="flex flex-col">
            <div class="flex flex-col">
              <div class="px-3.5 bg-secondary/50 text-sm ring-2 ring-transparent hover:[&:not(:focus-within)]:ring-themeText/50 focus-within:ring-accent rounded-xl duration-200">
                <div class="flex flex-row items-center">
                  <div class="mr-3 flex flex-col">
                    <MagnifyingGlassIcon class="w-5 h-5 text-themeText" />
                  </div>
                  <div class="flex flex-col grow">
                    <input
                        @keyup.enter="submitSearch"
                        v-model="searchQuery"
                        name="search"
                        type="text"
                        class="h-10 bg-transparent outline-0 text-themeText font-medium placeholder-themeText/50"
                        placeholder="Search by torrent, category or user"
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="tabs" class="flex flex-row ml-3">
          <div class="flex flex-col">
            <span
                id="explore"
                class="h-10 flex flex-row flex-nowrap items-center text-themeText/50 hover:text-themeText cursor-pointer duration-200"
                @mouseover="dropdownOpened = true"
                @mouseleave="dropdownOpened = false"
            >
              <span class="font-semibold">Explore</span>
              <ChevronRightIcon class="ml-1 w-4 h-4 duration-200" :class="{ 'rotate-90': dropdownOpened }" />
              <div
                  class="absolute -ml-4 pt-32 z-10"
                  :class="{hidden: !dropdownOpened}"
              >
                <div @click.prevent="dropdownOpened = false" class="bg-secondary rounded-2xl drop-shadow-lg">
                  <ul class="p-3 text-sm text-themeText/50 font-medium duration-200" style="min-width: 256px;">
                    <li class="p-3 w-full hover:bg-tertiary hover:text-themeText rounded-2xl duration-200">
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
        <div id="extra-options" class="flex flex-row flex-1 ml-auto items-center justify-end">
          <NavigationBarProfileButton class="mr-3" />
          <router-link to="/upload" class="px-4 h-10 inline-flex flex-nowrap justify-center items-center bg-gradient-to-bl from-accent to-accent-dark hover:bg-tertiary text-sm text-themeText font-medium rounded-2xl cursor-pointer shadow-lg shadow-transparent hover:shadow-accent-dark/50 duration-1000">
            <ArrowUpTrayIcon class="mr-3 w-5 h-5 text-themeText/50" />
            <span class="flex flex-nowrap whitespace-nowrap">Upload</span>
          </router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {ArrowUpTrayIcon, XMarkIcon, ChevronRightIcon, MagnifyingGlassIcon} from "@heroicons/vue/24/solid"
import {ref} from "#imports";
import {Ref} from "@vue/reactivity";
import {useRoute, useRouter} from "#app";
import {useSettings} from "~/store/settings";

const router = useRouter();
const route = useRoute();
const settings = useSettings();

enum MobileState {
  Search,
  Navigate
}

const mobileState: Ref<MobileState> = ref(MobileState.Navigate);
const searchQuery: Ref<string> = ref("");
const dropdownOpened: Ref<boolean> = ref(false);

function submitSearch() {
  router.push({
    path: "/torrents",
    query: {
      search: searchQuery.value ?? null
    }
  });
}
</script>

<style scoped>
img {
  image-rendering: crisp-edges;
}
</style>
