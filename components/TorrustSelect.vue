<template>
  <div class="dropdown">
    <label tabindex="0" class="select select-bordered items-center" :class="{ 'h-[3.5rem]': !!label }">
      <div class="mr-1 flex flex-col flex-nowrap text-left capitalize">
        <span v-if="label" class="text-xs link-primary">{{ label }}</span>
        <div class="text-sm flex flex-row flex-nowrap">
          <span v-if="props.selected.length === 0">None</span>
          <span v-else-if="props.selected.length > 1">Multiple</span>
          <span v-else>{{ getOptionNameByValue(props.selected[0]) }}</span>
        </div>
      </div>
    </label>
    <div tabindex="0" class="mt-3 flex flex-col gap-2 dropdown-content border border-base-content/20 p-2 shadow bg-base-100 rounded-lg min-w-[14rem]">
      <template v-if="props.search">
        <div class="">
          <input
            v-model="searchText"
            class="input border-2 placeholder-base-content text-sm input-bordered rounded-2xl"
            placeholder="Search"
          >
        </div>
      </template>
      <template v-if="filteredOptions().length > 0">
        <ul class="menu">
          <li
            v-for="(option) in filteredOptions()"
            :key="option.value"
            class="text-base-content text-sm"
            @click="toggleOption(option)"
          >
            <div class="flex flex-row w-full rounded-lg">
              <div class="font-bold text-neutral-content">
                {{ option.name }}
              </div>
              <div v-if="props.multiple" class="ml-auto flex flex-col items-center">
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
      <template v-if="props.selected.length > 1">
        <button @click="emit('update:selected', [])" class="p-2 bg-primary/10 text-primary text-sm w-full rounded-lg">Clear all</button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, PropType, defineProps, defineEmits } from "vue";
import { CheckIcon, ChevronDownIcon } from "@heroicons/vue/20/solid";
import { onMounted } from "../.nuxt/imports";

export interface TorrustSelectOption {
  name: string;
  value: string;
}

const props = defineProps({
  options: {
    type: Array as PropType<Array<TorrustSelectOption>>,
    required: true
  },
  label: {
    type: String,
    default: ""
  },
  search: {
    type: Boolean,
    default: false
  },
  selected: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  multiple: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["update:selected"]);

const active = ref(false);
const searchText = ref("");

function isSelectedOption (option: TorrustSelectOption) {
  return props.selected.includes(option.value);
}

function getOptionNameByValue (value: string): string {
  let name: string;

  props.options.forEach((option) => {
    if (option.value === value) {
      name = option.name;
    }
  });

  return name;
}

function toggleOption (option: TorrustSelectOption) {
  let value: string[] = [];

  if (props.multiple) {
    if (isSelectedOption(option)) {
      value = props.selected.filter(item => item !== option.value);
    } else {
      value = props.selected.concat([option.value]);
    }
  } else {
    active.value = false;
    value = [option.value];
  }

  console.log(value);

  emit("update:selected", value);
}

function filteredOptions () {
  let filteredOptions = Array.from(props.options);

  if (searchText.value !== "") {
    filteredOptions = filteredOptions.filter(option => option.name.toLowerCase().includes(searchText.value.toLowerCase()));
  }

  return filteredOptions;
}
</script>

<style scoped>

</style>
