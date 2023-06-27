<template>
  <div class="flex flex-col items-center w-full">
    <h2 class="text-2xl font-semibold text-neutral-content">
      Edit Torrent
    </h2>
    <div class="flex flex-col w-full max-w-xl gap-6">
      <div>
        <label for="title" class="px-2">Title</label>
        <input id="title" v-model="form.title" name="title" type="text" class="mt-1">
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
              <option :value="option.category_id">
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
import { TorrentResponse } from "torrust-index-types-lib";
import {
  navigateTo,
  onMounted,
  ref,
  useRestApi, useRoute,
  useTags,
  useUser
} from "#imports";
import { useCategories } from "~/composables/states";

type FormEditTorrent = {
  title: string;
  description: string;
  category: number;
  tags: Array<number>;
}

const categories = useCategories();
const tags = useTags();
const user = useUser();
const rest = useRestApi();
const route = useRoute();

const infoHash = route.params.infoHash as string;

const loadingTorrent = ref(true);
const torrent: Ref<TorrentResponse> = ref(null);
const updatingTorrent: Ref<boolean> = ref(false);
const descriptionView = ref("edit");

const form: Ref<FormEditTorrent> = ref({
  title: "",
  description: "",
  category: null,
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

  rest.value.torrent.getTorrentInfo(infoHash)
    .then((data) => {
      torrent.value = data;

      form.value.title = data.title;
      form.value.description = data.description;

      if (data.category === null) {
        form.value.category = null;
      } else {
        form.value.category = data.category.category_id;
      }

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
  return form.value.title && form.value.description;
}

function submitForm () {
  updatingTorrent.value = true;

  const updateTorrentInfo = {
    title: form.value.title,
    description: form.value.description,
    category: form.value.category,
    tags: form.value.tags.map((tag) => {
      return tag;
    })
  };

  rest.value.torrent.updateTorrent(infoHash, updateTorrentInfo)
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
