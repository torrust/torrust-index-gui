<template>
  <div class="px-6 py-6 text-themeText/50 rounded-2xl mx-auto w-full max-w-xl">
    <h2 class="text-2xl mb-4 font-semibold text-center text-themeText">
      Upload torrent
    </h2>
    <form
      class="space-y-6"
      @submit.prevent="submit"
    >
      <div class="mt-1">
        <label for="title" class="px-2">Title</label>
        <input id="title" v-model="form.title" name="title" type="text" class="mt-1">
      </div>
      <div class="mt-1">
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
        <div class="mt-1">
          <label for="category" class="px-2">Category</label>
          <FiltersTorrustSelect id="category" class="mt-1" :options="categories" @updated="(v) => { form.category = v.name; }" />
        </div>
      </template>
      <div class="mt-1">
        <UploadFile sub-title="Only .torrent files allowed. BitTorrent v2 files are NOT supported." accept=".torrent" @on-change="setFile" />
      </div>
      <template v-if="isUserLoggedIn()">
        <button
          :disabled="!formValid() || uploading"
          class="px-4 h-12 w-full bg-gradient-to-bl from-accent to-accent-dark disabled:from-gray-500 disabled:to-gray-500 text-themeText font-semibold rounded-2xl shadow-lg disabled:shadow-none shadow-transparent hover:shadow-accent-dark/50 duration-1000"
          @click="submitForm"
        >
          <span>Submit</span>
        </button>
      </template>
      <template v-else>
        <button
          class="px-4 h-12 w-full bg-gradient-to-bl from-accent to-accent-dark disabled:from-gray-500 disabled:to-gray-500 text-themeText font-semibold rounded-2xl shadow-lg disabled:shadow-none shadow-transparent hover:shadow-accent-dark/50 duration-1000"
          @click="login"
        >
          <span>Please sign in to upload</span>
        </button>
      </template>
    </form>
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
  if (formValid() && !uploading.value) {
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
}

function login () {
  authModalOpen.value = true;
}
</script>

<style scoped>
input, textarea {
  @apply p-2.5 w-full bg-transparent text-themeText placeholder-themeText/50 border-2 border-secondary hover:border-tertiary rounded-2xl duration-200 cursor-pointer;
}
</style>
