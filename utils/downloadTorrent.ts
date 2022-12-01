import {rest} from "torrust-index-api-lib";
import {useRuntimeConfig} from "#app";

const config = useRuntimeConfig();

export async function downloadTorrent(torrentId: number, fileName?: string) {
    if (fileName == undefined) {
        fileName = "torrent";
    }

    rest.torrent.downloadTorrent(config.public.apiBase, torrentId)
        .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${fileName}.torrent`);
            document.body.appendChild(link);
            link.click();
        });
}
