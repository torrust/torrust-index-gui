<template>
  <div>

    <Navbar />

    <div class="flex flex-col w-full max-w-full">

      <div class="my-6 mx-auto py-0 px-3 md:px-8 flex flex-col grow w-full">
        <router-view />
      </div>

      <Footer />

      <AuthenticationModal />

    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

import Sidebar from './navigation/Sidebar.vue'
import Navbar from './navigation/Navbar.vue'
import Footer from './Footer.vue'
import Breadcrumb from "./Breadcrumb.vue";
import AuthenticationModal from "../views/AuthenticationModal.vue";

export default {
  name: 'Layout',
  computed: {
    ...mapState(['sideBarOpen'])
  },
  components: {
    AuthenticationModal,
    Breadcrumb,
    Sidebar,
    Navbar,
    Footer
  }
}
</script>

<style scoped>

</style>
