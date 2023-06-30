<template>
  <div class="flex flex-col items-center">
    <label class="w-full label">
      <span class="self-start label-text">{{ props.label }}</span>
    </label>
    <input
      :type="props.type"
      :placeholder="props.placeholder"
      :name="props.name"
      :value="modelValue"
      :data-cy="props.name"
      class="w-full border-2 input input-bordered rounded-2xl"
      :required="props.required"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);

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
  name: {
    type: String,
    required: false,
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
