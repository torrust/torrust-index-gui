<template>
  <div class="w-full flex flex-col items-center">
    <h2 class="text-2xl font-semibold text-themeText">
      Upload Torrent
    </h2>
    <div class="w-full max-w-lg flex flex-col gap-6">
      <div>
        <label for="title" class="px-2">Title</label>
        <input id="title" v-model="form.title" name="title" type="text" class="mt-1">
      </div>
      <div>
        <label for="description" class="px-2">Description</label>
        <textarea
          id="description"
          v-model="form.description"
          name="description"
          rows="8"
          class="mt-1"
        />
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
          class="px-4 h-12 w-full bg-gradient-to-bl from-accent to-accent-dark disabled:from-gray-500 disabled:to-gray-500 text-themeText font-semibold rounded-2xl shadow-lg disabled:shadow-none shadow-transparent hover:shadow-accent-dark/50 duration-1000"
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
import { getCategories, navigateTo, onMounted, ref, useRestApi, useRuntimeConfig, useUser } from "#imports";
import { useAuthenticationModal, useCategories } from "~/composables/states";

type FormUploadTorrent = {
  title: string;
  category: string;
  description: string;
  torrentFile: any;
}

const config = useRuntimeConfig();
const categories = useCategories();
const user = useUser();
const authModalOpen = useAuthenticationModal();
const rest = useRestApi();

const uploading: Ref<boolean> = ref(false);
const form: Ref<FormUploadTorrent> = ref({
    title: "",
    category: "",
    description: "",
    torrentFile: ""
});

onMounted(() => {
    getCategories();
});

function formValid () {
    return form.value.title && form.value.category && form.value.torrentFile;
}

function setFile (file: any) {
    [form.value.torrentFile] = file;
}

function submitForm () {
    uploading.value = true;

    rest.value.torrent.uploadTorrent(
        {
            title: form.value.title,
            category: form.value.category,
            description: form.value.description,
            file: form.value.torrentFile
        }
    )
        .then((torrent_id) => {
            uploading.value = false;
            navigateTo(`/torrent/${torrent_id}`, { replace: true });
        })
        .catch((err) => {
            uploading.value = false;

            notify({
                group: "foo",
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
  @apply p-2 w-full font-medium text-themeText/50;
}

input, select, textarea {
  @apply p-2.5 w-full bg-transparent text-themeText placeholder-themeText/50 border-2 border-secondary hover:border-tertiary rounded-2xl duration-200 cursor-pointer;
}
</style>
