/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "i.pravatar.cc"
            // port: '',
            // pathname: '/account123/**',
            // search: '',
         },
         {
            protocol: "https",
            hostname: "example.com"
            // port: '',
            // pathname: '/account123/**',
            // search: '',
         }
      ]
   }
};

export default nextConfig;
