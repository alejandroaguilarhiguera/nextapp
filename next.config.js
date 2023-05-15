const path = require('path');
const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  localePath: path.resolve('./public/locales'),
  i18n,
};

module.exports = nextConfig;
