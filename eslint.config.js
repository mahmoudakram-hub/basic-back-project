/** @format */

// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["src/**/*.ts"],
    rules: {
      semi: "error",
    },
  },
]);
