<template>
  <div class="w-full flex flex-col items-center">
    <h2 class="text-2xl font-semibold text-neutral-content">
      Edit Torrent
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
        <TorrustSelect class="grow-0" :options="tags" multiple search @updated="setTags" />
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
  category: string;
  description: string;
  // tags: Array<number>;
}

const config = useRuntimeConfig();
const categories = useCategories();
const tags = useTags();
const user = useUser();
const rest = useRestApi();
const route = useRoute();

const torrentId = Number(route.params.id);

const loadingTorrent = ref(true);
const torrent: Ref<Torrent> = ref(null);
const updatingTorrent: Ref<boolean> = ref(false);

const form: Ref<FormEditTorrent> = ref({
  title: "",
  category: "",
  description: ""
});

onMounted(() => {
  if (isNaN(torrentId)) {
    navigateTo("/", { replace: true });
  }

  getTorrentFromApi(torrentId);
});

function getTorrentFromApi (torrentId: number) {
  loadingTorrent.value = true;

  rest.value.torrent.getTorrent(torrentId)
    .then((data) => {
      torrent.value = data;

      form.value.title = data.title;
      form.value.description = data.description;
      form.value.category = data.category.name;
    })
    .finally(() => {
      loadingTorrent.value = false;
    });

  // TODO: Set torrent title in URL.
}

function formValid () {
  return form.value.title && form.value.category && (form.value.title + form.value.description + form.value.category) !== (torrent.value.title + torrent.value.description + torrent.value.category.name);
}

function setTags (e: any) {
  form.value.tags = toRaw(e).map((tag: TorrentTag) => {
    return tag.tag_id;
  });
}

function submitForm () {
  updatingTorrent.value = true;

  const uploadTorrent = torrent.value;

  uploadTorrent.title = form.value.title;
  uploadTorrent.description = form.value.description;

  rest.value.torrent.updateTorrent(uploadTorrent)
    .then((torrentResponse) => {
      navigateTo(`/torrent/${torrentId}`, { replace: true });
    })
    .catch((err) => {
      notify({
        group: "foo",
        title: "Error",
        text: err
      }, 4000);
    })
    .finally(() => {
      updatingTorrent.value = false;
    });
}

function cancelChanges () {
  navigateTo(`/torrent/${torrentId}`, { replace: true });
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
