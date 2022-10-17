<template>
  <div
      class="flex fixed top-0 left-0 z-30 flex-col justify-center w-full min-h-screen bg-slate-900/90 dark:bg-black/90"
      :class="{hidden: !authModalOpen}"
      @click.self="close"
  >
    <div class="px-2 lg:px-0" @click.self="close">

      <div class="px-6 mb-6 mx-auto max-w-md text-center">
        <h1 class="text-white text-3xl font-bold">{{ $store.state.settings.website.name }}</h1>
      </div>

      <div class="px-6 py-6 text-slate-400 dark:text-dark-400 bg-slate-800 dark:bg-dark-900 rounded-2xl drop-shadow-lg mx-auto w-auto max-w-md">

        <transition
            enter-active-class="transition ease-out duration-100 transform"
            enter-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75 transform"
            leave-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        >
          <h2 v-if="isSignUp" class="text-xl mb-4 font-semibold text-center text-slate-400 dark:text-dark-200">Sign up</h2>
          <h2 v-else class="text-xl mb-4 font-semibold text-center text-slate-400 dark:text-dark-200">Sign in</h2>
        </transition>

        <form
            @submit.prevent="submit"
            class="space-y-6"
        >

          <div>
            <label for="username" class="input-label">Username</label>
            <div class="mt-1">
              <input v-model="form.username"
                     id="username" name="username" type="text"
                     required
                     class="input">
            </div>
          </div>

          <div>
            <transition
                enter-active-class="transition ease-out duration-100 transform"
                enter-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75 transform"
                leave-class="opacity-100 scale-100"
                leave-to-class="opacity-0 scale-95"
            >
              <div v-if="isSignUp && $store.state.publicSettings.email_on_signup !== 'None'">
                <label for="email" class="input-label">Email address</label>
                <div class="mt-1">
                  <input v-model="form.email"
                         id="email" name="email" type="text" autocomplete="email" :required="$store.state.publicSettings.email_on_signup === 'Required'"
                         class="input">
                </div>
              </div>
            </transition>
          </div>

          <div>
            <div class="flex justify-between">
              <label for="password" class="input-label">
                Password
              </label>
              <!--              <div v-if="!isSignUp" class="mt-2 text-xs text-right">-->
              <!--                <a href="#" class="font-medium text-primary-600 hover:text-primary-500">-->
              <!--                  Forgot your password?-->
              <!--                </a>-->
              <!--              </div>-->
            </div>
            <div class="mt-1">
              <input v-model="form.password"
                     id="password" name="password" type="password"
                     :autocomplete="[isSignUp ? 'new-password' : 'current-password']" required class="input">
            </div>
          </div>

          <!-- Password confirmation for signup -->
          <transition
              enter-active-class="transition ease-out duration-100 transform"
              enter-class="opacity-0 scale-95"
              enter-to-class="opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75 transform"
              leave-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
          >
            <div v-if="isSignUp">
              <label for="password" class="input-label">
                Confirm password
              </label>
              <div class="mt-1">
                <input v-model="form.confirm_password"
                       id="password-repeat" name="password-repeat" type="password"
                       autocomplete="new-password" required class="input">
              </div>
            </div>
          </transition>

          <div class="flex flex-row space-x-2">
            <button type="button"
                class="px-3 py-2 w-full justify-center flex flex-row text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-2xl transition duration-200"
                @click="close"
            >
              Cancel
            </button>
            <button type="submit"
                    class="px-3 py-2 w-full justify-center flex flex-row text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-2xl transition duration-200">
              Sign {{ isSignUp ? 'up' : 'in' }}
            </button>
          </div>
        </form>
        <div class="relative mt-6">
          <div class="flex relative justify-center text-sm">
            <button v-if="isSignUp" class="px-2 font-semibold text-slate-400 dark:text-dark-400 hover:text-slate-200 dark:hover:text-dark-200 transition duration-200" @click="toggleMode">
              Already have an account? Sign in
            </button>
            <button v-else class="px-2 font-semibold text-slate-400 dark:text-dark-400 hover:text-slate-200 dark:hover:text-dark-200 transition duration-200" @click="toggleMode">
              Don't have an account? Sign up
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "AuthenticationModal",
  computed: {
    ...mapState({
      authModalOpen: state => state.auth.authModalOpen
    })
  },
  data: () => ({
    isSignUp: false,
    form: {
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  }),
  methods: {
    toggleMode() {
      this.isSignUp = !this.isSignUp;
    },
    submit() {
      if (this.isSignUp) {
        this.$store.dispatch('register', this.form).then(() => {
          this.toggleMode();
        });
      } else {
        this.$store.dispatch('login', {login: this.form.username, password: this.form.password});
      }
    },
    close() {
      this.$store.dispatch('closeAuthModal');
    },
  }
}
</script>

<style scoped>

</style>
