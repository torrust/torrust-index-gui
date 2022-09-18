<template>
  <nav class="lg:text-sm lg:leading-6 relative">

    <!-- items -->
    <ul class="mt-24">
      <li class="nav">
        <button @click="goTo('/torrents/popular')" :class="{ 'active': $route.params.sorting === 'popular' }">
          <FireIcon class="h-5 w-5 opacity-50" />
          <span class="ml-2">Most Popular</span>
        </button>
      </li>
      <li class="nav">
        <button @click="goTo('/torrents/recent')" :class="{ 'active': $route.params.sorting === 'recent' }">
          <ClockIcon class="h-5 w-5 opacity-50" />
          <span class="ml-2">Most Recent</span>
        </button>
      </li>
      <li class="mt-6">
        <h3 class="py-2 text-slate-400 font-semibold">Categories</h3>
        <ul>
          <li v-for="category in categories">
            <button @click="selectCategory(category.name)" :class="{ 'active': $route.name === 'Browse Torrents' && categoryFilters.indexOf(category.name) > -1 }">
              <span>{{ titleCase(category.name.toString()) }}</span>
              <span class="ml-auto">{{ category.num_torrents }}</span>
            </button>
          </li>
        </ul>
      </li>
    </ul>

  </nav>
</template>

<script>
import { mapState } from 'vuex'
import HttpService from '@/common/http-service';
import { ClockIcon, FireIcon } from "@vue-hero-icons/outline"

export default {
  name: 'Sidebar',
  components: {ClockIcon, FireIcon},
  created() {
    HttpService.get('/category', (res) => {
      const categories = res.data.data;
      this.$store.commit('setCategories', categories);
    }).catch(() => {
    });
  },
  computed: {
    ...mapState(['sideBarOpen', 'categories', 'categoryFilters'])
  },
  data: () => ({
    searchQuery: '',
    filters: []
  }),
  methods: {
    submitSearch() {
      if (this.searchQuery) {
        this.$router.push(`/torrents?search=${this.searchQuery}`)
      }
    },
    selectCategory(category) {
      this.$store.commit('setCategoryFilters', [category]);
      if (this.$route.name !== 'Browse Torrents') {
        this.$router.push(`/torrents`)
      } else if (this.$route.params.sorting) {
        this.$router.replace(`/torrents`)
      }
    },
    goTo(url) {
      this.$store.commit('setCategoryFilters', []);
      if (this.$route.path !== url) {
        this.$router.push(url)
      }
    }
  },
}
</script>

<style scoped>
button {
  @apply px-3 py-1.5 mb-2 w-full flex text-slate-400 border border-slate-800 rounded-md hover:text-white items-center lg:text-sm lg:leading-6;
}

button.active {
  @apply bg-sky-500 text-white;
}
</style>
