<template>
  <div class="sticky lg:static top-0 z-40 bg-white relative">
    <div class="w-full h-20 px-6 flex items-center justify-between shadow-lg lg:shadow-none">
      <!-- left navbar -->
      <div class="flex">

        <!-- mobile hamburger -->
        <div class="inline-block lg:hidden flex items-center mr-4">
          <button class="hover:text-black hover:border-white focus:outline-none navbar-burger" @click="toggleSidebar()">
            <svg class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
            </svg>
          </button>
        </div>

        <!-- search bar -->
        <div class="relative mr-2">
          <input type="search" name="search" placeholder="Search Torrents.."
                 class="bg-gray-100 text-black h-10 w-full xl:w-64 px-5 rounded-lg text-sm focus:outline-none">
        </div>

        <button class="px-4 bg-primary-500 text-white rounded-lg" type="submit">
          Search
        </button>
      </div>

      <!-- right navbar -->
      <div v-if="loggedIn" class="flex justify-between items-center space-x-4">
        <router-link to="/upload" class="button leading-10">
          Upload torrent
        </router-link>
        <Profile />
      </div>

      <button v-else class="button" @click="$store.dispatch('openAuthModal')">
        Sign in
      </button>

    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import Profile from "./Profile";

export default {
  name: 'Navbar',
  components: {Profile},
  computed: {
    ...mapState({
      loggedIn: state => state.auth.loggedIn
    })
  },
  methods: {
    toggleSidebar() {
      this.$store.dispatch('toggleSidebar')
    }
  }
}
</script>

<style scoped>
img {
  image-rendering: crisp-edges;
}

.button {
  @apply h-10 px-4 bg-primary-500 text-white rounded-lg;
}
</style>
