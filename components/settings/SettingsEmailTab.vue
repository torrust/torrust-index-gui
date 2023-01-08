<template>
  <div id="general-settings" class="flex flex-col gap-6 max-w-lg">

    <h2 class="text-3xl font-medium text-themeText">Email Settings</h2>

    <div class="flex flex-col">
      <label for="database-torrent-status-update-interval">Torrent Status Update Interval (seconds)</label>
      <input type="number" id="database-torrent-status-update-interval" v-model="settings.database.torrent_info_update_interval">
    </div>

    <div class="flex flex-col">
      <label for="email-verification-enabled">Email Verification</label>
      <select id="email-verification-enabled" v-model="settings.mail.email_verification_enabled">
        <option :value="true">True</option>
        <option :value="false">False</option>
      </select>
    </div>

    <template v-if="settings.mail.email_verification_enabled">
      <div class="flex flex-col">
        <label for="email-server">Email Server</label>
        <input type="text" id="email-server" v-model="settings.mail.server">
      </div>

      <div class="flex flex-col">
        <label for="email-server-port">Email Server Port</label>
        <input type="number" id="email-server-port" v-model="settings.mail.port">
      </div>

      <div class="flex flex-col">
        <label for="email-server-username">Email Server Username</label>
        <input type="text" id="email-server-username" v-model="settings.mail.username">
      </div>

      <div class="flex flex-col">
        <label for="email-server-password">Email Server Password</label>
        <input type="text" id="email-server-password" v-model="settings.mail.password">
      </div>

      <div class="flex flex-col">
        <label for="email-server-from">Email Server From</label>
        <input type="text" id="email-server-from" v-model="settings.mail.from">
      </div>

      <div class="flex flex-col">
        <label for="email-server-reply-to">Email Server Reply To</label>
        <input type="text" id="email-server-reply-to" v-model="settings.mail.reply_to">
      </div>
    </template>

  </div>
</template>

<script setup lang="ts">
import {PropType} from "@vue/runtime-core";
import {Settings} from "torrust-index-types-lib";

const props = defineProps({
  settings: {
    type: Object as PropType<Settings>,
    required: true
  }
})
</script>

<style scoped>
label {
  @apply p-2 w-full text-themeText/50;
}

input, select {
  @apply p-2.5 w-full bg-secondary/25 text-themeText placeholder-themeText/50 border-2 border-secondary hover:border-tertiary rounded-2xl duration-200 cursor-pointer;
}
</style>
