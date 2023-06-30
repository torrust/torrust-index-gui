<template>
  <div class="px-2 lg:px-0" @click.self="close">
    <div class="w-auto max-w-md px-6 py-6 mx-auto text-neutral-content/50 rounded-2xl">
      <h2 class="mb-4 text-2xl font-semibold text-center text-neutral-content">
        {{ state === State.Signup ? "Sign up" : "Sign in" }}
      </h2>
      <form
        class="space-y-3"
        @submit.prevent="submit"
      >
        <FormInputText v-model="form.username" label="Username" name="username" required />
        <template v-if="state === State.Signup && settings.email_on_signup !== EmailOnSignup.None">
          <FormInputText v-model="form.email" label="Email" name="email" :required="settings.email_on_signup === EmailOnSignup.Required" />
        </template>
        <FormInputText v-model="form.password" :type="'password'" label="Password" name="password" required />
        <template v-if="state === State.Signup">
          <FormInputText v-model="form.confirm_password" label="Repeat password" name="confirm_password" required />
        </template>
        <button type="submit" name="submit" data-cy="submit" class="w-full btn btn-primary">
          Sign {{ state === State.Signup ? 'up' : 'in' }}
        </button>
      </form>
      <div class="relative mt-6">
        <div class="relative flex justify-center text-sm">
          <template v-if="state === State.Signup">
            <button class="px-2 font-semibold duration-200 text-neutral-content/50 hover:text-neutral-content" @click="toggleState">
              Already have an account? Sign in
            </button>
          </template>
          <template v-else>
            <button class="px-2 font-semibold duration-200 text-neutral-content/50 hover:text-neutral-content" @click="toggleState">
              Don't have an account? Sign up
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Ref } from "vue";
import { EmailOnSignup } from "torrust-index-types-lib";
import { notify } from "notiwind-ts";
import { loginUser, onMounted, ref, useAuthenticationModal, useRestApi, useRuntimeConfig, useSettings } from "#imports";

enum State {
  Login,
  Signup
}

type Form = {
  username: string,
  email: string,
  password: string,
  confirm_password: string
}

const rest = useRestApi();
const authModalOpen = useAuthenticationModal();
const settings = useSettings();

const state: Ref<State> = ref(State.Login);
const form: Ref<Form> = ref({
  username: "",
  email: "",
  password: "",
  confirm_password: ""
});

const props = defineProps({
  isSignupForm: Boolean
});

onMounted(() => {
  if (props.isSignupForm) {
    state.value = State.Signup;
  }
});

function toggleState () {
  switch (state.value) {
  case State.Login:
    state.value = State.Signup;
    break;
  case State.Signup:
    state.value = State.Login;
    break;
  }
}

function close () {
  authModalOpen.value = false;
}

function submit () {
  switch (state.value) {
  case State.Login:
    login();
    break;
  case State.Signup:
    signup();
    break;
  }
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

function signup () {
  rest.value.user.registerUser({
    username: form.value.username,
    email: form.value.email,
    password: form.value.password,
    confirm_password: form.value.confirm_password
  })
    .then(() => {
      notify({
        group: "success",
        title: "Success",
        text: "Your account was registered!"
      }, 4000); // 4s
    })
    .catch((err) => {
      notify({
        group: "error",
        title: "Error",
        text: `Registration failed. ${err.message}.`
      }, 10000);
    });
}
</script>

<style scoped>

</style>
