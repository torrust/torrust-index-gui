<template>
  <div class="w-full flex flex-col items-center">
    <h2 class="text-2xl font-semibold text-neutral-content">
      Upload Torrent
    </h2>
    <div class="w-full max-w-lg flex flex-col gap-6">
      <div>
        <label for="title" class="px-2">Title</label>
        <input id="title" v-model="form.title" name="title" type="text" class="mt-1">
      </div>
      <div>
        <label for="description" class="px-2">Description</label>
        <div class="my-2 tabs tabs-boxed w-fit">
          <button class="tab" :class="{ 'tab-active': descriptionView === 'edit' }" @click="descriptionView = 'edit'">Edit</button>
          <button class="tab" :class="{ 'tab-active': descriptionView === 'preview' }" @click="descriptionView = 'preview'">Preview</button>
        </div>
        <template v-if="descriptionView === 'edit'">
          <textarea
            id="description"
            v-model="form.description"
            name="description"
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
          <select id="category" v-model="form.category" class="mt-1">
            <template v-for="option in categories">
              <option :value="option.name">
                {{ option.name }}
              </option>
            </template>
          </select>
        </div>
      </template>
      <template v-if="categories?.length > 0">
        <div>
          <label for="tags" class="px-2">Tags</label>
          <TorrustSelect class="grow-0" :options="tags" multiple search @updated="setTags" />
        </div>
      </template>
      <div>
        <UploadFile sub-title="Only .torrent files allowed. BitTorrent v2 files are NOT supported." accept=".torrent" @on-change="setFile" />
      </div>
      <template v-if="user?.username">
        <TorrustButton
          label="submit"
          :disabled="!formValid() || uploading"
          @click="submitForm"
        />
      </template>
      <template v-else>
        <button
          class="px-4 h-12 w-full bg-gradient-to-bl from-primary to-primary-dark disabled:from-gray-500 disabled:to-gray-500 text-neutral-content font-semibold rounded-2xl shadow-lg disabled:shadow-none shadow-transparent hover:shadow-primary-dark/50 duration-1000"
          @click="login"
        >
          <span>Please sign in to upload</span>
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { notify } from "notiwind-ts";
import { TorrentTag } from "torrust-index-types-lib";
import {
  getCategories,
  getTags,
  navigateTo,
  onMounted,
  ref, toRaw,
  useRestApi,
  useRuntimeConfig,
  useTags,
  useUser
} from "#imports";
import { useAuthenticationModal, useCategories } from "~/composables/states";

type FormUploadTorrent = {
  title: string;
  category: string;
  description: string;
  tags: Array<number>;
  torrentFile: any;
}

const config = useRuntimeConfig();
const categories = useCategories();
const tags = useTags();
const user = useUser();
const authModalOpen = useAuthenticationModal();
const rest = useRestApi();

const uploading: Ref<boolean> = ref(false);
const descriptionView = ref("edit");
const form: Ref<FormUploadTorrent> = ref({
  title: "",
  category: "",
  description: "",
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

// TODO: replace torrent_id with info_hash.
function submitForm () {
  uploading.value = true;

  rest.value.torrent.uploadTorrent(
    {
      title: form.value.title,
      category: form.value.category,
      description: form.value.description,
      tags: form.value.tags,
      file: form.value.torrentFile
    }
  )
    .then((torrent_id) => {
      uploading.value = false;

      notify({
        group: "success",
        title: "Success",
        text: "Torrent uploaded!"
      }, 4000);

      navigateTo(`/torrent/${torrent_id}`, { replace: true });
    })
    .catch((err) => {
      uploading.value = false;

      notify({
        group: "error",
        title: "Error",
        text: err
      }, 4000);
    });
}

function login () {
  authModalOpen.value = true;
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
