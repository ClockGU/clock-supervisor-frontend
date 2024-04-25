module.exports = {
  root: true,
  env: {
    node: true,
    es2022: true
  },
  extends: ["plugin:vue/vue3-recommended", "prettier"],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: false
  }
};
