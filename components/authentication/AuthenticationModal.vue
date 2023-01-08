<template>
  <div
      class="flex fixed top-0 left-0 z-30 flex-col justify-center w-full min-h-screen bg-primary/50"
      :class="{hidden: !authModalOpen}"
      style="backdrop-filter: blur(20px);"
      @click.self="close"
  >
    <div>
      <AuthenticationForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import {useAuthenticationModal} from "#imports";

const authModalOpen = useAuthenticationModal();

function close() {
  authModalOpen.value = false;
}
</script>

<style scoped>

</style>
