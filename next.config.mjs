/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          "res.cloudinary.com",
          "tailwindui.com",
          "flagsapi.com",
          "images.unsplash.com",
          "source.unsplash.com",
          "s3-alpha-sig.figma.com",
        ],
        remotePatterns: [
          {
            protocol: "https",
            hostname: "www.google.com",
          },
        ],
      },
};

export default nextConfig;