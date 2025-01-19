const NextFederationPlugin = require('@module-federation/nextjs-mf').NextFederationPlugin;

module.exports = {
  reactStrictMode: true,
  webpack(config, options) {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: 'dashboard',
        filename: "static/chunks/remoteEntry.js",
        remotes: {Investment: "investment@http://localhost:8081/remoteEntry.js"}
      })
    );

    return config;
  },
  devServer: {
    port: 3003, // Porta onde o micro frontend ficará exposto
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
