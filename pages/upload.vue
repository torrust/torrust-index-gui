<template>
  <div class="flex flex-col items-center w-full">
    <h2 class="text-2xl font-semibold text-neutral-content">
      Upload Torrent
    </h2>
    <div class="flex flex-col w-full max-w-xl gap-6">
      <div>
        <label for="title" class="px-2">Title</label>
        <input
          id="title"
          v-model="form.title"
          name="title"
          type="text"
          data-cy="upload-form-title"
          class="mt-1"
        >
      </div>
      <div>
        <label for="description" class="px-2">Description</label>
        <div class="my-2 border tabs tabs-boxed w-fit border-base-content/20">
          <button class="tab" :class="{ 'tab-active': descriptionView === 'edit' }" @click="descriptionView = 'edit'">
            Edit
          </button>
          <button class="tab" :class="{ 'tab-active': descriptionView === 'preview' }" @click="descriptionView = 'preview'">
            Preview
          </button>
        </div>
        <template v-if="descriptionView === 'edit'">
          <textarea
            id="description"
            v-model="form.description"
            name="description"
            data-cy="upload-form-description"
            rows="8"
            class="mt-1"
          />
        </template>
        <template v-else>
          <div class="mt-1 p-6 h-[16rem] border-2 border-base-content/20 rounded-2xl overflow-y-auto">
            <Markdown :source="form.description" />
          </div>
        </template>
      </div>
      <template v-if="categories?.length > 0">
        <div>
          <label for="category" class="px-2">Category</label>
          <select id="category" v-model="form.category" data-cy="upload-form-category" class="mt-1">
            <template v-for="option in categories">
              <option :value="option.name">
                {{ option.name }}
              </option>
            </template>
          </select>
        </div>
      </template>
      <template v-if="tags?.length > 0">
        <div>
          <label for="tags" class="px-2">Tags</label>
          <TorrustSelect
            v-model:selected="form.tags"
            :options="tags.map(entry => ({ name: entry.name, value: entry.tag_id }))"
            :multiple="true"
            search
          />
        </div>
      </template>
      <div>
        <UploadFile sub-title="Only .torrent files allowed. BitTorrent v2 files are NOT supported." accept=".torrent" @on-change="setFile" />
      </div>
      <template v-if="user?.username">
        <TorrustButton
          label="submit"
          data-cy="upload-form-submit"
          :disabled="!formValid() || uploading"
          @click="submitForm"
        />
      </template>
      <template v-else>
        <div class="relative flex justify-center text-sm">
          <NuxtLink to="/signin">
            Please sign in to upload
          </NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
/* __placeholder__ */
import type { Ref } from "vue";
import { notify } from "notiwind-ts";
import type { TorrentTag } from "torrust-index-types-lib";
import {
  getCategories,
  getTags,
  navigateTo,
  onMounted,
  ref, toRaw,
  useRestApi,
  useTags,
  useUser
} from "#imports";
import { useCategories } from "~/composables/states";

type FormUploadTorrent = {
  title: string;
  category: string;
  description: string;
  tags: Array<number>;
  torrentFile: any;
}

const categories = useCategories();
const tags = useTags();
const user = useUser();
const rest = useRestApi();

const uploading: Ref<boolean> = ref(false);
const descriptionView = ref("edit");
const form: Ref<FormUploadTorrent> = ref({
  title: "",
  description: "",
  category: "",
  tags: [],
  torrentFile: ""
});

onMounted(() => {
  getCategories();
  getTags();
});

function formValid () {
  return form.value.title && form.value.category && form.value.torrentFile;
}

function setTags (e: any) {
  form.value.tags = toRaw(e).map((tag: TorrentTag) => {
    return tag.tag_id;
  });
}

function setFile (file: any) {
  [form.value.torrentFile] = file;
}

function submitForm () {
  uploading.value = true;

  rest.value.torrent.uploadTorrent(
    {
      title: form.value.title,
      description: form.value.description,
      category: form.value.category,
      tags: form.value.tags,
      file: form.value.torrentFile
    }
  )
    .then((new_torrent) => {
      uploading.value = false;

      notify({
        group: "success",
        title: "Success",
        text: "Torrent uploaded!"
      }, 4000);

      navigateTo(`/torrent/${new_torrent.canonical_info_hash}`, { replace: true });
    })
    .catch((err) => {
      uploading.value = false;

      notify({
        group: "error",
        title: "Error",
        text: `Trying to upload the torrent. ${err.message}.`
      }, 10000);
    });
}

</script>

<style scoped>
label {
  @apply p-2 w-full font-medium text-neutral-content/50;
}

input, select, textarea {
  @apply p-2.5 w-full bg-transparent text-neutral-content placeholder-neutral-content/50 border-2 border-base-content/20 rounded-2xl duration-200 cursor-pointer;
}
</style>
