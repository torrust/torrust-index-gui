<template>
  <div
    class="flex flex-col sticky top-0 h-16 md:h-20 justify-center bg-primary/80 z-40"
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
                <div class="w-48 divide-y bg-secondary rounded-2xl overflow-hidden drop-shadow" @click.prevent="exploreDropdown = false">
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
              <router-link class="block text-2xl text-themeText duration-200" to="/">
                <div class="flex flex-row flex-nowrap">
                  <!-- Placeholder LOGO -->
                  <div class="mr-3 w-8 h-8 flex flex-col items-center justify-center bg-gradient-to-bl from-accent to-accent-dark rounded-md shrink-0">
                    <span class="font-bold text-2xl text-primary antialiased">T</span>
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
              <div class="px-3.5 text-sm bg-tertiary/25 ring-2 ring-transparent ring-transparent hover:[&:not(:focus-within)]:ring-themeText/10 focus-within:ring-themeText/25 rounded-xl duration-200">
                <div class="flex flex-row items-center group">
                  <div class="flex flex-col grow">
                    <input
                      v-model="searchQuery"
                      name="search"
                      type="text"
                      class="h-10 bg-transparent outline-0 text-themeText font-medium placeholder-themeText/40"
                      :placeholder="`Search ${settings?.website_name ?? 'Torrust'}`"
                      @keyup.enter="submitSearch"
                      @focusin="typingInSearch = true"
                      @focusout="typingInSearch = false"
                    >
                  </div>
                  <div class="p-1 flex flex-col bg-themeText/10 font-medium text-themeText/50 rounded-lg">
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
        <div id="tabs" class="flex flex-row ml-3">
          <div class="relative inline-block text-left">
            <div>
              <button
                class="font-bold text-themeText capitalize hover:text-themeText cursor-pointer"
                :class="{ 'text-themeText/60': !exploreDropdown }"
                @mouseover="exploreDropdown = true"
                @click="exploreDropdown = !exploreDropdown"
              >
                explore
              </button>
            </div>

            <transition
              enter-active-class="transition ease-out duration-200"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-100"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <template v-if="exploreDropdown">
                <div class="absolute -left-6 top-10 z-10 mt-2 w-56 bg-secondary rounded-2xl drop-shadow">
                  <ul class="p-3 text-themeText font-medium">
                    <NuxtLink to="/torrents" replace class="p-3 w-full inline-flex items-center hover:bg-tertiary/50 rounded-2xl duration-200">
                      <span class="flex flex-nowrap whitespace-nowrap">Browse all torrents</span>
                    </NuxtLink>
                  </ul>
                </div>
              </template>
            </transition>
          </div>
        </div>
        <div id="extra-options" class="flex flex-row flex-1 ml-auto items-center justify-end">
          <template v-if="user?.username">
            <div class="relative inline-block text-left mr-3">
              <div>
                <button
                  class="group px-2 h-10 flex flex-row flex-nowrap justify-center items-center font-bold text-sm text-themeText capitalize border-tertiary rounded-xl cursor-pointer duration-500"
                  :class="{ 'text-themeText/60': !userDropdown, 'border-tertiary/50': !userDropdown }"
                  @click="userDropdown = !userDropdown"
                  @mouseover="userDropdown = true"
                >
                  <UserCircleIcon
                    class="ml-1 mr-1.5 w-5 text-themeText/40"
                    aria-hidden="true"
                  />
                  <span>{{ user.username }}</span>
                </button>
              </div>

              <transition
                enter-active-class="transition ease-out duration-200"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-100"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <template v-if="userDropdown">
                  <div class="absolute right-0 top-10 z-10 mt-2 w-56 bg-secondary rounded-2xl drop-shadow">
                    <ul class="p-3 text-themeText font-medium">
                      <NuxtLink v-if="user?.admin" to="/admin/settings/general" class="p-3 w-full inline-flex items-center hover:bg-tertiary/50 rounded-2xl cursor-pointer duration-200">
                        <span class="flex flex-nowrap whitespace-nowrap">Settings</span>
                      </NuxtLink>
                      <li class="p-3 w-full inline-flex items-center hover:bg-tertiary/50 rounded-2xl cursor-pointer duration-200" @click="logoutUser()">
                        <span class="flex flex-nowrap whitespace-nowrap">Logout</span>
                      </li>
                    </ul>
                  </div>
                </template>
              </transition>
            </div>
            <NuxtLink to="/upload" class="px-4 h-10 inline-flex flex-nowrap justify-center items-center bg-secondary font-bold text-sm text-accent hover:bg-accent/20 capitalize rounded-xl cursor-pointer duration-500">
              <span class="flex flex-nowrap whitespace-nowrap">upload torrent</span>
            </NuxtLink>
          </template>
          <template v-else>
            <button class="px-4 h-10 inline-flex flex-nowrap justify-center items-center bg-secondary font-bold text-sm text-accent hover:bg-accent/20 capitalize rounded-xl cursor-pointer duration-500" @click="login()">
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
