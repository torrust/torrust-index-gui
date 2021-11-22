<template>
  <div class="mt-20 lg:mt-0 w-2/3 md:w-1/3 lg:w-64 fixed md:top-0 md:left-0 h-screen lg:block bg-white z-0" :class="{ 'hidden': !sideBarOpen }" id="main-nav">

    <div class="w-full h-20 flex px-4 items-center">
      <a class="text-white font-semibold text-xl mx-auto" href="/">Torrust</a>
    </div>

    <!-- search bar -->
    <div class="px-4 flex md:hidden flex-col">
      <input v-model="searchQuery" type="search" name="search" placeholder="Search Torrents.."
             class="bg-gray-100 text-black h-10 w-full xl:w-64 px-5 rounded-lg text-sm focus:outline-none">
      <button @click="submitSearch" class="mt-2 py-2 bg-primary-400 text-white rounded-lg" type="submit">
        Search
      </button>
    </div>

    <div class="mt-6 px-4 text-gray-300">
      <router-link :to="'/categories'" class="mt-2 w-full flex justify-center items-center h-10 rounded-lg cursor-pointer" exact-active-class="text-white bg-secondary">
        <span>Categories</span>
      </router-link>
      <router-link :to="`/categories/popular`" class="mt-2 w-full flex items-center h-10 pl-4 rounded-lg cursor-pointer" exact-active-class="text-white bg-secondary">
        <span>Most Popular</span>
      </router-link>
      <router-link :to="`/categories/recent`" class="mt-2 w-full flex items-center h-10 pl-4 rounded-lg cursor-pointer" exact-active-class="text-white bg-secondary">
        <span>Most Recent</span>
      </router-link>
      <template v-for="(category, index) in categories">
        <router-link :key="index" :to="`/categories/${urlSafe(category.name)}`" class="mt-2 w-full flex items-center h-10 pl-4 rounded-lg cursor-pointer" exact-active-class="text-white bg-secondary">
          <span>{{ titleCase(category.name) }} ({{ category.num_torrents }})</span>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import HttpService from '@/common/http-service';

export default {
  name: 'Sidebar',
  created() {
    HttpService.get('/category/', (res) => {
      const categories = res.data.data;
      this.$store.commit('setCategories', categories);
    }).catch(() => {
    });
  },
  computed: {
    ...mapState(['sideBarOpen', 'categories'])
  },
  data: () => ({
    searchQuery: ''
  }),
  methods: {
    submitSearch() {
      if (this.searchQuery) {
        this.$router.push(`/search?query=${this.searchQuery}`)
      }
    },
  }
}
</script>

<style scoped>

</style>
