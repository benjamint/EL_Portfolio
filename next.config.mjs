/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true, ...(process.env.STATIC_EXPORT ? { output: "export" } : {}) };
export default nextConfig;
