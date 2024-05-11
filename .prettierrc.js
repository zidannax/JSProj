module.exports = {
  proseWrap: 'always',
  singleQuote: true,
  trailingComma: 'all',
  semi: false,
  overrides: [
    {
      files: 'packages/@JSProj/angular/**',
      options: {
        semi: true,
      },
    },
  ],
}
