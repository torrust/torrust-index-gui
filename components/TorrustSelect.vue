<template>
  <div
    class="max-w-lg flex flex-col grow relative overflow-visible"
    style="min-width: 16rem;"
  >
    <div
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
    </div>

    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="active"
        class="mt-2 top-full absolute w-full bg-secondary drop-shadow rounded-2xl"
      >
        <template v-if="props.search">
          <div class="px-3 py-3">
            <input
              v-model="searchText"
              class="block w-full px-4 py-2 bg-transparent placeholder-themeText/50 text-themeText rounded-2xl focus:outline-none border-2 border-tertiary"
              placeholder="Search"
              @change="filterOptions()"
            >
          </div>
        </template>
        <template v-if="filteredOptions.length">
          <ul class="max-h-64 overflow-auto px-3 py-3">
            <li
              v-for="(option) in filteredOptions"
              :key="option.value"
              class="flex w-full"
            >
              <button
                class="group px-3 py-3 flex w-full items-center hover:bg-tertiary/50 capitalize rounded-2xl duration-200"
                @click="toggleOption(option)"
              >
                <div class="font-bold text-themeText">
                  {{ option.name }}
                </div>
                <div v-if="multiple" class="ml-auto flex flex-col items-center">
                  <span
                    v-if="isSelectedOption(option)"
                    class="relative inline-flex"
                  >
                    <input
                      type="checkbox"
                      class="h-6 w-6 appearance-none bg-accent border-2 border-accent rounded-md"
                    >
                    <CheckIcon
                      class="absolute text-themeText w-5"
                      style="top: 50%;left: 50%;transform: translate(-50%, -50%);"
                    />
                  </span>
                  <input
                    v-else
                    type="checkbox"
                    class="h-6 w-6 appearance-none border-2 border-themeText/20 rounded-md duration-200"
                  >
                </div>
              </button>
            </li>
          </ul>
        </template>
        <template v-else>
          <div class="px-6 py-3">
            <span class="text-themeText/50">No search results..</span>
          </div>
        </template>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { CheckIcon, ChevronDownIcon } from "@heroicons/vue/20/solid";
import { onMounted } from "../.nuxt/imports";

const props = defineProps({
  options: Array,
  label: String,
  multiple: Boolean,
  search: Boolean
});

const emit = defineEmits(["updated"]);

const active = ref(false);
const selectedOptions = ref([]);
const filteredOptions = ref([]);
const searchText = ref("");

onMounted(() => {
  filteredOptions.value = props.options;
});

if (!props.multiple) {
  toggleOption(props.options[0]);
}

function toggleDropdown () {
  active.value = !active.value;
}

function isSelectedOption (option) {
  return selectedOptions.value.includes(option);
}

function toggleOption (option) {
  if (props.multiple) {
    if (isSelectedOption(option)) {
      selectedOptions.value.splice(selectedOptions.value.indexOf(option), 1);
    } else {
      selectedOptions.value.push(option);
    }
    emit("updated", selectedOptions.value);
  } else {
    selectedOptions.value = [option];
    active.value = false;
    emit("updated", option);
  }
}

function filterOptions () {
  if (searchText.value === "") {
    filteredOptions.value = props.options;
  } else {
    filteredOptions.value = props.options.filter(option =>
      option.name.toLowerCase().includes(searchText.value.toLowerCase())
    );
  }
}

watch(searchText, filterOptions);
</script>

<style scoped>

</style>
