<template>
  <div id="authentication-settings" class="flex flex-col gap-6">

    <h2 class="text-3xl font-medium text-slate-200 dark:text-dark-200">Authentication Settings</h2>

    <div>
      <label for="authentication-email-signup" class="input-label">Email on Signup Form</label>
      <select id="authentication-email-signup" class="input" v-model="settings.auth.email_on_signup">
        <option v-for="option in EmailOnSignup" :value="option.name">{{ option.name }}</option>
      </select>
    </div>

  </div>
</template>

<script>
export default {
  name: "AuthenticationSettings",
  props: ['settings'],
  data: () => ({
    EmailOnSignup: [{ name: "Required" }, { name: "Optional" }, { name: "None" }],
  })
}
</script>

<style scoped>

</style>
