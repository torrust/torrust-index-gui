// Custom tasks for tag context

import { DatabaseConfig, DatabaseQuery, runDatabaseQuery } from "../../common/database";

// Task to delete a tag
export const deleteTags = async (db_config: DatabaseConfig): Promise<any> => {
  try {
    const result = await runDatabaseQuery(deleteTagsQuery(), db_config);
    return {};
  } catch (err) {
    return await Promise.reject(err);
  }
};

// Task to add a new tag
export const addTag = async (name: string, db_config: DatabaseConfig): Promise<string> => {
  try {
    const result = await runDatabaseQuery(addTagQuery(name), db_config);
    return name;
  } catch (err) {
    return await Promise.reject(err);
  }
};

// Database query specifications

function deleteTagsQuery (): DatabaseQuery {
  return {
    query: "DELETE FROM torrust_torrent_tags",
    params: []
  };
}

function addTagQuery (name: string): DatabaseQuery {
  return {
    query: "INSERT INTO torrust_torrent_tags (name) VALUES (?)",
    params: [name]
  };
}
