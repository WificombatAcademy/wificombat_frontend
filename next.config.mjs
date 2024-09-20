/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          "res.cloudinary.com",
          "wificombatacademy.com",
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
          {
            protocol: "https",
            hostname: "api",  // Assuming 'api' is the correct hostname
            pathname: "/v1/sites/default/files/styles/medium/public/**",
          },
        ],
      },
};

export default nextConfig;