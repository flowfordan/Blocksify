/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');
const nextConfig = {
  webpack: (config, options) => {
    if (config.resolve.plugins) {
      config.resolve.plugins.push(new TsconfigPathsPlugin());
    } else {
      config.resolve.plugins = [new TsconfigPathsPlugin()];
    }
    //
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
  sassOptions: {
    loadPaths: [path.join(__dirname, 'styles/')],
  },
  output: process.env.BUILD_STANDALONE === 'true' ? 'standalone' : undefined,
};

module.exports = nextConfig;
