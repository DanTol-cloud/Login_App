module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['simple-import-sort'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'simple-import-sort/imports': [
      'error',
      {
        groups: [['^react'], ['^antd'], ['^@?\\w'], ['@/(.*)'], ['^[./]']],
      },
    ],
  },
};
