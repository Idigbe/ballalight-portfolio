/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    optimizeFonts: true,
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "breakoutng-assets.s3.eu-west-2.amazonaws.com",
            },
        ],
        minimumCacheTTL: 15000000,
    },
};

export default nextConfig;
