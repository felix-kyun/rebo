import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs}"],
        plugins: { js },
        extends: ["js/recommended"],
        rules: {
            "no-tabs": "error",
            "no-mixed-spaces-and-tabs": "error",
            "no-unused-vars": "warn",
            "no-console": "off", // Allow console statements
            "no-undef": "error",
            "no-redeclare": "error",
            "no-shadow": "error",
            "no-var": "error", // Prefer let/const over var
            "prefer-const": "error", // Prefer const for variables that are not reassigned
            eqeqeq: "error", // Enforce strict equality
            curly: ["error", "multi-line"], // Enforce consistent brace style for all control statements
            semi: ["error", "always"], // Enforce semicolons
            quotes: ["error", "double"], // Enforce double quotes
            indent: ["error", 4], // Enforce tab indentation
        },
    },
    {
        files: ["**/*.{js,mjs,cjs}"],
        languageOptions: { globals: globals.node },
    },
]);
