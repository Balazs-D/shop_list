const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  // parserOptions: { project: ['./tsconfig.json'] },
  plugins: ["unused-imports"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? WARN : OFF,
    "no-alert": process.env.NODE_ENV === "production" ? WARN : OFF,
    "no-debugger": ERROR,
    "no-use-before-define": OFF,
    "@typescript-eslint/no-use-before-define": ["error"],
    "@typescript-eslint/no-unused-vars": [WARN, { ignoreRestSiblings: true }],
  },
  ignorePatterns: ["src/**/*.spec.ts"],
};
