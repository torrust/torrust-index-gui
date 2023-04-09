<template>
  <div class="px-2 lg:px-0" @click.self="close">
    <div class="px-6 py-6 text-neutral-content/50 rounded-2xl mx-auto w-auto max-w-md">
      <h2 class="text-2xl mb-4 font-semibold text-center text-neutral-content">
        {{ state === State.Signup ? "Sign up" : "Sign in" }}
      </h2>
      <form
        class="space-y-3"
        @submit.prevent="submit"
      >
        <FormInputText label="Username" v-model="form.username" required />
        <template v-if="state === State.Signup && settings.email_on_signup !== Requirement.None">
          <FormInputText label="Email" v-model="form.email" :required="settings.email_on_signup === Requirement.Required" />
        </template>
        <FormInputText :type="'password'" label="Password" v-model="form.password" required />
        <template v-if="state === State.Signup">
          <FormInputText label="Repeat password" v-model="form.confirm_password" required />
        </template>
        <button type="submit" class="btn btn-primary w-full">Sign {{ state === State.Signup ? 'up' : 'in' }}</button>
      </form>
      <div class="relative mt-6">
        <div class="flex relative justify-center text-sm">
          <template v-if="state === State.Signup">
            <button class="px-2 font-semibold text-neutral-content/50 hover:text-neutral-content duration-200" @click="toggleState">
              Already have an account? Sign in
            </button>
          </template>
          <template v-else>
            <button class="px-2 font-semibold text-neutral-content/50 hover:text-neutral-content duration-200" @click="toggleState">
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
import { Requirement } from "torrust-index-types-lib";
import { notify } from "notiwind-ts";
import { onMounted, ref, useAuthenticationModal, useRestApi, useRuntimeConfig, useSettings } from "#imports";

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

const config = useRuntimeConfig();
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
  signup: Boolean
});

onMounted(() => {
  if (props.signup) {
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
        group: "foo",
        title: "Success",
        text: "You were logged in!"
      }, 4000);

      authModalOpen.value = false;
    })
    .catch((err) => {
      notify({
        group: "foo",
        title: "Error",
        text: err.response.data.error
      }, 4000); // 4s
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
        group: "foo",
        title: "Success",
        text: "Your account was registered!"
      }, 4000); // 4s
    })
    .catch((err) => {
      notify({
        group: "foo",
        title: "Error",
        text: err.response.data.error
      }, 4000); // 4s
    });
}
</script>

<style scoped>

</style>
