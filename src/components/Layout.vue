<template>
  <div class="leading-normal tracking-normal" id="main-body">
    <div class="flex flex-wrap">

      <Sidebar />

      <div class="w-full bg-white pl-0 lg:pl-64 min-h-screen" :class="sideBarOpen ? 'overlay' : ''" id="main-content">

        <Navbar />

        <div class="p-6 mb-10">
          <Breadcrumb />
          <router-view />
        </div>

        <Footer />

      </div>
    </div>
    <AuthenticationModal />
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Sidebar from './navigation/Sidebar'
import Navbar from './navigation/Navbar'
import Footer from './Footer'
import Breadcrumb from "@/components/Breadcrumb";
import AuthenticationModal from "../views/AuthenticationModal";

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
