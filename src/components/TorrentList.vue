<template>
  <div class="col-span-12">
    <div class="overflow-auto lg:overflow-visible ">
      <table class="table w-full text-gray-400 border-separate space-y-6 text-sm whitespace-nowrap">
        <thead class="text-black text-center">
        <tr>
          <th class="text-left">Name</th>
          <th class="">Seeders</th>
          <th class="">Leechers</th>
          <th class="">Uploaded</th>
          <th class="">Size</th>
          <th class="">Uploader</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(torrent, index) in torrents" :key="index"
            @click="$router.push({path: torrent.torrent_id.toString(), append: true})"
            class="text-center cursor-pointer duration-100 hover:bg-blue-100"
        >
          <td class="text-black font-bold text-left">
<!--            <div class="flex flex-row items-center">-->
<!--              <img class="rounded-lg h-12 w-12 object-cover" :src="torrent.image" :alt="torrent.name">-->
<!--              <div class="ml-3 text-black font-bold">-->
<!--                {{ torrent.title }}-->
<!--              </div>-->
<!--            </div>-->
            {{ torrent.title }}
          </td>
          <td class="text-green-400 font-bold">
            {{ torrent.seeders }}
          </td>
          <td class="text-red-400 font-bold">
            {{ torrent.leechers }}
          </td>
          <td class="">
            {{ timeSince(torrent.upload_date) }} ago
          </td>
          <td class="text-black">
            {{ fileSize(torrent.file_size) }}
          </td>
          <td class="text-black font-bold">
            {{ torrent.uploader }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "TorrentList",
  props: {
    torrents: Array,
  },
  data: () => ({
    // torrents: [
    //   {
    //     name: "The.Suicide.Squad.2021.1080p.WEBRip.x264-RARBG",
    //     seeders: 13164,
    //     leechers: 4391,
    //     date: Date.now(),
    //     size: 2500000000,
    //     uploader: "TheMorozko",
    //     image: "https://lx1.dyncdn.cc/cdn/f1/f171fca83dbbcbcbd0dfedee5f27b4c3.jpg"
    //   },
    //   {
    //     name: "Jungle.Cruise.2021.1080p.WEBRip.x264-RARBG",
    //     seeders: 7519,
    //     leechers: 1205,
    //     date: Date.now(),
    //     size: 324500000,
    //     uploader: "Warm Beer",
    //     image: "https://lx1.dyncdn.cc/cdn/a2/a2075634828053a442fab660fe1cf33e.jpg"
    //   },
    //   {
    //     name: "Loki.S01E06.For.All.Time.Always.1080p.DSNP.WEBRip.DDP5.1.x264-TOMMY",
    //     seeders: 4551,
    //     leechers: 602,
    //     date: Date.now(),
    //     size: 2000000000,
    //     uploader: "Dakshvv",
    //     image: "https://dyncdn.me/static/20/tvdb/347843_banner_optimized.jpg"
    //   },
    //   {
    //     name: "Fast.and.Furious.F9.The.Fast.Saga.2021.1080p.WEBRip.x264-RARBG",
    //     seeders: 6888,
    //     leechers: 1326,
    //     date: Date.now(),
    //     size: 2700000000,
    //     uploader: "Warm Beer",
    //     image: "https://www.moviemeter.nl/images/cover/1128000/1128280.jpg"
    //   }
    // ]
  })
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

tr th,
tr td {
  @apply p-2;
}

//tr td {
//  @apply border-t-2 border-b-2 border-gray-200;
//}
//
//
//tr td:nth-child(n+6) {
//  border-radius: 0 .625rem .625rem 0;
//  @apply border-r-2;
//}
//
//tr td:nth-child(1) {
//  border-radius: .625rem 0 0 .625rem;
//  @apply border-l-2;
//}
</style>
