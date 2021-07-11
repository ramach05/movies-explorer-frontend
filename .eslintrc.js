module.exports = {
  env: {
    commonjs: true,
    node: true,
    browser: true,
    es6: true,
    jest: true,
  },

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },

  plugins: [],

  extends: ['airbnb', 'airbnb/hooks'],

  rules: {
    'react/jsx-filename-extension': 0,
    'react/prop-types': 0,
    'no-unused-vars': 1,
    'react/self-closing-comp': ['error', {
      component: true,
      html: false,
    }],
    'jsx-a11y/label-has-associated-control': 0,
    'no-underscore-dangle': 0,
    'no-debugger': 1,
    'global-require': 1,
    'prefer-promise-reject-errors': 0,
    'import/prefer-default-export': 1,
    'react-hooks/exhaustive-deps': 1,
    'no-nested-ternary': 0,
    'max-len': 1,
    'jsx-a11y/no-noninteractive-element-interactions': 1,
    'jsx-a11y/click-events-have-key-events': 0,
  },
};
