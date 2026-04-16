/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'export', // Removed as we are moving to a live server
    reactStrictMode: true,
    optimizeFonts: true,
    images: {
        minimumCacheTTL: 15000000,
    },
};

export default nextConfig;
