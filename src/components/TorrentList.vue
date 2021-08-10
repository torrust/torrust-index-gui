<template>
  <div class="col-span-12">
    <div class="overflow-auto lg:overflow-visible ">
      <table class="table w-full text-gray-400 border-separate space-y-6 text-sm">
        <thead class="text-black">
          <tr>
            <th class="p-3 text-left">Name</th>
            <th class="p-3 text-center">Seeders</th>
            <th class="p-3 text-center">Leechers</th>
            <th class="p-3 text-center">Time</th>
            <th class="p-3 text-center">Size</th>
            <th class="p-3 text-center">Uploader</th>
          </tr>
        </thead>
        <tbody>
          <tr class="text-center cursor-pointer duration-100 hover:bg-blue-100" v-for="i in 16" :key="i">
            <td class="p-3">
              <div class="flex flex-row items-center">
                <img class="rounded-lg h-12 w-12  object-cover" src="https://i2.extraimage.info/pix/2021/08/08/712335bc3cf031c553b4f15bb3a79ad9.png" alt="unsplash image">
                <div class="ml-3 text-black font-bold">Borderlands 3: Director's Cut [WB]</div>
              </div>
            </td>
            <td class="p-3">
              <span class="text-green-400 font-bold">1787</span>
            </td>
            <td class="p-3">
              <span class="text-red-400 font-bold">2376</span>
            </td>
            <td class="p-3">
              Today
            </td>
            <td class="p-3">
              <span class="text-black">674 MB</span>
            </td>
            <td class="p-3">
              <span class="text-blue-400 font-bold">Warm Beer</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "TorrentList"
}
</script>

<style lang="scss" scoped>
.table {
  border-spacing: 0 15px;
}

i {
  font-size: 1rem !important;
}

.table tr {
  border-radius: 20px;
}

tr {
  &:hover {
    td {
      @apply duration-100;
      @apply border-blue-400;
    }
  }
}

tr td {
  @apply border-t-2 border-b-2 border-gray-200;
}

tr td:nth-child(n+6) {
  border-radius: 0 .625rem .625rem 0;
  @apply border-r-2;
}

tr td:nth-child(1) {
  border-radius: .625rem 0 0 .625rem;
  @apply border-l-2;
}
</style>
