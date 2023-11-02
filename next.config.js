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
      'media0.giphy.com',
      'media1.giphy.com',
      'media2.giphy.com',
      'media3.giphy.com',
      'media4.giphy.com',
      'media5.giphy.com',
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
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}

const { withSuperjson } = require('next-superjson')
module.exports = withSuperjson()(nextConfig)
