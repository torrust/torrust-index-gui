// Custom tasks for tag context

import { DatabaseConfig, DatabaseQuery, runDatabaseQuery } from "../../common/database";

// Task to delete a tag
export const deleteTag = async (name: string, db_config: DatabaseConfig): Promise<string> => {
  try {
    const result = await runDatabaseQuery(deleteTagQuery(name), db_config);
    return name;
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

function deleteTagQuery (name: string): DatabaseQuery {
  return {
    query: "DELETE FROM torrust_torrent_tags WHERE name = ?",
    params: [name]
  };
}

function addTagQuery (name: string): DatabaseQuery {
  return {
    query: "INSERT INTO torrust_torrent_tags (name) VALUES (?)",
    params: [name]
  };
}
