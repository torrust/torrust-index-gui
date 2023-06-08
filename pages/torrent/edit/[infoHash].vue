<template>
  <div class="w-full flex flex-col items-center">
    <h2 class="text-2xl font-semibold text-neutral-content">
      Edit Torrent
    </h2>
    <div class="w-full max-w-xl flex flex-col gap-6">
      <div>
        <label for="title" class="px-2">Title</label>
        <input id="title" v-model="form.title" name="title" type="text" class="mt-1">
      </div>
      <div>
        <label for="description" class="px-2">Description</label>
        <div class="my-2 tabs tabs-boxed w-fit border border-base-content/20">
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
      <!--      <template v-if="categories?.length > 0">-->
      <!--        <div>-->
      <!--          <label for="category" class="px-2">Category</label>-->
      <!--          <select id="category" v-model="form.category" class="mt-1">-->
      <!--            <template v-for="option in categories">-->
      <!--              <option :value="option.name">-->
      <!--                {{ option.name }}-->
      <!--              </option>-->
      <!--            </template>-->
      <!--          </select>-->
      <!--        </div>-->
      <!--      </template>-->
      <div>
        <label for="tags" class="px-2">Tags</label>
        <TorrustSelect
          v-model:selected="form.tags"
          :options="tags.map(entry => ({ name: entry.name, value: entry.tag_id }))"
          :multiple="true"
          search
        />
      </div>
      <template v-if="user?.username">
        <button
          class="btn btn-primary"
          :disabled="!formValid() || updatingTorrent"
          @click="submitForm"
        >
          save changes
        </button>
      </template>
      <button
        class="btn btn-error"
        @click="cancelChanges"
      >
        cancel
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { notify } from "notiwind-ts";
import { Torrent, TorrentTag } from "../../../../torrust-index-types-lib";
import {
  computed,
  navigateTo,
  onMounted,
  ref, toRaw,
  useRestApi, useRoute,
  useRuntimeConfig,
  useTags,
  useUser
} from "#imports";
import { useCategories } from "~/composables/states";

type FormEditTorrent = {
  title: string;
  description: string;
  tags: Array<string>;
}

const config = useRuntimeConfig();
const categories = useCategories();
const tags = useTags();
const user = useUser();
const rest = useRestApi();
const route = useRoute();

const infoHash = route.params.infoHash as string;

const loadingTorrent = ref(true);
const torrent: Ref<Torrent> = ref(null);
const updatingTorrent: Ref<boolean> = ref(false);
const descriptionView = ref("edit");

const form: Ref<FormEditTorrent> = ref({
  title: "",
  description: "",
  tags: []
});

onMounted(() => {
  if (!infoHash) {
    navigateTo("/", { replace: true });
  }

  getTorrentFromApi(infoHash);
});

function getTorrentFromApi (infoHash: string) {
  loadingTorrent.value = true;

  rest.value.torrent.getTorrent(infoHash)
    .then((data) => {
      torrent.value = data;

      form.value.title = data.title;
      form.value.description = data.description;
      form.value.tags = data.tags.map((tag) => {
        if (typeof tag === "object" && "tag_id" in tag) {
          return tag.tag_id;
        } else {
          return tag;
        }
      });
    })
    .finally(() => {
      loadingTorrent.value = false;
    });

  // TODO: Set torrent title in URL.
}

function formValid () {
  return form.value.title && (form.value.title + form.value.description) !== (torrent.value.title + torrent.value.description + torrent.value.category.name);
}

function submitForm () {
  updatingTorrent.value = true;

  const uploadTorrent = {
    title: form.value.title,
    description: form.value.description,
    tags: form.value.tags.map((tag) => {
      if (typeof tag === "object" && "tag_id" in tag) {
        return tag.tag_id;
      } else {
        return tag;
      }
    })
  };

  rest.value.torrent.updateTorrent(infoHash, uploadTorrent)
    .then((torrentResponse) => {
      notify({
        group: "success",
        title: "Success",
        text: "Torrent updated!"
      }, 4000);

      navigateTo(`/torrent/${infoHash}`, { replace: true });
    })
    .catch((err) => {
      notify({
        group: "error",
        title: "Error",
        text: err.message
      }, 4000); // 4s
    })
    .finally(() => {
      updatingTorrent.value = false;
    });
}

function cancelChanges () {
  navigateTo(`/torrent/${infoHash}`, { replace: true });
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
