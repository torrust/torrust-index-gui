<template>
  <div
    class="fixed top-0 left-0 z-30 flex flex-col justify-center w-full min-h-screen bg-base-100/50"
    :class="{hidden: !registrationModalOpen}"
    style="backdrop-filter: blur(20px);"
    @click.self="close"
  >
    <div>
      <RegistrationForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRegistrationModal } from "#imports";

const registrationModalOpen = useRegistrationModal();

function close () {
  registrationModalOpen.value = false;
}
</script>

<style scoped>

</style>
