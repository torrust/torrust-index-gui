import { Database } from "sqlite3";

export interface DatabaseConfig {
    filepath: string; // Relative path from project root to the SQLite database file
}
export interface DatabaseQuery {
  query: string;
  params: Array<string | number | boolean>;
}

export const runDatabaseQuery = ({ query, params }: DatabaseQuery, config: DatabaseConfig): Promise<any> => {
  return new Promise((resolve, reject) => {
    const db = new Database(config.filepath, (err) => {
      if (err) {
        reject(err.message);
      }
    });

    db.get(query, params, function (err, row) {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });

    db.close((err) => {
      if (err) {
        reject(err);
      }
    });
  });
};
