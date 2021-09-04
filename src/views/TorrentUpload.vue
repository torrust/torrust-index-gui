<template>
  <div
      class="flex overflow-auto fixed top-0 left-0 z-30 flex-col justify-center w-full h-screen bg-black bg-opacity-50"
      @click.self="closeModal"
  >
    <div class="mx-auto mt-8 w-11/12 h-full sm:w-full sm:max-w-5xl">

      <div
          class="relative px-4 py-12 mx-auto mb-4 max-w-3xl bg-white shadow xl:py-8 sm:px-6 lg:px-8 xl:max-w-2xl md:rounded-lg">
        <button
            @click="closeModal"
            class="absolute top-0 right-0">
          <XIcon class="m-2 xl:m-5"/>
        </button>

        <div>
          <h1 class="pb-2 mb-4 text-xl font-bold text-gray-900 break-all border-b md:text-2xl">New torrent</h1>

          <form class="space-y-4">
            <div>
              <label for="email" class="block font-medium text-gray-700">
                Title
              </label>
              <div class="mt-1">
                <input id="email" name="email" type="email" autocomplete="email"
                       class="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm">
              </div>
            </div>

            <div>
              <label for="about" class="block font-medium text-gray-700">
                Description
              </label>
              <div class="mt-1">
                <textarea id="about" name="about" rows="8"
                          class="block w-full rounded-md border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"></textarea>
              </div>
              <p class="mt-2 text-sm text-gray-500">Markdown is supported.</p>
            </div>

            <CategorySelect/>
            <div>
              <label class="block font-medium text-gray-700">
                Cover picture
              </label>
              <FileUpload type="image" accept="image/*" />
            </div>

            <div>
              <label class="block font-medium text-gray-700">
                Torrent
              </label>
              <FileUpload sub-title="Only .torrent files allowed" accept=".torrent" />
            </div>

            <div class="py-3 sm:flex sm:flex-row-reverse">
              <button type="button" class="button bg-green-600 text-white hover:bg-green-700">
                Upload torrent
              </button>
              <button type="button" class="mt-3 button bg-white border border-gray-300 text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {XIcon} from "@vue-hero-icons/solid";
import FileUpload from "@/components/torrent-upload/FileUpload";
import CategorySelect from "@/components/torrent-upload/CategorySelect";

export default {
  name: "TorrentDetail",
  components: {CategorySelect, FileUpload, XIcon},
  data: () => ({
    cover: null,
    torrent: null,
  }),
  mounted() {
    document.body.classList.add("modal-open");
  },
  beforeDestroy() {
    document.body.classList.remove("modal-open");
  },
  methods: {
    closeModal() {
      this.$router.go(-1);
    },
  },
}
</script>

<style scoped>
.button {
  @apply w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 text-base font-medium sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm;
}
</style>
