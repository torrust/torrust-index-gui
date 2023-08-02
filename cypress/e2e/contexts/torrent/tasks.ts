// Custom tasks for user context

import { DatabaseConfig, DatabaseQuery, runDatabaseQuery } from "../../common/database";

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
