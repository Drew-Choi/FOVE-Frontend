/* eslint-disable no-undef */
module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    overrides: [],
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: ['react'],
    rules: {
      'react/prop-types': 'off',
      //아래꺼는 나중에 뺴야함
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'off',
    },
  };
  