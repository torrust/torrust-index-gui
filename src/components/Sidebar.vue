<template>
  <div class="w-2/3 md:w-1/3 lg:w-64 fixed md:top-0 md:left-0 h-screen lg:block z-30 bg-white" :class="sideBarOpen ? '' : 'hidden'" id="main-nav">

    <div class="w-full h-20 flex px-4 items-center">
      <p class="font-semibold text-xl mx-auto">Torrust</p>
    </div>

    <div class="mt-6 px-4">
      <router-link to="/home" class="w-full flex items-center h-10 pl-4 rounded-lg cursor-pointer" exact-active-class="bg-gray-100">
        <span>Recent Torrents</span>
      </router-link>
      <template v-for="(category, index) in categories">
        <router-link :key="index" :to="'/' + category" class="mt-2 w-full flex items-center h-10 pl-4 rounded-lg cursor-pointer" exact-active-class="bg-gray-100">
          <span>{{ category }}</span>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Sidebar',
  data: () => ({
    categories: [
        "Movies",
        "TV Shows",
        "Games"
    ]
  }),
  computed: {
    ...mapState(['sideBarOpen'])
  }
}
</script>

<style scoped>

</style>
