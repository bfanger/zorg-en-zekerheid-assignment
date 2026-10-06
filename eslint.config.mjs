//@ts-check
import next from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import ts from "typescript-eslint";
import { defineConfig } from "eslint/config";
import packageJson from "./package.json" with { type: "json" };
import "eslint-plugin-only-warn";

export default defineConfig([
  next,
  nextTs,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
  ts.configs.eslintRecommended,
  ...ts.configs.recommendedTypeChecked,
  ...ts.configs.stylisticTypeChecked,
  {
    settings: {
      react: { version: packageJson.dependencies.react },
    },
    rules: {
      "prefer-template": "warn",
      "object-shorthand": "warn",
      "react/no-unknown-property": "warn",
      "no-console": ["warn", { allow: ["info", "warn", "error"] }],
      "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
    },
  },
  {
    ignores: [".next/", ".pnpm-store/", "coverage/"],
  },
]);
