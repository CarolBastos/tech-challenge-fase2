const NextFederationPlugin = require('@module-federation/nextjs-mf').NextFederationPlugin;

module.exports = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    if (!isServer) {
      config.plugins.push(
        new NextFederationPlugin({
          name: 'dashboard', // Nome do seu micro frontend
          filename: 'static/chunks/remoteEntry.js', // Local do arquivo gerado com o módulo federado
          exposes: {
            './index': './src/pages/index', // Aqui você expõe a página. O primeiro valor é a chave que você usará para importar, e o segundo é o caminho do arquivo.
          },
          shared: ['react', 'react-dom', 'react/jsx-dev-runtime'], // Dependências compartilhadas
        })
      );
    }
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
