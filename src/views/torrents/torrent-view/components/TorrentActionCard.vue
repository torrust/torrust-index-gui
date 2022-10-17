<template>
  <div class="flex flex-col basis-full">
    <template v-if="torrent.category">
      <div class="flex flex-col">
        <div class="mb-8 px-4 md:px-7 flex flex-col">
          <div class="mb-4 flex flex-col">
            <div class="mb-8 flex flex-col">
              <span class="mb-1 font-semibold text-sky-600 dark:text-dark-accent-600 capitalize">{{ torrent.category.name }}</span>
              <div class="mb-1 flex flex-row justify-between">
                <h2 v-if="state === States.viewing" class="mb-1 text-slate-200 dark:text-dark-200 font-bold overflow-hidden break-words">{{ torrent.title }}</h2>
                <input v-else-if="state === States.editing" type="text" class="input mr-3" v-model="changes.title">
                <button
                    v-if="editRights && state === States.viewing"
                    class="ml-1 text-slate-400 dark:text-dark-400 hover:text-white duration-200"
                    @click="startEditingTitle"
                >
                  <PencilIcon size="18" />
                </button>
                <div v-else-if="state === States.editing" class="flex flex-row flex-nowrap">
                  <button
                      class="mr-3 text-slate-400 dark:text-dark-400 hover:text-white duration-200"
                      @click="state = States.viewing"
                  >
                    <XIcon size="18" />
                  </button>
                  <button
                      class="text-slate-400 dark:text-dark-400 hover:text-white duration-200"
                      @click="saveChanges"
                  >
                    <CheckIcon size="18" />
                  </button>
                </div>
              </div>
              <span class="text-xs md:text-sm font-semibold text-slate-600 dark:text-dark-600 overflow-hidden break-words">{{ torrent.info_hash }}</span>
            </div>
            <div class="flex flex-row flex-nowrap justify-start items-center text-sm">
              <span class="mr-3 text-slate-500 dark:text-dark-500 font-semibold uppercase text-xs">Uploader:</span>
              <div class="flex flex-row flex-nowrap items-center">
                <a class="mr-1 font-semibold text-sky-600 dark:text-dark-accent-600">{{ torrent.uploader }}</a>
<!--                <BadgeCheckIcon class="text-yellow-500" size="16" />-->
              </div>
            </div>
          </div>
          <div class="mb-4 h-0.5 flex flex-col bg-slate-800/60 dark:bg-white/5"></div>
          <div class="flex flex-row flex-nowrap justify-between">
            <div class="flex flex-row flex-nowrap text-slate-500 dark:text-dark-500 font-semibold text-sm">
              <div class="mr-1 h-8 px-3 flex flex-row flex-nowrap items-center justify-center">
                <DatabaseIcon class="mr-1" size="18" />
                <span>{{ fileSize(torrent.file_size) }}</span>
              </div>
              <div class="h-8 px-3 flex flex-row flex-nowrap items-center justify-center">
                <CalendarIcon class="mr-1" size="18" />
                <span>{{ new Date(torrent.upload_date).toLocaleString() }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full h-full flex flex-col">
          <div class="p-6 w-full h-full flex flex-col grow border border-slate-800 dark:border-dark-800 rounded-2xl">
            <div class="flex flex-col">
              <div class="mb-3 flex flex-row flex-nowrap justify-between">
                <div class="mr-3 flex flex-col grow">
                  <span class="mb-1 px-2 text-xs text-slate-500 dark:text-dark-500 font-semibold uppercase">Seeders</span>
                  <div class="p-3 flex flex-col items-center bg-slate-800/60 dark:bg-white/5 rounded-2xl grow">
                    <span id="seeders" class="text-green-500 font-semibold">{{ torrent.seeders }}</span>
                  </div>
                </div>
                <div class="flex flex-col grow">
                  <span class="mb-1 px-2 text-xs text-slate-500 dark:text-dark-500 font-semibold uppercase">Leechers</span>
                  <div class="p-3 flex flex-col items-center bg-slate-800/60 dark:bg-white/5 rounded-2xl grow">
                    <span id="seeders" class="text-red-500 font-semibold">{{ torrent.leechers }}</span>
                  </div>
                </div>
              </div>
              <template v-if="showDownloadButtons">
                <a
                    class="mt-3 px-4 h-12 flex flex-col items-center justify-center bg-white hover:bg-neutral-200 text-sm text-black font-medium rounded-2xl duration-200"
                    :href="torrent.magnet_link"
                >Magnet link</a>
                <button
                    class="mt-3 px-4 h-12 bg-sky-500 dark:bg-dark-accent-600 dark:hover:bg-dark-accent-700 text-sm text-white font-medium rounded-2xl duration-200"
                    @click="downloadTorrent(torrent.torrent_id, torrent.title)"
                >Download torrent</button>
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
              v-if="editRights"
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

<script>
import { DatabaseIcon, CalendarIcon } from "@vue-hero-icons/outline";
import { BadgeCheckIcon, PencilIcon, XIcon, CheckIcon } from "@vue-hero-icons/solid";
import HttpService from "../../../../common/http-service";
import Vue from "vue";
import {mapState} from "vuex";

export default {
  name: "TorrentActionCard",
  components: {DatabaseIcon, CalendarIcon, BadgeCheckIcon, PencilIcon, XIcon, CheckIcon},
  props: {
    torrent: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data: () => ({
    States: {
      viewing: 0,
      editing: 1
    },
    state: 0,
    changes: {
      title: ''
    },
  }),
  methods: {
    startEditingTitle() {
      this.changes.title = this.torrent.title;
      this.state = this.States.editing;
    },
    saveChanges() {
      HttpService.put(`/torrent/${this.torrent.torrent_id}`, {title: this.changes.title}, (res) => {
        this.$emit('updated');
        this.state = this.States.viewing;
        Vue.notify({
          title: 'Updated',
          text: 'Torrent updated successfully.',
          type: 'success',
        })
      })
    },
    deleteTorrent() {
      HttpService.delete(`/torrent/${this.torrent.torrent_id}`, {}, () => {
        this.$emit('updated');
        Vue.notify({
          title: 'Deleted',
          text: 'Torrent deleted successfully.',
          type: 'success',
        })
      })
    },
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
    }),
    editRights() {
      return this.$store.getters.isAdministrator || this.user.username === this.torrent.uploader;
    },
    showDownloadButtons() {
      return this.$store.getters.isLoggedIn || this.$store.state.publicSettings.tracker_mode === "Public" || this.$store.state.publicSettings.tracker_mode === "Whitelisted"
    }
  }
}
</script>

<style scoped>

</style>
