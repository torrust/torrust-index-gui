<template>
  <div class="sticky lg:static top-0 z-40">
    <div class="w-full h-20 px-6 flex items-center justify-between shadow-lg lg:shadow-none">

      <!-- left navbar -->
      <div class="flex">

        <!-- mobile hamburger -->
        <div class="inline-block lg:hidden flex items-center mr-4">
          <button class="hover:text-black hover:border-white focus:outline-none navbar-burger" @click="toggleSidebar()">
            <svg class="h-5 w-5 text-gray-500" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
          </button>
        </div>

        <!-- search bar -->
        <div class="relative mr-2">
          <input type="search" name="search" placeholder="Search Torrents.." class="bg-gray-100 text-black h-10 w-full xl:w-64 px-5 rounded-lg text-sm focus:outline-none">
        </div>

        <button class="px-4 bg-black text-white rounded-lg" type="submit">
          Search
        </button>
      </div>

      <!-- right navbar -->
      <div class="flex items-center relative hidden lg:inline-block">
        <img src="@/assets/heineken.png" class="w-12 h-12 rounded-full" @click="dropDownOpen = !dropDownOpen">
      </div>

    </div>

    <!-- dropdown menu -->
    <div class="absolute shadow-xl border-8 rounded-lg w-48 bottom-10 right-0 mr-6" :class="dropDownOpen ? '' : 'hidden'">
      <a href="#" class="block px-4 py-2 rounded-lg">Account</a>
      <a href="#" class="block px-4 py-2 rounded-lg">Settings</a>
      <a href="#" class="block px-4 py-2 rounded-lg">Logout</a>
    </div>
    <!-- dropdown menu end -->

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Navbar',
    computed: {
        ...mapState(['sideBarOpen'])
    },
    data() {
        return {
            dropDownOpen: false
        }
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
  image-rendering: -moz-crisp-edges;         /* Firefox */
  image-rendering:   -o-crisp-edges;         /* Opera */
  image-rendering: -webkit-optimize-contrast;/* Webkit (non-standard naming) */
  image-rendering: crisp-edges;
  -ms-interpolation-mode: nearest-neighbor;  /* IE (non-standard property) */
}
</style>
