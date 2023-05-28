/** @type {import('next').NextConfig} */
const withTM = require("next-transpile-modules")(["components", "utils"]);

const nextConfig = withTM({
  reactStrictMode: true,
  images: {
    domains: ["raw.githubusercontent.com"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/pokemons",
        permanent: true,
      },
    ];
  },
});

module.exports = nextConfig;
