<template>
  <div class="relative inline-block text-left" v-click-outside="() => (dropdownOpened = false)">

    <button v-if="$store.getters.isLoggedIn" class="px-6 h-10 inline-flex justify-center items-center self-start appearance-none bg-white hover:bg-gray-200 text-sm text-black font-medium rounded-md cursor-pointer duration-200" @click="dropdownOpened = !dropdownOpened">
      <UserCircleIcon size="24" class="mr-3" />
      <span>{{ user.username }}</span>
      <ChevronDownIcon
          class="w-5 h-5 ml-2 -mr-1"
          aria-hidden="true"
      />
    </button>

    <button v-else class="px-6 h-10 inline-flex justify-center items-center self-start appearance-none bg-white hover:bg-gray-200 text-sm text-black font-medium rounded-md cursor-pointer duration-200" @click="$store.dispatch('openAuthModal')">
      <UserCircleIcon size="24" class="mr-3" />
      <span>Sign in</span>
    </button>

    <div class="origin-top-right absolute right-0 mt-2 z-10" :class="{hidden: !dropdownOpened}">
      <div @click.prevent="() => (dropdownOpened = false)" class="py-2 px-2 w-48 flex flex-col bg-slate-800 text-sm rounded-md shadow-lg">
        <router-link v-if="$store.getters.isAdministrator" to="/settings" replace class="py-1.5 text-center text-slate-100 border border-transparent rounded-md transition duration-200 hover:bg-slate-700 hover:border-slate-700">
          <span>Settings</span>
        </router-link>
        <hr class="my-2 border-slate-700" />
        <button @click="$store.dispatch('logout')" class="py-1.5 bg-red-500 bg-opacity-10 text-red-400 border border-transparent rounded-md transition duration-200 hover:text-red-500">Sign out</button>
      </div>
    </div>

  </div>
</template>

<script>
import { ChevronDownIcon, UserCircleIcon } from '@vue-hero-icons/solid'
import {mapState} from "vuex";

export default {
  name: "Profile",
  components: {ChevronDownIcon, UserCircleIcon},
  data: () => ({
    dropdownOpened: false,
  }),
  computed: {
    ...mapState({
      user: state => state.auth.user,
    })
  }
}
</script>

<style scoped>

</style>
