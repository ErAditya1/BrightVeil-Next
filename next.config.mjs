/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
        },
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
        },
        {
          protocol: 'https',
          hostname: 'images.ctfassets.net',
        },
        {
          protocol: 'https',
          hostname: 'letsenhance.io',
        },
        {
          protocol: 'https',
          hostname: 'images.pexels.com',
        },
      ],
    },
};

export default nextConfig;
