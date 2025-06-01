/**
 * ESLint Configuration
 * Defines code quality and style rules for the React application
 *
 * Configuration includes:
 * - JavaScript/JSX linting rules
 * - React Hooks linting
 * - React Refresh rules for development
 * - Browser environment globals
 */
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  // Ignore build output directory
  { ignores: ["dist"] },
  {
    // Target JavaScript and JSX files
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser, // Include browser globals
      parserOptions: {
        ecmaVersion: "latest",
        ecmaFeatures: { jsx: true }, // Enable JSX support
        sourceType: "module",
      },
    },
    // Configure React-specific plugins
    plugins: {
      "react-hooks": reactHooks, // Enable React Hooks linting
      "react-refresh": reactRefresh, // Enable Fast Refresh support
    },
    // Define linting rules
    rules: {
      ...js.configs.recommended.rules, // Include recommended JS rules
      ...reactHooks.configs.recommended.rules, // Include React Hooks rules
      // Allow unused variables that start with uppercase or underscore
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      // Configure React Refresh rules
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
    },
  },
];
