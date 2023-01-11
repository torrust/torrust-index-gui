<template>
  <div
    class="max-w-lg flex flex-col grow relative overflow-visible"
    style="min-width: 16rem;"
  >
    <button
      class="group px-4 h-14 relative flex flex-row items-center flex-nowrap w-full max-w-xl bg-secondary hover:bg-accent/20 font-bold rounded-2xl duration-200 origin-bottom"
      @click="toggleDropdown"
    >
      <div class="mr-4 flex flex-col flex-nowrap text-left capitalize">
        <span v-if="label" class="font-medium text-xs text-accent">{{ label }}</span>
        <div class="text-sm text-themeText flex flex-row flex-nowrap">
          <span v-if="selectedOptions.length === 0">None</span>
          <span v-else-if="selectedOptions.length > 1">Multiple</span>
          <span v-else>{{ selectedOptions[0].name }}</span>
        </div>
      </div>
      <ChevronDownIcon class="ml-auto w-5 text-themeText group-hover:text-themeText duration-200" :class="{ 'rotate-180': active }" />
    </button>

    <!-- Dropdown menu -->
    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <template v-if="active">
        <div class="z-50 mt-2 top-full absolute w-full drop-shadow">
          <ul class="px-3 py-3 bg-secondary text-sm rounded-2xl">
            <li v-for="(option) in options" class="flex w-full">
              <button class="group px-3 py-3 flex w-full items-center hover:bg-tertiary/50 capitalize rounded-2xl duration-200" @click="toggleOption(option)">
                <div class="font-bold text-themeText">
                  {{ option.name }}
                </div>
                <div v-if="multiple" class="ml-auto flex flex-col items-center">
                  <span v-if="isSelectedOption(option)" class="relative inline-flex">
                    <input type="checkbox" class="h-6 w-6 appearance-none bg-accent border-2 border-accent rounded-md">
                    <CheckIcon
                      class="absolute text-themeText w-5"
                      style="top: 50%;left: 50%;transform: translate(-50%, -50%);"
                    />
                  </span>
                  <input v-else type="checkbox" class="h-6 w-6 appearance-none border-2 border-themeText/20 rounded-md duration-200">
                </div>
              </button>
            </li>
          </ul>
        </div>
      </template>
    </transition>
  </div>
</template>

<script>
import { CheckIcon, ChevronDownIcon } from "@heroicons/vue/20/solid";

export default {
  name: "TorrustSelect",
  components: { ChevronDownIcon, CheckIcon },
  props: {
    options: Array,
    label: String,
    multiple: Boolean,
    update: Function
  },
  emits: ["updated"],
  data: () => ({
    active: false,
    selectedOptions: []
  }),
  created () {
    if (!this.multiple) {
      this.toggleOption(this.options[0]);
    }
  },
  methods: {
    toggleDropdown () {
      this.active = !this.active;
    },
    isSelectedOption (option) {
      return this.selectedOptions.includes(option);
    },
    toggleOption (option) {
      if (this.multiple) {
        if (this.isSelectedOption(option)) {
          this.selectedOptions.splice(this.selectedOptions.indexOf(option), 1);
        } else {
          this.selectedOptions.push(option);
        }
        this.$emit("updated", this.selectedOptions);
      } else {
        this.selectedOptions = [option];
        this.active = false;
        this.$emit("updated", option);
      }
    }
  }
};
</script>

<style scoped>

</style>
