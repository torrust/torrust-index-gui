<template>
  <div class="relative inline-block text-left" v-click-outside="() => (dropdownOpened = false)">
    <span
        v-if="isUserLoggedIn()"
        id="profile-button"
        class="px-4 h-10 inline-flex justify-center items-center self-start appearance-none bg-slate-800 hover:bg-slate-700 dark:bg-white/5 dark:hover:bg-white/10 text-sm text-white font-medium rounded-2xl cursor-pointer duration-200"
        @click="dropdownOpened = !dropdownOpened"
        @mouseleave="dropdownOpened = false"
    >
      <UserCircleIcon size="24" class="mr-3" />
      <span class="flex flex-nowrap whitespace-nowrap">{{ user.username }}</span>
      <ChevronDownIcon
          class="w-5 h-5 ml-2 -mr-1 opacity-50"
          aria-hidden="true"
      />
      <div
          class="absolute pt-60 z-10"
          :class="{hidden: !dropdownOpened}"
      >
        <div @click.prevent="dropdownOpened = false" class="w-48 divide-y divide-slate-100 bg-slate-800 dark:bg-dark-800 rounded-2xl overflow-hidden drop-shadow">
          <ul class="text-sm text-slate-400 dark:text-dark-400 font-medium duration-200" aria-labelledby="dropdownDefault">
            <li class="p-4 w-full hover:bg-slate-700 dark:hover:bg-dark-700 hover:text-white duration-200">
              <router-link :to="`/profile/${user.username}`" replace class="inline-flex items-center">
                <span class="flex flex-nowrap whitespace-nowrap">My Profile</span>
              </router-link>
            </li>
            <li class="p-4 w-full hover:bg-slate-700 dark:hover:bg-dark-700 hover:text-white duration-200">
              <router-link to="/settings/general" replace class="inline-flex items-center">
                <span class="flex flex-nowrap whitespace-nowrap">Settings</span>
              </router-link>
            </li>
            <li class="p-4 w-full hover:bg-red-700 dark:hover:bg-dark-700 hover:text-white duration-200">
              <a @click="$store.dispatch('logout')" class="inline-flex items-center">
                <span class="flex flex-nowrap whitespace-nowrap">Sign Out</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </span>

    <button
        v-else
        id="sign-in-button"
        class="px-4 h-10 inline-flex justify-center items-center self-start appearance-none bg-gradient-to-bl from-tertiary to-secondary hover:bg-tertiary text-sm text-themeText/50 hover:text-themeText font-medium rounded-2xl shadow-lg shadow-transparent hover:shadow-secondary/50 cursor-pointer duration-1000"
        @click="$store.dispatch('openAuthModal')"
    >
      <UserCircleIcon class="mr-3 w-5 h-5 text-themeText/50" />
      <span class="flex flex-nowrap whitespace-nowrap">Sign in</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import {ChevronDownIcon, UserCircleIcon} from "@heroicons/vue/20/solid";
import {ref} from "#imports";
import {Ref} from "@vue/reactivity";
import {isUserLoggedIn, useUser} from "~/store/user";

const user = useUser();

const dropdownOpened: Ref<boolean> = ref(false);
</script>

<style scoped>

</style>
