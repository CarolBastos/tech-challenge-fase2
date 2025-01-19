const NextFederationPlugin = require('@module-federation/nextjs-mf').NextFederationPlugin;

module.exports = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    if (!isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'welcome', // Nome da aplicação consumidora
          filename: 'static/chunks/remoteEntry.js',
          exposes:{},
          remotes: {
            dashboard: 'dashboard@http://localhost:3003/_next/static/chunks/remoteEntry.js', // URL correta para o remoteEntry.js
          },
          shared: ['react', 'react-dom', 'react/jsx-dev-runtime'], // Dependências compartilhadas
        })
      );
    }
    return config;
  },
  devServer: {
    port: 3001, // Porta da aplicação consumidora
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*', // Permitir o acesso entre diferentes origens
    },
  },
};