<template>
  <div class="min-h-fit max-w-full flex flex-col grow">
    <div class="max-w-full flex flex-col">
      <div id="torrent-view" class="px-2 flex flex-col lg:flex-row">
        <div class="hidden lg:flex flex-col basis-1/5 items-center">
          <div class="flex flex-col items-start top-24 sticky max-w-md">
            <h1 class="mb-6 text-left text-4xl font-semibold text-slate-200 dark:text-dark-200">Settings</h1>
            <ul>
              <li v-for="tab in Tabs" class="mb-1">
                <router-link
                    :to="tab.path"
                    class="inline-flex py-2 font-medium text-2xl text-center text-slate-400 dark:text-dark-400 hover:text-slate-200 dark:hover:text-dark-200 border-b-2 border-transparent duration-200"
                    style="margin-bottom: -2px;"
                    :class="{ 'active': $route.path === tab.path }"
                >
                  {{ tab.name }}
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div id="torrent-view-details" class="lg:ml-8 flex flex-col flex-auto items-center">
          <div id="torrent-view-details-body" class="w-full flex flex-col grow">
            <div class="flex flex-col items-center">
              <div class="w-full flex flex-col">
                <h1 class="block lg:hidden mb-14 text-4xl font-semibold text-slate-200 dark:text-dark-200">Settings</h1>

                <Tabs
                    :tabs="Tabs"
                    class="block lg:hidden mb-10"
                />

                <router-view
                    :settings="settings"
                    :settings-updated="settingsUpdated"
                />

                <button
                    @click="saveSettings"
                    :disabled="settingsUpdated || savingSettings"
                    class="px-6 mt-8 h-12 inline-flex justify-center items-center self-start appearance-none bg-sky-500 dark:bg-dark-accent-600 hover:bg-sky-600 dark:hover:bg-dark-accent-700 text-white font-medium rounded-2xl cursor-pointer duration-200 disabled:opacity-50"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    Tabs: [
      { name: 'General', path: '/settings/general' },
      { name: 'Tracker', path: '/settings/tracker' },
      { name: 'Authentication', path: '/settings/authentication' },
      { name: 'Database', path: '/settings/database' },
      { name: 'Email', path: '/settings/email' },
    ],
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
.active {
  @apply text-slate-200 dark:text-dark-200;
}
</style>
