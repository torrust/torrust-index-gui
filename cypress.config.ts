import { defineConfig } from "cypress";
import { grantAdminRole, deleteUser } from "./cypress/e2e/contexts/user/tasks";
import { deleteTorrent } from "./cypress/e2e/contexts/torrent/tasks";
import { deleteCategory, addCategory } from "./cypress/e2e/contexts/category/tasks";
import { DatabaseConfig } from "./cypress/e2e/common/database";

function databaseConfig (config: Cypress.PluginConfigOptions): DatabaseConfig {
  return {
    filepath: config.env.db_file_path
  };
}

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents (on, config) {
      on("task", {
        // Category context
        deleteCategory: ({ name }) => {
          return deleteCategory(name, databaseConfig(config));
        },
        addCategory: ({ name }) => {
          return addCategory(name, databaseConfig(config));
        },
        // Torrent context
        deleteTorrent: ({ infohash }) => {
          return deleteTorrent(infohash, databaseConfig(config));
        },
        // User context
        grantAdminRole: ({ username }) => {
          return grantAdminRole(username, databaseConfig(config));
        },
        deleteUser: ({ username }) => {
          return deleteUser(username, databaseConfig(config));
        }
      });
    }
  },
  env: {
    db_file_path: "./storage/index/lib/database/e2e_testing_sqlite3.db"
  }
});
