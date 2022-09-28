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
  @apply bg-slate-900;
}

input.input, select.input {
  /*@apply py-2 px-4 w-full text-white bg-slate-800 border border-slate-700 rounded-md text-sm shadow-sm cursor-pointer placeholder-slate-400 hover:border-sky-500 focus:bg-slate-800 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition duration-200;*/
  @apply px-4 py-3.5 block w-full max-w-xl bg-transparent text-slate-200 placeholder-slate-400 font-medium border-2 border-slate-800 hover:border-slate-600 focus:border-slate-400 text-sm rounded-2xl outline-0 duration-200;
}

label.input-label {
  @apply block mb-2 text-sm font-medium text-slate-400;
}
</style>
