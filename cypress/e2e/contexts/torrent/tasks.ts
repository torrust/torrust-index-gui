// Custom tasks for user context

import { type DatabaseConfig, type DatabaseQuery, runDatabaseQuery } from "../../common/database";

// Task to grant admin role to a user by username
export const deleteTorrent = async (infohash: string, db_config: DatabaseConfig): Promise<boolean> => {
  try {
    await runDatabaseQuery(deleteTorrentQuery(infohash), db_config);
    return true;
  } catch (err) {
    return await Promise.reject(err);
  }
};

// Database query specifications

function deleteTorrentQuery (infohash: string): DatabaseQuery {
  return {
    query: "DELETE FROM torrust_torrents WHERE info_hash = ?",
    params: [infohash]
  };
}

// Task to delete all torrents from the database before running any test
export const deleteTorrentsInfoFromDatabase = async (db_config: DatabaseConfig): Promise<Boolean> => {
  try {
    await runDatabaseQuery(clearTorrentsTableQuery(), db_config);
    await runDatabaseQuery(clearAnnounceUrlsTableQuery(), db_config);
    await runDatabaseQuery(clearTorrentFilesTableQuery(), db_config);
    await runDatabaseQuery(clearTorrentInfoTableQuery(), db_config);
    await runDatabaseQuery(clearTorrentInfoHashesTableQuery(), db_config);
    await runDatabaseQuery(clearTagLinkTableQuery(), db_config);
    await runDatabaseQuery(clearTrackerStatsTableQuery(), db_config);
    return true;
  } catch (err) {
    return await Promise.reject(err);
  }
};

// Database query specifications
function clearTorrentsTableQuery (): DatabaseQuery {
  return {
    query: "DELETE FROM torrust_torrents",
    params: []
  };
}

function clearAnnounceUrlsTableQuery (): DatabaseQuery {
  return {
    query: "DELETE FROM torrust_torrent_announce_urls",
    params: []
  };
}

function clearTorrentFilesTableQuery (): DatabaseQuery {
  return {
    query: "DELETE FROM torrust_torrent_files",
    params: []
  };
}

function clearTorrentInfoTableQuery (): DatabaseQuery {
  return {
    query: "DELETE FROM torrust_torrent_info",
    params: []
  };
}

function clearTorrentInfoHashesTableQuery (): DatabaseQuery {
  return {
    query: "DELETE FROM torrust_torrent_info_hashes",
    params: []
  };
}

function clearTagLinkTableQuery (): DatabaseQuery {
  return {
    query: "DELETE FROM torrust_torrent_tag_links",
    params: []
  };
}

function clearTrackerStatsTableQuery (): DatabaseQuery {
  return {
    query: "DELETE FROM torrust_torrent_tracker_stats",
    params: []
  };
}
