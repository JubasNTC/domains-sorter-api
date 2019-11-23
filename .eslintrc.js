module.exports = {
  extends: ['standard', 'prettier'],
  plugins: ['standard', 'prettier', 'promise'],
  env: {
    node: true,
  },
  rules: {
    'capitalized-comments': ['error', 'always'],
    'spaced-comment': ['error', 'always'],
  },
};
