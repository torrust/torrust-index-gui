<template>
  <div class="mx-auto flex flex-col gap-2 max-w-md">
    <div class="flex flex-col gap-2">
      <template v-for="tag in tags">
        <div class="p-2 flex justify-between bg-base-100 rounded">
          <span class="text-base-content">{{ tag.name }}</span>
          <button class="text-error-content hover:text-error" @click="deleteTag(tag)">
            Delete
          </button>
        </div>
      </template>
    </div>
    <div class="flex gap-2">
      <input v-model="newTag" class="input input-bordered w-full" type="text">
      <button class="btn btn-primary" :class="{ 'loading': addingTag }" :disabled="addingTag || !newTag" @click="addTag">
        Add tag
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { computed, getTags, useRestApi, useTags } from "#imports";
import { TorrentTag } from "~/torrust-index-types-lib";

const tags = useTags();
const rest = useRestApi().value;

const newTag = ref("");
const addingTag = ref(false);

function addTag () {
  if (newTag.value) {
    addingTag.value = true;

    rest.tag.addTag(newTag.value)
      .then(() => {
        getTags();
      })
      .finally(() => {
        addingTag.value = false;
      });
  }
}

function deleteTag (tag: TorrentTag) {
  if (confirm(`Are you sure you want to delete ${tag.name}?`)) {
    rest.tag.deleteTag(tag.tag_id)
      .then(() => {
        getTags();
      });
  }
}
</script>
