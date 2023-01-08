<template>
  <div class="relative inline-block text-left">
    <span
        v-if="user?.username"
        id="profile-button"
        class="px-4 h-10 inline-flex justify-center items-center appearance-none bg-gradient-to-bl from-tertiary to-secondary hover:bg-tertiary text-sm text-themeText/50 hover:text-themeText text-sm text-themeText font-medium rounded-2xl cursor-pointer duration-200"
        @click="dropdownOpened = !dropdownOpened"
        @mouseleave="dropdownOpened = false"
    >
      <UserCircleIcon class="w-5 mr-2 opacity-50" />
      <span class="flex flex-nowrap whitespace-nowrap">{{ user.username }}</span>
      <ChevronDownIcon
          class="w-5 ml-1 opacity-50"
          aria-hidden="true"
      />
      <div
          class="absolute pt-48 z-10"
          :class="{hidden: !dropdownOpened}"
      >
        <div @click.prevent="dropdownOpened = false" class="w-48 divide-y bg-secondary rounded-2xl overflow-hidden drop-shadow-lg">
          <ul class="text-sm text-themeText/50 font-medium duration-200">
            <li class="p-4 w-full hover:bg-tertiary hover:text-themeText duration-200">
              <router-link to="/admin/settings/general" replace class="inline-flex items-center">
                <span class="flex flex-nowrap whitespace-nowrap">Settings</span>
              </router-link>
            </li>
            <li class="p-4 w-full hover:bg-tertiary hover:text-themeText duration-200">
              <a @click="logoutUser()" class="inline-flex items-center">
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
        @click="login"
    >
      <UserCircleIcon class="mr-3 w-5 h-5 text-themeText/50" />
      <span class="flex flex-nowrap whitespace-nowrap">Sign in</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import {ChevronDownIcon, UserCircleIcon} from "@heroicons/vue/20/solid";
import {ref, useAuthenticationModal, useUser, logoutUser} from "#imports";
import {Ref} from "@vue/reactivity";

const authModalOpen = useAuthenticationModal();
const user = useUser();

const dropdownOpened: Ref<boolean> = ref(false);

function login() {
  authModalOpen.value = true;
}
</script>

<style scoped>

</style>
