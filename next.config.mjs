/** @type {import('next').NextConfig} */
const nextConfig = {

    reactStrictMode:true,
    swcMinify:true,
    optimizeFonts:false,
    productionBrowserSourceMaps:false,
    
    experimental:{
        webpackBuildWorker:true,
        serverSourceMaps:false
    },

    webpack:(
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
      ) => {
        if (config.cache && !dev) {
          config.cache = Object.freeze({
            type: 'memory',
          })
          config.cache.maxMemoryGenerations = 0
        }
        // Important: return the modified config
        return config
      },
    
};

export default nextConfig;
