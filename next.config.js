/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images:{
    domains:['images.unsplash.com','images.pexels.com','a0.muscache.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  }
}

module.exports = nextConfig
