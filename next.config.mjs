/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // fully static site -> ./out
  images: { unoptimized: true },
};
export default nextConfig;
