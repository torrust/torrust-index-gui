<template>
  <div class="overflow-x-auto">
    <ul class="flex flex-row border-b-2 border-slate-600">
      <li v-for="(tab) in tabs">
        <router-link
            :to="tab.path"
            class="inline-flex py-2 px-6 font-medium text-center text-slate-400 hover:text-slate-200 border-b-2 border-transparent duration-200"
            style="margin-bottom: -2px;"
            :class="{ 'active': $route.path === tab.path }"
        >
          {{ tab.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props: {
    tabs: {
      type: Array,
      required: true,
      default: () => [{name: "example1", path: "/settings"}, {name: "example2", path: "/inactive"}],
    },
  }
}
</script>

<style scoped>
.active {
  @apply text-slate-200 border-slate-200;
}
</style>
