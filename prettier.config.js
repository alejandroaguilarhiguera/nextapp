module.exports = {
    singleQuote: true,
    trailingComma: 'all',
    printWidth: 100,
    plugins: [
      // eslint-disable-next-line global-require
      require('prettier-plugin-tailwindcss'),
      // eslint-disable-next-line global-require
      require('@trivago/prettier-plugin-sort-imports'),
    ],
    tailwindConfig: './tailwind.config.js',
    importOrder: [
      '<THIRD_PARTY_MODULES>',
      '^(~/components|~/utils|~/lib|~/static)/(.*)$',
      '^~/types/(.*)|~/types$',
      '^[./]',
      '^~/styles/(.*)$',
    ],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
  };
  