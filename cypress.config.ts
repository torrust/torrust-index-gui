import { defineConfig } from "cypress";
import { grantAdminRole, deleteUser } from "./cypress/e2e/contexts/user/tasks";
import { deleteTorrent } from "./cypress/e2e/contexts/torrent/tasks";
import { deleteCategory } from "./cypress/e2e/contexts/category/tasks";
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
        grantAdminRole: ({ username }) => {
          return grantAdminRole(username, databaseConfig(config));
        },
        deleteTorrent: ({ infohash }) => {
          return deleteTorrent(infohash, databaseConfig(config));
        },
        deleteUser: ({ username }) => {
          return deleteUser(username, databaseConfig(config));
        },
        deleteCategory: ({ name }) => {
          return deleteCategory(name, databaseConfig(config));
        }
      });
    }
  },
  env: {
    db_file_path: "./storage/database/torrust_index_backend_e2e_testing.db"
  }
});
