import { v4 as uuidv4 } from "uuid";

export type TestTorrentInfo = {
    id: string,
    title: string,
    description: string,
    filename: string,
    path: string
  };

// It generates the information for a random torrent file.
// You can download the torrent file (meta-info file) from the server and saved
// in the `cypress/fixtures/torrents` folder.
export function generateRandomTestTorrentInfo (): TestTorrentInfo {
  const torrentId = uuidv4();
  const torrentFilename = `file-${torrentId}.txt.torrent`;

  return {
    id: torrentId,
    title: `title-${torrentId}`,
    description: `description-${torrentId}`,
    filename: `file-${torrentId}.txt.torrent`,
    path: `cypress/fixtures/torrents/${torrentFilename}`
  };
}
