const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: "header",
        remotes: {},
        filename: "static/chunks/remoteEntry.js",
        remotes: {Investment: "investment@http://localhost:8080/remoteEntry.js"},
        shared: {},
      })
    );
    return config;
  },
};

module.exports = nextConfig;
