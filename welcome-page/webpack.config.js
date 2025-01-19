const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');
const Dotenv = require('dotenv-webpack');

const deps = require("./package.json").dependencies;

const printCompilationMessage = require('./compilation.config.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (_, argv) => ({
  output: {
    publicPath: "http://localhost:8081/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 8081,
    headers: {
      "Access-Control-Allow-Origin": "*",  // Permitir acesso de qualquer origem
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",  // Permitindo cabeçalhos adicionais
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",  // Permitir métodos específicos
    },
    historyApiFallback: true,
    watchFiles: [path.resolve(__dirname, 'src')],
    onListening: function (devServer) {
      const port = devServer.server.address().port

      printCompilationMessage('compiling', port)

      devServer.compiler.hooks.done.tap('OutputMessagePlugin', (stats) => {
        setImmediate(() => {
          if (stats.hasErrors()) {
            printCompilationMessage('failure', port)
          } else {
            printCompilationMessage('success', port)
          }
        })
      })
    }
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.scss$/, // Para arquivos SCSS, se você usar Sass
        use: [
          MiniCssExtractPlugin.loader,  // Extrai CSS para um arquivo
        'css-loader',  // Carrega o CSS
        'postcss-loader',  // Aplica PostCSS
        'sass-loader',  // Compila SCSS para CSS
        ],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              ["@babel/preset-react", { runtime: "automatic" }],
              "@babel/preset-typescript"
            ]
          }
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "welcome_page",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {'./WelcomeLayout' : './src/pages/Layout/WelcomeLayout'},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',  // Nome do arquivo CSS extraído
    }),
  ],
});
