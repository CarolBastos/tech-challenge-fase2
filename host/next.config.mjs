import NextFederationPlugin from "@module-federation/nextjs-mf";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'host-app',
        remotes: {
            WelcomePage: 'welcome_page@http://localhost:8081/remoteEntry.js', // URL correta para o remoteEntry.js
        },
        filename: 'static/chunks/remoteEntry.js',
        extraOptions: {},
      })
    )
    return config
  },
};

export default nextConfig;