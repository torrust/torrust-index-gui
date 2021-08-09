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
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Sidebar from './Sidebar'
import Navbar from './Navbar'
import Footer from './Footer'
import Breadcrumb from "@/components/Breadcrumb";

export default {
  name: 'Layout',
  computed: {
    ...mapState(['sideBarOpen'])
  },
  components: {
    Breadcrumb,
    Sidebar,
    Navbar,
    Footer
  }
}
</script>

<style scoped>

</style>
