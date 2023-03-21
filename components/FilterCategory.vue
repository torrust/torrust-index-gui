<template>
  <div v-click-outside="() => (dropdownOpened = false)" class="relative inline-block text-left">
    <button class="filter relative" @click="dropdownOpened = !dropdownOpened">
      <AdjustmentsHorizontalIcon size="16" class="mr-1 opacity-50" />
      Categories
    </button>
    <div class="origin-top-left absolute left-0 mt-2 z-10" :class="{hidden: !dropdownOpened}">
      <div class="py-2 px-2 w-48 flex flex-col bg-slate-800 text-sm rounded-md shadow-lg">
        <ul v-if="$route.name === 'Browse Torrents'" id="category-filters" class="">
          <li
            v-for="category in categories"
            :key="category.name"
            class="cursor-pointer text-slate-400 hover:text-white"
            @click="selectFilter(category.name)"
          >
            <span class="">{{ titleCase(category.name) }} ({{ category.num_torrents }})</span>
            <input type="checkbox" class="" :checked="filterActive(category.name)">
          </li>
          <li v-if="categoryFilters.length > 0">
            <button class="py-1.5 w-full rounded-md bg-red-500 bg-opacity-10 text-red-400 transition duration-200 hover:text-red-500" @click="clearFilters">
              Clear filters
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { AdjustmentsHorizontalIcon } from "@heroicons/vue/24/solid";
import { mapState } from "vuex";

export default {
  name: "FilterCategory",
  components: { AdjustmentsHorizontalIcon },
  data: () => ({
    dropdownOpened: false
  }),
  computed: {
    ...mapState({
      user: state => state.auth.user,
      categories: state => state.categories,
      categoryFilters: state => state.categoryFilters
    })
  },
  methods: {
    filterActive (category) {
      return this.categoryFilters.includes(category);
    },
    selectFilter (category) {
      const filters = this.categoryFilters;
      if (filters.includes(category)) {
        filters.splice(filters.indexOf(category), 1);
      } else {
        filters.push(category);
      }
      this.$store.commit("setCategoryFilters", filters);
    },
    clearFilters () {
      this.$store.commit("setCategoryFilters", []);
    }
  }
};
</script>

<style scoped>
.filter {
  @apply px-3 py-1.5 text-slate-400 text-sm border border-slate-800 rounded-md flex items-center relative cursor-pointer transition duration-200 hover:text-slate-200 hover:border-slate-200;
}

.regular-checkbox {
  @apply text-sky-400;
  -webkit-appearance: none;
  background-color: rgba(0, 0, 0, .1);
  border: none;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05), inset 0px -15px 10px -12px rgba(0,0,0,0.05);
  padding: 9px;
  border-radius: 3px;
  display: inline-block;
  position: relative;
}

#category-filters li {
  @apply px-2 py-1 flex flex-row justify-between;
}

#category-filters li input {
  @apply text-left
}
</style>
