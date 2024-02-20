<template>
  <div class="flex flex-col max-w-md gap-2 mx-auto">
    <div class="flex flex-col gap-2">
      <template v-for="tag in tags">
        <div class="flex justify-between p-2 rounded bg-base-100">
          <span class="text-base-content">{{ tag.name }}</span>
          <button class="text-error-content hover:text-error" @click="deleteTag(tag)">
            Delete
          </button>
        </div>
      </template>
    </div>
    <div class="flex gap-2">
      <input v-model="newTag" class="w-full input input-bordered" type="text">
      <button class="btn btn-primary" :class="{ 'loading': addingTag }" :disabled="addingTag || !newTag" @click="addTag">
        Add tag
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { type TorrentTag } from "torrust-index-types-lib";
import { notify } from "notiwind-ts";
import { getTags, useRestApi, useTags } from "#imports";

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
      .catch((err) => {
        notify({
          group: "error",
          title: "Error",
          text: `Trying to add the tag. ${err.message}.`
        }, 10000);
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
      })
      .catch((err) => {
        notify({
          group: "error",
          title: "Error",
          text: `Trying to delete the tag. ${err.message}.`
        }, 10000);
      });
  }
}
</script>
