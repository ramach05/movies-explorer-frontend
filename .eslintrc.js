module.exports = {
  env: {
    browser: true,
    jest: true,
  },

  extends: ['airbnb', 'airbnb/hooks'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }], // ошибки jsx в js файлах
  },
};
