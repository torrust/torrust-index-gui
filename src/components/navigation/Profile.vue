<template>
  <div class="relative inline-block text-left" v-click-outside="() => (dropdownOpened = false)">

    <button
        v-if="$store.getters.isLoggedIn"
        id="profile-button"
        class="px-6 h-10 inline-flex justify-center items-center self-start appearance-none bg-white hover:bg-gray-200 text-sm text-black font-medium rounded-2xl cursor-pointer duration-200"
        @click="dropdownOpened = !dropdownOpened"
    >
      <UserCircleIcon size="24" class="mr-3" />
      <span class="flex flex-nowrap whitespace-nowrap">{{ user.username }}</span>
      <ChevronDownIcon
          class="w-5 h-5 ml-2 -mr-1"
          aria-hidden="true"
      />
    </button>

    <button
        v-else
        id="sign-in-button"
        class="px-6 h-10 inline-flex justify-center items-center self-start appearance-none bg-white hover:bg-gray-200 text-sm text-black font-medium rounded-2xl cursor-pointer duration-200"
        @click="$store.dispatch('openAuthModal')"
    >
      <UserCircleIcon size="24" class="mr-3" />
      <span class="flex flex-nowrap whitespace-nowrap">Sign in</span>
    </button>

    <div
        id="dropdown-menu"
        class="origin-top-right absolute right-0 mt-4 z-10"
        :class="{hidden: !dropdownOpened}"
    >
      <div @click.prevent="() => (dropdownOpened = false)" class="w-48 divide-y divide-slate-100 bg-slate-800 rounded-2xl overflow-hidden drop-shadow-md">
        <ul class="px-2 py-2 text-sm text-slate-400 font-medium duration-200" aria-labelledby="dropdownDefault">
          <li v-if="$store.getters.isAdministrator">
            <router-link to="/settings/general" replace class="h-10 inline-flex items-center py-2 px-4 w-full hover:bg-slate-700 hover:text-white duration-200 rounded-2xl">
              <span class="flex flex-nowrap whitespace-nowrap">Settings</span>
            </router-link>
          </li>
          <li class="mt-1">
            <a
                @click="$store.dispatch('logout')"
                class="h-10 inline-flex items-center py-2 px-4 w-full hover:bg-red-600 hover:text-white text-left cursor-pointer duration-200 rounded-2xl"
            >Sign out</a>
          </li>
        </ul>
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
