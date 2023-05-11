/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'e7.pngegg.com',
        port: '',
        pathname: '/**/**',
      },
    ],
  }
}

module.exports = nextConfig
