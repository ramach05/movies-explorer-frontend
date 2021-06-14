module.exports = {
  env: {
    es6: true,
    browser: true,

  },

  extends: ['airbnb', 'airbnb/hooks'],

  plugins: [
    'import',
    'jsx-a11y',
    'react',
    'react-hooks',
  ],

  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }], // ошибки jsx в js файлах
    'react/prop-types': 0,
  },
};
