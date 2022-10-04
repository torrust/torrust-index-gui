<template>
  <div class="flex flex-col sticky top-0 h-16 md:h-20 justify-center bg-slate-900/90 border-b lg:border-0 border-slate-800/50 z-50 max-w-full" style="backdrop-filter: blur(20px);">
    <div class="px-4 md:px-8 flex flex-col w-full">

      <!-- MOBILE -->
      <div id="mobile-menu" class="flex md:hidden flex-row items-center max-w-full">
        <div id="open-mobile-search-bar-toggle" v-if="mobileState === MobileStates.Navigate" class="px-3.5 h-10 mr-1 flex md:hidden flex-col justify-center items-center bg-white/5 border border-slate-600 rounded-2xl">
          <button class="flex flex-col" @click="mobileState = MobileStates.Search">
            <SearchIcon size="18" class="text-slate-400" />
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
                  <div @click.prevent="dropdownOpened = false" class="w-48 divide-y divide-slate-100 bg-slate-800 rounded-2xl overflow-hidden drop-shadow">
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
        <div id="extra-options" v-if="mobileState === MobileStates.Navigate" class="flex flex-row flex-1 ml-auto items-center justify-end">
          <Profile class="mr-3" />
          <router-link to="/upload" class="px-4 h-10 inline-flex flex-nowrap justify-center items-center self-start appearance-none bg-sky-500 hover:bg-sky-600 text-sm text-white font-medium rounded-2xl cursor-pointer duration-200">
            <UploadIcon size="24" />
          </router-link>
        </div>
        <div id="mobile-search-bar" v-if="mobileState === MobileStates.Search" class="block md:hidden grow">
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
        <div id="close-mobile-search-bar-toggle" v-if="mobileState === MobileStates.Search" class="px-4 h-12 flex md:hidden flex-col justify-center items-center bg-white/5 rounded-2xl">
          <button class="flex flex-col" @click="mobileState = MobileStates.Navigate">
            <XIcon size="18" class="text-slate-400" />
          </button>
        </div>
      </div>

      <!-- DESKTOP -->
      <div id="desktop-menu" class="hidden md:flex flex-row items-center max-w-full">
        <div id="left-menu" class="hidden md:flex flex-row flex-1 justify-start">
          <div id="site-name" class="hidden md:flex flex-row">
            <div class="flex flex-col">
              <router-link class="block text-2xl text-white duration-200" to="/">
                <div class="flex flex-row flex-nowrap">
                  <span class="block w-full text-3xl font-semibold">{{ $store.state.settings.website.name }}</span>
                </div>
              </router-link>
            </div>
          </div>
          <div id="tabs" class="flex flex-row ml-3">
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
                  <div @click.prevent="dropdownOpened = false" class="w-48 divide-y divide-slate-100 bg-slate-800 rounded-2xl overflow-hidden drop-shadow">
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
        </div>
        <div id="search-bar" class="hidden md:block mx-5 grow max-w-lg">
          <div class="flex flex-col">
            <div class="flex flex-col">
              <div class="px-3.5 bg-slate-800/60 text-sm border border-transparent hover:border-slate-600 focus:border-slate-400 rounded-2xl duration-200">
                <div class="flex flex-row items-center">
                  <div class="mr-3 flex flex-col">
                    <SearchIcon size="18" class="text-slate-400" />
                  </div>
                  <div class="flex flex-col grow">
                    <input
                        @keyup.enter="submitSearch"
                        v-model="searchQuery"
                        name="search"
                        type="text"
                        class="h-12 bg-transparent outline-0 text-slate-200 font-medium placeholder-slate-400"
                        placeholder="Search by torrent, category or user"
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="extra-options" class="flex flex-row flex-1 ml-auto items-center justify-end">
          <Profile class="mr-3" />
          <router-link to="/upload" class="px-4 h-10 inline-flex flex-nowrap justify-center items-center self-start appearance-none bg-sky-500 hover:bg-sky-600 text-sm text-white font-medium rounded-2xl cursor-pointer duration-200">
            <UploadIcon size="18" class="mr-3" />
            <span class="flex flex-nowrap whitespace-nowrap">Upload torrent</span>
          </router-link>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Profile from "./Profile.vue";
import Logo from "../Logo.vue";
import Breadcrumb from "../Breadcrumb.vue";
import Sidebar from "./Sidebar.vue";
import { SearchIcon, UploadIcon, XIcon, ChevronDownIcon } from "@vue-hero-icons/outline"

export default {
  name: 'Navbar',
  components: {Sidebar, Breadcrumb, Profile, Logo, SearchIcon, UploadIcon, XIcon, ChevronDownIcon},
  computed: {
    ...mapState({})
  },
  data: () => ({
    MobileStates: Object.freeze({
      Search: 0,
      Navigate: 1,
    }),
    mobileState: 1,
    searchQuery: '',
    dropdownOpened: false,
  }),
  methods: {
    submitSearch() {
      if (this.searchQuery) {
        this.$router.push(`/torrents?search=${this.searchQuery}`)
      }
    },
  }
}
</script>

<style scoped>
img {
  image-rendering: crisp-edges;
}
</style>
