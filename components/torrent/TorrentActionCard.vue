<template>
  <div class="flex flex-col basis-full">
    <template v-if="torrent">
      <div class="flex flex-col">
        <div class="mb-4 px-4 md:px-6 flex flex-col">
          <div class="mb-4 flex flex-col">
            <div class="flex flex-col">
              <span class="mb-1 font-semibold text-accent capitalize">{{ torrent.category.name }}</span>
              <div class="flex flex-row justify-between">
                <h2 v-if="state === State.Viewing" class="mb-1 text-themeText font-bold overflow-hidden break-words">{{ torrent.title }}</h2>
                <input v-else-if="state === State.Editing" type="text" class="input mr-3" v-model="updatedTitle">
                <button
                    v-if="hasEditRights() && state === State.Viewing"
                    class="ml-1 text-slate-400 dark:text-dark-400 hover:text-white duration-200"
                    @click="startEditingTitle"
                >
                  <PencilIcon size="18" />
                </button>
                <div v-else-if="state === State.Editing" class="flex flex-row flex-nowrap">
                  <button
                      class="mr-3 text-slate-400 dark:text-dark-400 hover:text-white duration-200"
                      @click="state = State.Viewing"
                  >
                    <XMarkIcon size="18" />
                  </button>
                  <button
                      class="text-slate-400 dark:text-dark-400 hover:text-white duration-200"
                      @click="saveChanges"
                  >
                    <CheckIcon size="18" />
                  </button>
                </div>
              </div>
              <div class="mt-4 flex flex-row flex-nowrap justify-start items-center text-sm">
                <UserCircleIcon class="mr-1 w-5 h-5 text-themeText/50" />
                <a class="mr-1 font-semibold text-accent cursor-pointer">{{ torrent.uploader }}</a>
              </div>
            </div>
          </div>
          <div class="mb-4 h-0.5 flex flex-col bg-secondary"></div>
          <div class="flex flex-row flex-nowrap justify-between">
            <div class="flex flex-row flex-nowrap text-themeText/50 text-sm">
              <div class="flex flex-row flex-nowrap items-center justify-center">
                <CalendarIcon class="mr-1 w-5 h-5" />
                <span>{{ new Date(torrent.upload_date).toLocaleDateString() }}</span>
              </div>
              <div class="ml-3 flex flex-row flex-nowrap items-center justify-center">
                <CircleStackIcon class="mr-1 w-5 h-5" />
                <span>{{ fileSize(torrent.file_size) }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full h-full flex flex-col">
          <div class="p-6 w-full h-full flex flex-col grow border-2 border-secondary rounded-2xl">
            <div class="flex flex-col">
              <div class="mb-1 flex flex-row gap-4 flex-nowrap justify-between">
                <div class="px-2 py-3 flex flex-col items-center bg-slate-800/60 dark:bg-white/5 rounded-2xl w-1/2">
                  <span class="px-2 w-full text-xs text-themeText/50 font-semibold text-left">Seeders</span>
                  <span id="seeders" class="px-2 w-full text-sm text-green-500/95 font-semibold">{{ Number(torrent.seeders).toLocaleString() }}</span>
                </div>
                <div class="px-2 py-3 flex flex-col items-center bg-slate-800/60 dark:bg-white/5 rounded-2xl w-1/2">
                  <span class="px-2 w-full text-xs text-themeText/50 font-semibold text-left">Leechers</span>
                  <span id="seeders" class="px-2 w-full text-sm text-red-500/95 font-semibold">{{ Number(torrent.leechers).toLocaleString() }}</span>
                </div>
              </div>
              <template v-if="showDownloadButtons">
                <button
                    class="mt-3 px-4 h-12 bg-gradient-to-bl from-accent to-accent-dark hover:bg-tertiary text-sm text-themeText font-semibold rounded-2xl shadow-lg shadow-transparent hover:shadow-accent-dark/50 duration-1000"
                    @click="downloadTorrent(torrent.torrent_id, torrent.title)"
                >Download torrent</button>
                <a
                    class="mt-4 px-4 flex flex-col items-center justify-center text-sm text-themeText/50 hover:text-themeText font-medium rounded-2xl duration-200"
                    :href="torrent.magnet_link"
                >Download using magnet link</a>
              </template>
              <template v-else>
                <button
                    class="mt-3 px-4 h-12 bg-white text-sm text-black font-medium rounded-2xl"
                    @click="$store.dispatch('openAuthModal')"
                >Please sign in to download</button>
                <button
                    class="mt-3 px-4 h-12 bg-sky-500 text-sm text-white font-medium rounded-2xl"
                    @click="$store.dispatch('openAuthModal')"
                >Please sign in to download</button>
              </template>
            </div>
          </div>
          <button
              v-if="hasEditRights()"
              class="mt-6 mx-6 px-4 h-12 bg-red-500 text-sm text-white font-medium rounded-2xl"
              @click="deleteTorrent"
          >Delete torrent</button>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="mb-1 h-24 bg-gray-700 animate-pulse rounded-2xl"/>
    </template>
  </div>
</template>

<script setup lang="ts">
import {CalendarIcon, CircleStackIcon, UserCircleIcon} from "@heroicons/vue/20/solid";
import {CheckIcon, PencilIcon, XMarkIcon} from "@heroicons/vue/24/solid";
import {isUserLoggedIn, useUser} from "~/store/user";
import {isTrackerPublic, useSettings} from "~/store/settings";
import {fileSize, downloadTorrent, ref} from "#imports";
import {Ref} from "@vue/reactivity";
import {rest} from 'torrust-index-api-lib';
import {Torrent} from "torrust-index-types-lib";
import {useRuntimeConfig} from "#app";

enum State {
  Viewing,
  Editing
}

const config = useRuntimeConfig();
const settings = useSettings();
const user = useUser();

const state: Ref<State> = ref(State.Viewing);
const updatedTitle: Ref<String> = ref(null);

const emit = defineEmits([
  'updated'
])

const props = defineProps({
  torrent: {
    type: Torrent,
    required: true
  }
})

function hasEditRights(): boolean {
  if (!user.value) return false;

  console.log(user.value);

  return user.value.hasEditRightsForTorrent(props.torrent);
}

function showDownloadButtons() {
  return isUserLoggedIn() || isTrackerPublic()
}

function startEditingTitle() {
  updatedTitle.value = props.torrent.title;
  state.value = State.Editing;
}

function saveChanges() {
  // TODO: Submit changes.
  emit('updated');
  state.value = State.Viewing;
}

function deleteTorrent() {
  rest.torrent.deleteTorrent(config.public.apiBase, props.torrent.torrent_id)
      .then(() => {
        emit('updated');
      });
}
</script>
