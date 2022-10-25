/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    DEFAULT_API_KEY: process.env.DEFAULT_API_KEY,
  }
}

module.exports = nextConfig
