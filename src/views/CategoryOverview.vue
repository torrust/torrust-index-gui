<template>
  <div>
    <h1 class="view-title text-white">Categories</h1>

    <div v-if="categories.length === 0" class="relative w-full text-center p-12 font-medium text-sm text-gray-700">
      Loading...
    </div>

<!--    :style="{background: 'linear-gradient(172deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(' + category.image + ') no-repeat center center'}"-->

    <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6">
      <router-link :to="`/categories/${urlSafe(category.name)}`"
                   v-for="(category, index) in categories"
                   :key="index"
                   class="category-tile bg-primary duration-300 transform scale-100 hover:bg-light"
      >
        <p class="capitalize font-semibold text-white text-xl">{{ category.name }}</p>
        <div class="details">
          <p class="pr-2 inline-flex text-gray-200 text-sm">
<!--            <HashtagIcon size="18" class="mr-0.5"/>-->
            {{ category.num_torrents }}
            Torrents
          </p>
<!--          <p class="pl-2 inline-flex text-gray-200 text-sm">-->
<!--            <DownloadIcon size="18" class="mr-0.5"/>-->
<!--            {{ category.totalDownloads }}-->
<!--          </p>-->
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
// import {HashtagIcon} from "@vue-hero-icons/outline"
import {mapState} from "vuex";

export default {
  name: "CategoryOverview",
  // components: {HashtagIcon},
  data: () => ({
    // categories: [
    //   {
    //     title: "Movies",
    //     image: "https://image.tmdb.org/t/p/w780//j28p5VwI5ieZnNwfeuZ5Ve3mPsn.jpg",
    //     numTorrents: 1250,
    //     totalDownloads: 743
    //   },
    //   {
    //     title: "TV Shows",
    //     image: "https://image.tmdb.org/t/p/w780//j28p5VwI5ieZnNwfeuZ5Ve3mPsn.jpg",
    //     numTorrents: 342,
    //     totalDownloads: 151
    //   },
    //   {
    //     title: "Games",
    //     image: "https://images.pushsquare.com/c1143ad56a9e2/cyberpunk-2077-reversible-cover.original.jpg",
    //     numTorrents: 602,
    //     totalDownloads: 12543
    //   },
    // ]
  }),
  computed: {
    ...mapState(['categories'])
  }
}
</script>

<style scoped>
.category-tile {
  @apply bg-cover !important;
  @apply w-full rounded-3xl shadow-lg text-center py-16 relative;
}

.details {
  @apply inline-flex;
}
</style>
