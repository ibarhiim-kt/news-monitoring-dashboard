/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: [
      'icdn.lenta.ru',
      'static.feber.se',
      'img.lavdg.com',
      'biztoc.com', // add your new domain here
    ], // Add any external domains here
  },
};

export default nextConfig;
