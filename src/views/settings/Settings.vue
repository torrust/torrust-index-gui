<template>
  <div class="w-full flex flex-col max-w-2xl mx-auto">
    <h1 class="mb-14 text-4xl font-semibold text-slate-200">Settings</h1>

    <Tabs
        :tabs="[
          { name: 'General', path: '/settings/general' },
          { name: 'Tracker', path: '/settings/tracker' },
          { name: 'Authentication', path: '/settings/authentication' },
          { name: 'Database', path: '/settings/database' },
          { name: 'Email', path: '/settings/email' },
          ]"
        class="mb-10"
    />

    <router-view
        :settings="settings"
        :settings-updated="settingsUpdated"
    />

    <button
        @click="saveSettings"
        :disabled="settingsUpdated || savingSettings"
        class="px-6 mt-8 h-12 inline-flex justify-center items-center self-start appearance-none bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-md cursor-pointer duration-200 disabled:opacity-50"
    >
      Save
    </button>

<!--        <label>Categories</label>-->
<!--        <ul class="py-2">-->
<!--          <li v-for="(category, index) in categoriesState" :key="index">-->
<!--            <div class="py-2 px-4 mt-2 bg-slate-800 rounded-md flex flex-row">-->
<!--              <span class="text-white">{{ category.name }} ({{ category.num_torrents }})</span>-->
<!--              <svg xmlns="http://www.w3.org/2000/svg" @click="deleteCategory(category.name)" class="h-6 w-6 ml-auto px-1 rounded-lg bg-opacity-10 text-red-400 hover:text-red-500 text-center cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">-->
<!--                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />-->
<!--              </svg>-->
<!--            </div>-->
<!--          </li>-->
<!--        </ul>-->
<!--        <div class="mt-2 flex flex-row">-->
<!--          <input v-model="newCategory" type='text' placeholder='Enter category'>-->
<!--          <button @click="addCategory" :disabled="!newCategory" class="button ml-2 px-4 bg-sky-600 hover:bg-sky-500 text-white rounded-md disabled:opacity-50">Add</button>-->
<!--        </div>-->
<!--      </div>-->
  </div>
</template>

<script>

import {mapState} from "vuex";
import HttpService from "@/common/http-service";
import SelectComponent from "@/components/SelectComponent.vue";
import Tabs from "../../components/navigation/Tabs.vue";

export default {
  name: "Settings",
  components: {Tabs, SelectComponent },
  data: () => ({
    TrackerMode: [{ name: "Public" }, { name: "Private" }, { name: "Whitelisted" }, { name: "PrivateWhitelisted" }],
    EmailOnSignup: [{ name: "Required" }, { name: "Optional" }, { name: "None" }],
    tab: 'general',
    newCategory: '',
    savingSettings: false,
    settings: {
      website: {
        name: ""
      },
      tracker: {
        url: "",
        mode: "",
        api_url: "",
        token: "",
        token_valid_seconds: 0
      },
      net: {
        port: 0,
        base_url: null
      },
      auth: {
        email_on_signup: "Optional",
        min_password_length: 0,
        max_password_length: 0,
        secret_key: ""
      },
      database: {
        connect_url: "",
        torrent_info_update_interval: 0
      },
      mail: {
        email_verification_enabled: false,
        from: "",
        reply_to: "",
        username: "",
        password: "",
        server: "",
        port: 0
      }
    }
  }),
  computed: {
    ...mapState(['categories']),
    settingsUpdated() {
      return JSON.stringify(this.$store.state.settings) === JSON.stringify(this.settings);
    },
    settingsState() {
      return this.$store.state.settings;
    },
    categoriesState() {
      return this.$store.state.categories;
    }
  },
  methods: {
    addCategory() {
      if (this.newCategory) {
        HttpService.post(`/category`, { name: this.newCategory }, () => {
          this.$store.dispatch('getCategories');
        }).catch(() => {
        });
      }
    },
    deleteCategory(category) {
      HttpService.delete(`/category`, { name: category }, () => {
        this.$store.dispatch('getCategories');
      }).catch(() => {
      });
    },
    saveSettings() {
      this.savingSettings = true;
      HttpService.post(`/settings`, this.settings, () => {
        this.$store.dispatch('getSettings');
        this.savingSettings = false;
      }).catch(() => {
        this.savingSettings = false;
      });
    },
    clearSettings() {
      this.settings = JSON.parse(JSON.stringify(this.$store.state.settings));
    },
  },
  beforeMount() {
    this.$store.dispatch('getSettings');
    this.$store.dispatch('getCategories');
  },
  watch: {
    settingsState() {
      this.clearSettings();
    },
  }
}
</script>

<style scoped>
.category-tile {
  @apply bg-cover !important;
  @apply w-full rounded-3xl shadow-lg text-center py-16 relative;
}

label {
  @apply mt-2 block text-gray-200;
}

h2 {
  @apply mt-6 text-xl text-white;
}

h3 {
  @apply mt-2 text-lg text-white;
}

.details {
  @apply inline-flex;
}

.setting-input-container {
  @apply py-1 flex flex-row;
}

button.changes {
  @apply mt-2 py-2 px-4 text-white rounded-md;
}

input {
  @apply py-2 px-4 w-full text-white bg-slate-800 border border-slate-700 rounded-md text-sm shadow-sm cursor-pointer placeholder-slate-400 hover:border-sky-500 focus:bg-slate-800
  focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition duration-200;
}
</style>
