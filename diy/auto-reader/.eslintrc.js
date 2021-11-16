module.exports = {
  root: true,
  // parser: "@typescript-eslint/parser",
  // parser: "@typescript-eslint/parser", // // 指定解析器
  "parser": "vue-eslint-parser", // The ESLint custom parser for .vue files.
  // parser: "@typescript-eslint/parser",
  env: {
    node: true,
    browser: true,
    es6: true
  },
  "plugins": ["@typescript-eslint"],
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    '@vue/typescript',
    ],
  globals: { // 设置全局变量
    "wx": true,
  },
  rules: {
    "no-console": "off", // process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "indent": 'off',  // 缩进
    'space-before-function-paren': [2, 'never'],
    // 'vue/array-bracket-spacing': 'error',
    // 'vue/arrow-spacing': 'error',
    // 'vue/block-spacing': 'error',
    // 'vue/brace-style': 'error',
    // 'vue/camelcase': 'error',
    // 'vue/comma-dangle': 'error',
    // 'vue/component-name-in-template-casing': 'error',
    // 'vue/eqeqeq': 'error',
    // 'vue/key-spacing': 'error',
    // 'vue/match-component-file-name': 'error',
    "@typescript-eslint/indent": ["error", 2]
  },
  parserOptions: {
    // You can use parserOptions.parser property to specify a custom parser to parse <script> tags.
    parser: "@typescript-eslint/parser",
    ecmaVersion:2019, //  //ES的版本，默认为5
    sourceType:'module', //指定源代码存在的位置，script | module，默认为script。
  },
  overrides: [
    // {
    //   'files': ['*.vue'], // 解决vue文件和js文件里的缩进冲突
    //   'rules': {
    //     'indent': 2
    //   }
    // },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]  
};
