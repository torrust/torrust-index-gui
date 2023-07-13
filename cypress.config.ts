import { defineConfig } from "cypress";
import { grantAdminRole } from "./cypress/e2e/contexts/user/tasks";
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
        }
      });
    }
  },
  env: {
    db_file_path: "./storage/database/torrust_index_backend_e2e_testing.db"
  }
});
