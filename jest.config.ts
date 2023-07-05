import { pathsToModuleNameMapper } from "ts-jest";
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
import type { JestConfigWithTsJest } from "ts-jest";
import { compilerOptions } from "./.nuxt/tsconfig.json";

const jestConfig: JestConfigWithTsJest = {
  // [...]
  roots: ["<rootDir>"],
  modulePaths: [compilerOptions.baseUrl], // <-- This will be set to 'baseUrl' value
  moduleFileExtensions: ["js", "ts", "vue"],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths /*, { prefix: '<rootDir>/' } */),
  transform: {
    "^.+\\.(js|jsx|mjs)$": "babel-jest",
    "^.+\\.(ts|tsx)$": ["ts-jest", {
      tsconfig: "<rootDir>/.nuxt/tsconfig.json",
      diagnostics: false
    }],
    ".+\\.(css|scss|png|jpg|svg)$": "jest-transform-stub",
    ".*\\.(vue)$": "@vue/vue3-jest"
  },
  transformIgnorePatterns: [
    "node_modules/(?!(torrust-index-api-lib|nuxt|devalue))"
  ]
};

export default jestConfig;
