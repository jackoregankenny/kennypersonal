/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "api.microlink.io", // Microlink Image Preview
      "localhost",
      "jackoregankenny.com" // Add any other domains you might use
    ],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['raw-loader'],
  },
};

export default nextConfig;