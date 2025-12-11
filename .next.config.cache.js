// Next.js build cache configuration
module.exports = {
  // Enable SWC minification for faster builds
  swcMinify: true,
  
  // Reduce build output
  productionBrowserSourceMaps: false,
  
  // Optimize images
  images: {
    unoptimized: false,
    minimumCacheTTL: 60,
  },
}
