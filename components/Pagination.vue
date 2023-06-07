<template>
  <div class="py-6 flex items-center justify-between">
    <div class="flex-1 flex flex-col md:flex-row items-center sm:justify-between justify-end gap-3">
      <div class="flex items-center gap-3">
        <div>
          <select :value="pageSize" class="px-2 py-1 bg-base-100" @change="(e) => updatePageSize(parseInt(e.target.value, 10))">
            <option value="20">
              20
            </option>
            <option value="50">
              50
            </option>
            <option value="100">
              100
            </option>
          </select>
        </div>
        <div>
          <p class="text-sm text-base-content/50">
            Showing
            <span class="font-medium">{{ (currentPage * pageSize) - pageSize + 1}}</span>
            to
            <span class="font-medium">{{ Math.min(currentPage * pageSize, totalResults) }}</span>
            of
            <span class="font-medium">{{ totalResults }}</span>
            results
          </p>
        </div>
      </div>
      <div>
        <nav class="relative z-0 inline-flex -space-x-px" aria-label="Pagination">
          <a
            class="page-button rounded-l-lg"
            @click="goToFirstPage"
          >
            <span class="sr-only">Previous</span>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
          <button
            class="page-button"
            @click="goToPrevPage"
          >
            <span class="sr-only">Previous</span>
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <!--show all page buttons-->
          <template v-if="totalPages() < 7">
            <button
              v-for="i in totalPages()"
              :key="i"
              :disabled="i === currentPage"
              class="page-button"
              @click="goToPage(i)"
            >
              {{ i }}
            </button>
          </template>

          <template v-else-if="currentPage <= 4">
            <button
              v-for="i in 5"
              :key="i"
              :disabled="i === currentPage"
              class="page-button"
              @click="goToPage(i)"
            >
              {{ i }}
            </button>
            <span
              v-if="totalPages()> 7"
              class="page-button"
            >
              ...
            </span>
          </template>

          <template v-else-if="currentPage > totalPages() - 4">
            <span
              v-if="totalPages()> 7"
              class="page-button"
            >
              ...
            </span>
            <button
              v-for="i in 5"
              :key="totalPages() - 5 + i"
              :disabled="totalPages() - 5 + i === currentPage"
              class="page-button"
              @click="goToPage(totalPages() - 5 + i)"
            >
              {{ totalPages() - 5 + i }}
            </button>
          </template>

          <template v-else>
            <span class="page-button">
              ...
            </span>
            <button
              v-for="i in 2"
              :key="currentPage - 3 + i"
              class="page-button"
              @click="goToPage(currentPage - 3 + i)"
            >
              {{ currentPage - 3 + i }}
            </button>
            <button
              disabled
              class="page-button"
            >
              {{ currentPage }}
            </button>
            <button
              v-for="i in 2"
              :key="currentPage + i"
              class="page-button"
              @click="goToPage(currentPage + i)"
            >
              {{ currentPage + i }}
            </button>
            <span class="page-button">
              ...
            </span>
          </template>

          <button
            class="page-button"
            @click="goToNextPage()"
          >
            <span class="sr-only">Next</span>
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <button
            class="page-button rounded-r-lg"
            @click="goToLastPage"
          >
            <span class="sr-only">Next</span>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fill-rule="evenodd"
                d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
              <path
                fill-rule="evenodd"
                d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1,
    required: true
  },
  pageSize: {
    type: Number,
    default: 20,
    required: true
  },
  totalResults: {
    type: Number,
    default: 0,
    required: true
  }
});

const emit = defineEmits(["update:currentPage", "update:pageSize"]);

function goToFirstPage () {
  goToPage(1);
}

function goToLastPage () {
  goToPage(totalPages());
}

function goToPrevPage () {
  goToPage(props.currentPage - 1);
}

function goToNextPage () {
  goToPage(props.currentPage + 1);
}

function goToPage (pageNum: number) {
  if (pageNum > totalPages() || pageNum < 1) {
    return;
  }

  console.log(pageNum);

  emit("update:currentPage", pageNum);
}

function updatePageSize (pageSize: number) {
  emit("update:pageSize", pageSize);
}

function totalPages () {
  return Math.ceil(props.totalResults / props.pageSize);
}
</script>

<style scoped>

.page-button {
  @apply relative inline-flex items-center px-4 py-2 text-sm font-medium text-base-content/50 hover:text-base-content outline-none;
}

.page-button[disabled] {
  @apply text-primary;
}
</style>
