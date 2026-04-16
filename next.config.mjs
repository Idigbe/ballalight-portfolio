/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', 
    reactStrictMode: true,
    optimizeFonts: true,
    images: {
        minimumCacheTTL: 15000000,
    },
};

export default nextConfig;
