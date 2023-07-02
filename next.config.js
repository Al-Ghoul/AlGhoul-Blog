/** @type {import('next').NextConfig} */
const { createContentlayerPlugin } = require('next-contentlayer');

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '/u/**',
            },
        ],
    },
}

const withContentlayer = createContentlayerPlugin({
    // Additional Contentlayer config options
});

module.exports = withContentlayer(nextConfig)