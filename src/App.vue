<template>
  <div id="app">
    <Toast/>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import Toast from "./components/Toast.vue";
import Navbar from "./components/navigation/Navbar.vue";
import './main.css';

export default {
  name: 'App',
  components: {Toast, Navbar},
  beforeMount() {
    this.$store.dispatch('getPublicSettings');
    this.$store.dispatch('getSiteName');
    this.$store.dispatch('renewToken');
  },
  watch:{
    $route (to, from){
      this.$store.dispatch('getPublicSettings');
      this.$store.dispatch('getCategories');
      this.$store.dispatch('getSiteName');
      this.$store.dispatch('renewToken');
    }
  }
}
</script>

<style>
html {
  @apply bg-slate-900 dark:bg-dark-900;
}

input.input, select.input {
  @apply px-4 py-3.5 block w-full max-w-xl bg-transparent autofill:bg-transparent text-slate-200 dark:text-dark-200 placeholder-slate-400 dark:placeholder-dark-400 font-medium border-2 border-slate-800 dark:border-dark-800 hover:border-slate-600 dark:hover:border-dark-600 focus:border-slate-400 dark:focus:border-dark-400 text-sm rounded-2xl outline-0 transition duration-200;
}

label.input-label {
  @apply block mb-2 text-sm font-medium text-slate-400 dark:text-dark-400;
}
</style>
