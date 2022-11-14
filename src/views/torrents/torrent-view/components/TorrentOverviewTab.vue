<template>
  <div class="flex flex-col grow">
    <div id="torrent-description" class="mb-10 flex flex-col">
      <div class="mb-5 px-5 flex flex-row justify-between">
        <h2 class="mr-1 text-2xl text-left text-slate-200 dark:text-dark-200 font-medium">Description</h2>
        <button
            v-if="editRights && state === States.viewing"
            class="text-slate-400 dark:text-dark-400 hover:text-white duration-200"
            @click="startEditingDescription"
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
      <div class="w-full h-full flex flex-col">
        <div class="p-6 w-full h-full flex flex-col grow border border-slate-800 dark:border-white/5 rounded-2xl">
          <template v-if="torrent.description && state === States.viewing">
            <MarkdownItVue :content="torrent.description" class="md-body max-w-none prose-sm prose-blue"/>
          </template>
          <template v-else-if="state === States.editing">
            <textarea rows="8" v-model="changes.description" class="mb-8 px-4 py-4 bg-transparent text-slate-200 dark:text-dark-200 border border-slate-800 dark:border-dark-800 rounded-2xl"></textarea>
            <MarkdownItVue :content="changes.description" class="torrust-md px-4 py-4 max-h-64 overflow-auto md-body max-w-none prose-sm prose-blue bg-slate-800/50 dark:bg-white/5 rounded-2xl"/>
          </template>
          <span v-else class="text-slate-400 dark:text-dark-400 italic">No description provided.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownItVue from "markdown-it-vue";
import 'markdown-it-vue/dist/markdown-it-vue.css';
import { PencilIcon, XIcon, CheckIcon } from "@vue-hero-icons/solid";
import Vue from "vue";
import HttpService from "../../../../common/http-service";
import {mapState} from "vuex";

export default {
  name: "TorrentOverviewTab",
  components: {MarkdownItVue, PencilIcon, XIcon, CheckIcon},
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
      description: ''
    },
  }),
  methods: {
    startEditingDescription() {
      this.changes.description = this.torrent.description;
      this.state = this.States.editing;
    },
    saveChanges() {
      HttpService.put(`/torrent/${this.torrent.torrent_id}`, {description: this.changes.description}, (res) => {
        this.$emit('updated');
        this.state = this.States.viewing;
        Vue.notify({
          title: 'Updated',
          text: 'Torrent updated successfully.',
          type: 'success',
        })
      })
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
    }),
    editRights() {
      return this.$store.getters.isAdministrator || this.user.username === this.torrent.uploader;
    }
  }
}
</script>

<style scoped>

</style>
