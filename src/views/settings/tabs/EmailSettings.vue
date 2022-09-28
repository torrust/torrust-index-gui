<template>
  <div id="email-settings" class="flex flex-col gap-6">

    <h2 class="text-3xl font-medium text-slate-200">Email Settings</h2>

    <div>
      <label for="email-verification-enabled" class="input-label">Email Verification</label>
      <select id="email-verification-enabled" class="input" v-model="settings.mail.email_verification_enabled">
        <option v-for="option in EmailVerification" :value="option.value">{{ option.name }}</option>
      </select>
    </div>

    <template v-if="settings.mail.email_verification_enabled">
      <div>
        <label for="email-server" class="input-label">Email Server</label>
        <input type="text" id="email-server" class="input" v-model="settings.mail.server">
      </div>

      <div>
        <label for="email-server-port" class="input-label">Email Server Port</label>
        <input type="number" id="email-server-port" class="input" v-model="settings.mail.port">
      </div>

      <div>
        <label for="email-server-username" class="input-label">Email Server Username</label>
        <input type="text" id="email-server-username" class="input" v-model="settings.mail.username">
      </div>

      <div>
        <label for="email-server-password" class="input-label">Email Server Password</label>
        <input type="text" id="email-server-password" class="input" v-model="settings.mail.password">
      </div>

      <div>
        <label for="email-server-from" class="input-label">Email Server From</label>
        <input type="text" id="email-server-from" class="input" v-model="settings.mail.from">
      </div>

      <div>
        <label for="email-server-reply-to" class="input-label">Email Server Reply To</label>
        <input type="text" id="email-server-reply-to" class="input" v-model="settings.mail.reply_to">
      </div>
    </template>

  </div>
</template>

<script>
export default {
  name: "EmailSettings",
  props: ['settings'],
  data: () => ({
    EmailVerification: [{ name: "Enabled", value: true }, { name: "Disabled", value: false }],
  })
}
</script>

<style scoped>

</style>
