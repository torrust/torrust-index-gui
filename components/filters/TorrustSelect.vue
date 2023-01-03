<template>
  <div
      class="flex flex-col grow relative overflow-visible" style="min-width: 128px;"
  >
    <button
        @click="toggleDropdown"
        class="group px-4 py-2.5 relative flex flex-row items-center flex-nowrap w-full max-w-xl bg-secondary font-medium text-sm rounded-2xl duration-200 origin-bottom"
    >
      <div class="mr-4 flex flex-col flex-nowrap text-left">
        <span v-if="label" class="text-xs text-accent">{{ label }}</span>
        <div class="text-themeText flex flex-row flex-nowrap">
          <span v-if="selectedOptions.length === 0">None</span>
          <span v-else-if="selectedOptions.length > 1">Multiple</span>
          <span v-else>{{ selectedOptions[0].name }}</span>
        </div>
      </div>
      <ChevronDownIcon class="ml-auto w-4 text-themeText/50 group-hover:text-themeText duration-200" :class="{ 'rotate-180': active }" />
    </button>

    <!-- Dropdown menu -->
    <div v-if="active" class="z-50 mt-2 top-full absolute w-full drop-shadow-lg">
      <ul class="px-3 py-3 bg-secondary text-sm rounded-2xl">
        <li class="flex w-full" v-for="(option, index) in options">
          <button @click="toggleOption(option)" class="group px-3 py-3 flex w-full items-center hover:bg-tertiary transition rounded-2xl">
            <div class="font-semibold text-themeText/50 group-hover:text-themeText duration-200" :class="{ 'text-themeText': isSelectedOption(option) }">{{ option.name }}</div>
            <div v-if="multiple" class="ml-auto flex flex-col items-center">
              <span v-if="isSelectedOption(option)" class="relative inline-flex">
                <input type="checkbox" class="h-6 w-6 appearance-none bg-accent border-2 border-accent rounded-md">
                <CheckIcon
                    class="absolute text-themeText w-5"
                    style="top: 50%;left: 50%;transform: translate(-50%, -50%);"
                />
              </span>
              <input v-else type="checkbox" class="h-6 w-6 appearance-none border-2 border-themeText/50 group-hover:border-themeText rounded-md duration-200">
            </div>
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ChevronDownIcon } from "@heroicons/vue/24/solid";
import { CheckIcon } from "@heroicons/vue/20/solid";

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
