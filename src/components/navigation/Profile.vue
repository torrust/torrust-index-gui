<template>
  <div class="relative inline-block text-left" v-click-outside="() => (dropdownOpened = false)">
    <div class="flex items-center relative cursor-pointer" @click="dropdownOpened = !dropdownOpened">
      <UserIcon/>
      {{ user }}
    </div>

    <div :class="{hidden: !dropdownOpened}"
         class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white z-10 ring-1 ring-black ring-opacity-5"
         role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1"
    >
      <div class="py-1" role="none">
        <a href="#" class="block px-4 py-2 hover:bg-gray-100">Account</a>
        <a href="#" class="block px-4 py-2 hover:bg-gray-100">Settings</a>
        <button
            @click="$store.commit('logout')"
            class="block w-full text-left px-4 py-2 hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {UserIcon} from "@vue-hero-icons/outline";
import {mapState} from "vuex";

export default {
  name: "Profile",
  components: {UserIcon},
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
