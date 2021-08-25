<template>
  <div class="relative inline-block text-left" v-click-outside="() => (dropdownOpened = false)">
    <div class="flex items-center relative hidden lg:inline-block">
      <img src="@/assets/heineken.png" class="w-12 h-12 rounded-full" @click="dropdownOpened = !dropdownOpened">
    </div>

    <div :class="{hidden: !dropdownOpened}"
         class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
         role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1"
    >
      <div class="py-1" role="none">
        <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
        <a href="#" class="block px-4 py-2 rounded-lg">Account</a>
        <a href="#" class="block px-4 py-2 rounded-lg">Settings</a>
        <a href="#" class="block px-4 py-2 rounded-lg">Logout</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  data: () => ({
    dropdownOpened: false,
  })
}
</script>

<style scoped>

</style>