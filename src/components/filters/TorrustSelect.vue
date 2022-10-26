<template>
  <div v-click-outside="() => (active = false)" class="flex flex-col grow relative overflow-visible" style="min-width: 128px;">
    <button
        @click="toggleDropdown"
        class="px-6 py-2 relative flex flex-row items-center flex-nowrap w-full max-w-xl bg-transparent text-slate-200 dark:text-dark-200 placeholder-slate-400 dark:placeholder-dark-400 font-medium border-2 border-slate-800 dark:border-dark-800 hover:border-slate-600 dark:hover:border-dark-600 focus:border-slate-400 dark:focus:border-dark-400 text-sm rounded-2xl outline-0 transition duration-200 origin-bottom"
    >
      <div class="mr-2 flex flex-col flex-nowrap text-left">
        <span v-if="label" class="text-xs text-slate-400 dark:text-dark-accent-600">{{ label }}</span>
        <div class="text-white flex flex-row flex-nowrap">
          <span v-if="selectedOptions.length === 0">None</span>
          <span v-else-if="selectedOptions.length > 1">Multiple</span>
          <span v-else>{{ selectedOptions[0].name }}</span>
        </div>
      </div>
      <ChevronDownIcon class="ml-auto text-white opacity-50" :class="{ 'rotate-180': active }" size="24" />
    </button>
    <!-- Dropdown menu -->
    <div v-if="active" class="z-50 mt-2 top-full absolute w-full">
      <ul class="px-2 py-2 bg-dark-800 text-sm rounded-2xl">
        <li class="flex w-full" v-for="(option, index) in options">
          <button @click="toggleOption(option)" class="px-4 py-3 flex w-full items-center hover:bg-white/5 text-dark-400 hover:text-dark-200 transition duration-200 rounded-2xl">
            <div class="font-semibold" :class="{ 'text-white': isSelectedOption(option) }">{{ option.name }}</div>
            <div v-if="multiple" class="ml-auto flex flex-col items-center">
              <span v-if="isSelectedOption(option)" class="relative inline-flex">
                <input type="checkbox" class="h-6 w-6 appearance-none bg-sky-500 dark:bg-dark-accent-600 border-2 border-sky-500 dark:border-dark-accent-600 rounded-md">
                <CheckIcon
                    class="absolute text-white"
                    size="20"
                    style="top: 50%;left: 50%;transform: translate(-50%, -50%);"
                />
              </span>
              <input v-else type="checkbox" class="h-6 w-6 appearance-none border-2 border-dark-600 rounded-md">
            </div>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ChevronDownIcon, CheckIcon } from "@vue-hero-icons/solid";

export default {
  name: "TorrustSelect",
  props: {
    options: Array,
    label: String,
    multiple: Boolean,
    update: Function
  },
  components: {ChevronDownIcon, CheckIcon},
  data: () => ({
    active: false,
    selectedOptions: []
  }),
  created() {
    if (!this.multiple) {
      this.toggleOption(this.options[0]);
    }
  },
  methods: {
    toggleDropdown() {
      this.active = !this.active;
    },
    isSelectedOption(option) {
      return this.selectedOptions.indexOf(option) > -1;
    },
    toggleOption(option) {
      if (this.multiple) {
        if (this.isSelectedOption(option)) {
          this.selectedOptions.splice(this.selectedOptions.indexOf(option), 1)
        } else {
          this.selectedOptions.push(option);
        }
        this.$emit('updated', this.selectedOptions);
      } else {
        this.selectedOptions = [option];
        this.active = false;
        this.$emit('updated', option);
      }
    }
  }
}
</script>

<style scoped>

</style>
