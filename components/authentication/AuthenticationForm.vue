<template>
  <div class="px-2 lg:px-0" @click.self="close">
    <div class="w-auto max-w-md px-6 py-6 mx-auto text-neutral-content/50 rounded-2xl">
      <h2 class="mb-4 text-2xl font-semibold text-center text-neutral-content">
        Sign in
      </h2>
      <form
        class="space-y-3"
        @submit.prevent="submit"
      >
        <FormInputText v-model="form.username" label="Username" name="username" data-cy="login-form-username" required />
        <FormInputText
          v-model="form.password"
          :type="'password'"
          label="Password"
          name="password"
          data-cy="login-form-password"
          required
        />
        <button type="submit" name="submit" data-cy="login-form-submit" class="w-full btn btn-primary">
          Sign In
        </button>
      </form>
      <div class="relative mt-6">
        <div class="relative flex justify-center text-sm">
          <button class="px-2 font-semibold duration-200 text-neutral-content/50 hover:text-neutral-content" @click="goToSignUp">
            Don't have an account? Sign Up
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { notify } from "notiwind-ts";
import { loginUser, ref, useAuthenticationModal, useRegistrationModal } from "#imports";

type Form = {
  username: string,
  email: string,
  password: string,
  confirm_password: string
}

const authModalOpen = useAuthenticationModal();
const registrationModalOpen = useRegistrationModal();

const form: Ref<Form> = ref({
  username: "",
  email: "",
  password: "",
  confirm_password: ""
});

function goToSignUp () {
  close();
  registrationModalOpen.value = true;
}

function close () {
  authModalOpen.value = false;
}

function submit () {
  login();
}

function login () {
  loginUser(form.value.username, form.value.password)
    .then(() => {
      notify({
        group: "success",
        title: "Success",
        text: "You were signed in!"
      }, 4000);

      authModalOpen.value = false;
    })
    .catch((err) => {
      notify({
        group: "error",
        title: "Error",
        text: `Login failed. ${err.message}.`
      }, 10000);
    });
}

</script>

<style scoped>

</style>
