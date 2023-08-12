/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },

  swcMinify: true,
  reactStrictMode: true,

  // Uncoment to add domain whitelist
  images: {
    domains: [
      'images.unsplash.com',
      // cloudinary
      'res.cloudinary.com',
    ],
  },

  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },

  // SVGR
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            typescript: true,
            icon: true,
          },
        },
      ],
    })

    return config
  },
}

const { withSuperjson } = require('next-superjson')
module.exports = withSuperjson()(nextConfig)
