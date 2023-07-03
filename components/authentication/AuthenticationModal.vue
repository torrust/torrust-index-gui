<template>
  <div
    class="fixed top-0 left-0 z-30 flex flex-col justify-center w-full min-h-screen bg-base-100/50"
    :class="{hidden: !authenticationModalOpen}"
    style="backdrop-filter: blur(20px);"
  >
    <div>
      <AuthenticationForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthenticationModal } from "#imports";

const authenticationModalOpen = useAuthenticationModal();

function close () {
  authenticationModalOpen.value = false;
}
</script>

<style scoped>

</style>
