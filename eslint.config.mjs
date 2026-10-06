//@ts-check
import next from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig } from "eslint/config";
import packageJson from "./package.json" with { type: "json" };
import "eslint-plugin-only-warn";

export default defineConfig([
  next,
  nextTs,
  {
    settings: {
      react: { version: packageJson.dependencies.react },
    },
    rules: {
      "prefer-template": "warn",
      "object-shorthand": "warn",
      "react/no-unknown-property": "warn",
      "no-console": ["warn", { allow: ["info", "warn", "error"] }],
    },
  },
  {
    ignores: [".next/", ".pnpm-store/", "coverage/"],
  },
]);
