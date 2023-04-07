<template>
  <div
    class="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-primary/50 hover:border-primary border-dashed rounded-2xl duration-200"
    :class="{'border-primary/50': filedrag, 'bg-primary/50': filedrag, 'border-red-500': error}"
    @dragover="dragover"
    @dragleave="dragleave"
    @drop="dropFile"
  >
    <input
      id="torrent-upload"
      ref="file"
      hidden
      name="torrent-upload"
      type="file"
      class="sr-only"
      :accept="accept"
      @change="onChange"
    >

    <div v-if="filelist.length === 0" class="space-y-1 text-center">
      <DocumentPlusIcon v-if="type === 'file'" class="mx-auto w-12 h-12 text-neutral-content/50" />
      <div class="flex justify-center text-sm text-neutral-content">
        <a
          class="font-medium text-primary cursor-pointer"
          @click="$refs.file.click()"
        >
          <span>Manually upload a file</span>
        </a>
        <p class="pl-1">
          or drag and drop here.
        </p>
      </div>
      <p class="text-xs text-neutral-content/50">
        {{ subTitle }}
      </p>
    </div>

    <ul v-if="filelist.length">
      <li v-for="file in filelist" :key="file.name" class="flex flex-col w-full justify-between items-center gap-2 text-sm">
        <img
          v-if="type === 'image'"
          :src="fileUrl(file)"
          :alt="file.name"
          class="h-20 w-auto"
        >
        <p class="text-neutral-content/50 truncate">
          {{ file.name }}
        </p>
        <a
          class="font-medium text-primary"
          @click="$refs.file.click()"
        >
          <span>Upload a different file.</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { DocumentPlusIcon } from "@heroicons/vue/24/outline";

export default {
  name: "FileUpload",
  components: { DocumentPlusIcon },
  props: {
    type: {
      type: String,
      default: () => "file",
      validator: (value) => {
        return ["file", "image"].includes(value);
      }
    },
    accept: String,
    subTitle: String,
    error: Boolean
  },
  emits: ["onChange"],
  data: () => ({
    filedrag: false,
    filelist: []
  }),
  methods: {
    dragover (event) {
      event.preventDefault();
      this.filedrag = true;
    },
    dragleave () {
      this.filedrag = false;
    },
    dropFile (event) {
      event.preventDefault();
      this.$refs.file.files = event.dataTransfer.files;
      this.onChange();

      this.filedrag = false;
    },
    onChange () {
      this.filelist = [...this.$refs.file.files];
      this.$emit("onChange", [...this.$refs.file.files]);
    },
    fileUrl (file) {
      return URL.createObjectURL(file);
    }
  }
};
</script>

<style scoped>
.button {
  @apply w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 text-base font-medium sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm;
}
</style>
