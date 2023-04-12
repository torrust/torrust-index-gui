<template>
  <div class="dropdown">
    <label tabindex="0" class="select select-bordered items-center" :class="{ 'h-[3.5rem]': !!label }">
      <div class="mr-1 flex flex-col flex-nowrap text-left capitalize">
        <span v-if="label" class="text-xs link-primary">{{ label }}</span>
        <div class="text-sm flex flex-row flex-nowrap">
          <span v-if="selectedOptions.length === 0">None</span>
          <span v-else-if="selectedOptions.length > 1">Multiple</span>
          <span v-else>{{ selectedOptions[0].name }}</span>
        </div>
      </div>
    </label>
    <div tabindex="0" class="mt-3 dropdown-content border border-base-content/20 p-2 shadow bg-base-100 rounded-lg min-w-[14rem]">
      <template v-if="props.search">
        <div class="px-3 py-3">
          <input
            v-model="searchText"
            class="input border-2 input-bordered rounded-2xl"
            placeholder="Search"
            @change="filterOptions()"
          >
        </div>
      </template>
      <template v-if="filteredOptions.length">
        <ul class="menu">
          <li
            v-for="(option) in filteredOptions"
            :key="option.value"
            class="text-base-content text-sm"
            @click="toggleOption(option)"
          >
            <div class="flex flex-row w-full rounded-lg">
              <div class="font-bold text-neutral-content">
                {{ option.name }}
              </div>
              <div v-if="multiple" class="ml-auto flex flex-col items-center">
                <span
                  v-if="isSelectedOption(option)"
                  class="relative inline-flex"
                >
                  <input
                    type="checkbox"
                    class="h-6 w-6 appearance-none bg-primary border-2 border-primary rounded-md"
                  >
                  <CheckIcon
                    class="absolute text-neutral-content w-5"
                    style="top: 50%;left: 50%;transform: translate(-50%, -50%);"
                  />
                </span>
                <input
                  v-else
                  type="checkbox"
                  class="h-6 w-6 appearance-none border-2 border-base-content/20 rounded-md duration-200"
                >
              </div>
            </div>
          </li>
        </ul>
      </template>
      <template v-else>
        <div class="px-6 py-3">
          <span class="text-neutral-content/50">No results..</span>
        </div>
      </template>
    </div>
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
