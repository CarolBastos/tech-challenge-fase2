const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: 'dashboard',
        filename: "static/chunks/remoteEntry.js",
      })
    );

    return config;
  },
}

module.exports = nextConfig
