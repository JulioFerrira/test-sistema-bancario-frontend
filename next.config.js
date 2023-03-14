/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\^(?!tailwind.css).(le|c)ss$/,
    });

    return config;
  },
};

module.exports = nextConfig;
