/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withPWA = require('next-pwa')({
    dest: 'public'
})

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    publicRuntimeConfig: {
      API_SERVER_URI: process.env.API_SERVER_URI,
    },
    experimental: {
      scrollRestoration: true,
    },
    images: {
      domains: [
        'neodohaebucket.s3.ap-northeast-2.amazonaws.com',
      ],
    },
}

module.exports = withPlugins(
    [
        [
            withPWA({
                // next.js config
            }),
            {
                pwa: {
                    dest: "public",
                },
            },
        ],
        // 추가 플러그인 작성
    ],
    nextConfig
);