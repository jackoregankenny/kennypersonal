/** @type {import('next').NextConfig} */
const { withTina } = require("tinacms");

const nextConfig = {
  images: {
    domains: [
      "api.microlink.io", // Microlink Image Preview
    ],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = withTina(nextConfig);