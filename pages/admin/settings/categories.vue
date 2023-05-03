<template>
  <div class="mx-auto flex flex-col gap-2 max-w-md">
    <div class="flex flex-col gap-2">
      <template v-for="category in categories">
        <div class="p-2 flex justify-between bg-base-100 rounded">
          <span class="text-base-content">{{ category.name }} ({{ category.num_torrents }})</span>
          <button class="text-error-content hover:text-error" @click="deleteCategory(category.name)">
            Delete
          </button>
        </div>
      </template>
    </div>
    <div class="flex gap-2">
      <input v-model="newCategory" class="input input-bordered w-full" type="text">
      <button class="btn btn-primary" :class="{ 'loading': addingCategory }" :disabled="addingCategory || !newCategory" @click="addCategory">
        Add category
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { getCategories, useCategories, useRestApi } from "#imports";

const categories = useCategories();
const rest = useRestApi().value;

const newCategory = ref("");
const addingCategory = ref(false);

function addCategory () {
  if (newCategory.value) {
    addingCategory.value = true;

    rest.category.addCategory(newCategory.value)
      .then(() => {
        getCategories();
      })
      .finally(() => {
        addingCategory.value = false;
      });
  }
}

function deleteCategory (category: string) {
  if (confirm(`Are you sure you want to delete ${category}?`)) {
    rest.category.deleteCategory(category)
      .then(() => {
        getCategories();
      });
  }
}
</script>
