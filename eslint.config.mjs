import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import prettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "dist",
      "coverage",
      ".next",
      ".vercel",
      "**/*.d.ts",
      "tooling/**",
      "turbo/**",
      "node_modules/**",
    ],
  },
  {
    files: ["**/*.{ts,tsx,js,jsx,mjs}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
        },
      ],
      "prettier/prettier": "error",
    },
  },
  prettier,
);
