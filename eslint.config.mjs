import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";

export default [
  js.configs.recommended,
  reactPlugin.configs.flat.recommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "prettier/prettier": "error",
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  prettierConfig,
];
