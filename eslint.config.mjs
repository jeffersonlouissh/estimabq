import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import prettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  prettier,
  //custom rules
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      // 1. Error Prevention
      "no-console": ["warn", { allow: ["warn", "error"] }], // Blocks random logs but permits tracking info
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }], // Crashes build if dead code variables exist
      "no-param-reassign": "error", // Prevents side-effect bugs from mutating input data variables directly
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
