<template>
  <div class="px-6 py-6 text-themeText/50 rounded-2xl mx-auto w-full max-w-xl">
    <h2 class="text-2xl mb-4 font-semibold text-center text-themeText">Upload torrent</h2>
    <form
        @submit.prevent="submit"
        class="space-y-6"
    >
      <div class="mt-1">
        <label for="title" class="px-2">Title</label>
        <input id="title" name="title" type="text" v-model="form.title" class="mt-1">
      </div>
      <div class="mt-1">
        <label for="description" class="px-2">Description</label>
        <textarea
            id="description"
            name="description"
            rows="8"
            v-model="form.description"
            class="mt-1"
        ></textarea>
      </div>
      <template v-if="categories?.length > 0">
        <div class="mt-1">
          <label for="category" class="px-2">Category</label>
          <FiltersTorrustSelect id="category" class="mt-1" :options="categories" @updated="(v) => { form.category = v.name; }"/>
        </div>
      </template>
      <div class="mt-1">
        <UploadFile @onChange="setFile" sub-title="Only .torrent files allowed. BitTorrent v2 files are NOT supported." accept=".torrent" />
      </div>
      <template v-if="isUserLoggedIn()">
        <button
            :disabled="!formValid() || uploading"
            @click="submitForm"
            class="px-4 h-12 w-full bg-gradient-to-bl from-accent to-accent-dark disabled:from-gray-500 disabled:to-gray-500 text-themeText font-semibold rounded-2xl shadow-lg disabled:shadow-none shadow-transparent hover:shadow-accent-dark/50 duration-1000"
        >
          <span>Submit</span>
        </button>
      </template>
      <template v-else>
        <button
            @click="login"
            class="px-4 h-12 w-full bg-gradient-to-bl from-accent to-accent-dark disabled:from-gray-500 disabled:to-gray-500 text-themeText font-semibold rounded-2xl shadow-lg disabled:shadow-none shadow-transparent hover:shadow-accent-dark/50 duration-1000"
        >
          <span>Please sign in to upload</span>
        </button>
      </template>
    </form>
  </div>


<!--  <div class="mt-10 flex flex-col w-full">-->
<!--    <div class="w-full">-->
<!--      <form class="space-y-4">-->
<!--        <div>-->
<!--          <label for="title" class="block font-medium text-gray-700">-->
<!--            Title-->
<!--          </label>-->
<!--          <div class="mt-1">-->
<!--            <input id="title" name="title" type="text" v-model="form.title" class="input">-->
<!--          </div>-->
<!--        </div>-->

<!--        <div>-->
<!--          <label for="description" class="block font-medium text-gray-700">-->
<!--            Description (Markdown supported)-->
<!--          </label>-->
<!--          <div class="mt-1">-->
<!--            <textarea-->
<!--                id="description"-->
<!--                name="description"-->
<!--                rows="8"-->
<!--                v-model="form.description"-->
<!--                class="input"-->
<!--            ></textarea>-->
<!--          </div>-->
<!--        </div>-->

<!--        <div v-if="form.description">-->
<!--          <label>Markdown Preview</label>-->
<!--&lt;!&ndash;          <MarkdownItVue :content="form.description" class="mt-1 px-4 py-4 max-h-64 overflow-auto md-body max-w-none prose-sm prose-blue bg-slate-800/50 rounded-md" />&ndash;&gt;-->
<!--        </div>-->

<!--        <div>-->
<!--          <label class="block font-medium text-gray-700">-->
<!--            Category-->
<!--          </label>-->
<!--          <FiltersTorrustSelect v-if="categories?.length > 0" class="py-1" :options="categories"/>-->
<!--        </div>-->

<!--        <div>-->
<!--          <label class="block font-medium text-gray-700">-->
<!--            Torrent-->
<!--          </label>-->
<!--&lt;!&ndash;          <FileUpload @onChange="setFile" sub-title="Only .torrent files allowed. BitTorrent v2 files are NOT supported." accept=".torrent" />&ndash;&gt;-->
<!--        </div>-->

<!--        <div class="py-3 flex flex-row justify-end">-->
<!--          <button :disabled="!formValid || uploading" @click="submitForm" type="button" class="ml-2 px-3 py-2 flex flex-row bg-sky-500 text-sm text-white rounded-md transition duration-200 hover:shadow-lg hover:shadow-sky-500/25 disabled:shadow-none disabled:text-gray-100 disabled:bg-gray-400 disabled:hover:bg-gray-400">-->
<!--            <svg v-if="uploading" class="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">-->
<!--              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>-->
<!--              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>-->
<!--            </svg>-->
<!--            Upload torrent-->
<!--          </button>-->
<!--        </div>-->
<!--      </form>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script setup lang="ts">
import {Ref} from "@vue/reactivity";
import {navigateTo, onBeforeMount, onMounted, ref, useRuntimeConfig} from "#imports";
import {rest} from "~/api";
import {useAuthenticationModal, useCategories} from "~/store";
import {notify} from "notiwind-ts";
import {useUser, isUserLoggedIn} from "~/store/user";

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

const uploading: Ref<boolean> = ref(false);
const form: Ref<FormUploadTorrent> = ref({
  title: "",
  category: "",
  description: "",
  torrentFile: ""
});

onMounted(async () => {
  rest.category.getCategories(config.public.apiBase)
      .then((res) => {
        categories.value = res;
      });
})

function formValid() {
  return form.value.title && form.value.category && form.value.torrentFile;
}

function setFile(file: any) {
  [form.value.torrentFile] = file;
}

function submitForm() {
  if (formValid() && !uploading.value) {
    uploading.value = true;

    rest.torrent.uploadTorrent(
        config.public.apiBase,
        {
          title: form.value.title,
          category: form.value.category,
          description: form.value.description,
          file: form.value.torrentFile
        }
    )
        .then((torrent_id) => {
          uploading.value = false;
          navigateTo(`/torrent/${torrent_id}`, {replace: true});
        })
        .catch((err) => {
          uploading.value = false;

          notify({
            group: "foo",
            title: "Error",
            text: err
          }, 4000)
        });
  }
}

function login() {
  authModalOpen.value = true;
}
</script>

<style scoped>
input, textarea {
  @apply p-2.5 w-full bg-transparent text-themeText placeholder-themeText/50 border-2 border-secondary hover:border-tertiary rounded-2xl duration-200 cursor-pointer;
}
</style>
