/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: process.env.API_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'p4jwf926-8000.euw.devtunnels.ms',
    //   },
    // ],
  },
};

export default nextConfig;
