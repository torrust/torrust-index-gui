<template>
  <div class="flex flex-col items-center">
    <label class="label w-full">
      <span class="label-text self-start">{{ props.label }}</span>
    </label>
    <input
      :type="props.type"
      :placeholder="props.placeholder"
      :value="modelValue"
      class="input input-bordered border-2 rounded-2xl w-full"
      :required="props.required"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    required: false,
    default: () => "text"
  },
  label: {
    type: String,
    required: true,
    default: () => ""
  },
  placeholder: {
    type: String,
    required: false,
    default: () => ""
  },
  modelValue: {
    type: String,
    required: true
  },
  required: {
    type: Boolean,
    required: false,
    default: () => false
  }
});
</script>

<style scoped>

</style>
