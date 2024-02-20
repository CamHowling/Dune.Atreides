/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
        {
            source: '/cardtracker',
            destination: '/',
            permanent: true,
        },
        ]
    },
};

export default nextConfig;
