/**@type {import('next').NextConfig} */
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

export default (async () => {
  const { withTina } = await import("tinacms");
  return withTina(nextConfig);
})();