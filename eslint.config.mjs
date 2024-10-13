import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { files: ["**/*.js"] },
  {
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
      },
    },
  },
  pluginJs.configs.recommended,
];
