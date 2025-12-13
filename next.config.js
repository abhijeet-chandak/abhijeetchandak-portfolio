/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Enable static export - outputs to 'out' folder
  output: "export",

  // Disable image optimization for static export
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },

  // Optimize build performance
  swcMinify: true,

  // Compiler optimizations
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"], // Keep errors and warnings
          }
        : false,
  },

  // Production optimizations
  poweredByHeader: false, // Remove X-Powered-By header
  compress: true, // Enable gzip compression (for server deployments)

  // Experimental features (if needed)
  // experimental: {
  //   // Add experimental features here
  // },

  // Webpack optimizations for production builds
  webpack: (config, { isServer, dev, webpack }) => {
    // Production-only optimizations
    if (!isServer && !dev) {
      config.optimization = {
        ...config.optimization,
        moduleIds: "deterministic", // Deterministic module IDs for better caching
        minimize: true,
        usedExports: true,
        sideEffects: false,
        splitChunks: {
          chunks: "all",
          maxInitialRequests: 25,
          minSize: 20000,
          cacheGroups: {
            default: false,
            vendors: false,
            // Framework chunks (React, ReactDOM)
            framework: {
              name: "framework",
              chunks: "all",
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
              priority: 40,
              enforce: true,
              reuseExistingChunk: true,
            },
            // Large libraries (Framer Motion, etc.)
            lib: {
              test(module) {
                return module.size() > 160000 && /node_modules[/\\]/.test(module.identifier());
              },
              name(module) {
                const hash = require("crypto").createHash("sha1");
                hash.update(module.identifier());
                return `lib-${hash.digest("hex").substring(0, 8)}`;
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            // Common chunks
            commons: {
              name: "commons",
              minChunks: 2,
              priority: 20,
              reuseExistingChunk: true,
            },
            // Shared chunks
            shared: {
              name(module, chunks) {
                const hash = require("crypto").createHash("sha1");
                hash.update(chunks.reduce((acc, chunk) => acc + chunk.name, ""));
                return `shared-${hash.digest("hex").substring(0, 8)}`;
              },
              priority: 10,
              minChunks: 2,
              reuseExistingChunk: true,
            },
          },
        },
      };

      // Tree shaking optimizations
      config.optimization.usedExports = true;
      config.optimization.providedExports = true;
    }

    // Filesystem cache for faster rebuilds
    const path = require("path");
    config.cache = {
      type: "filesystem",
      buildDependencies: {
        config: [__filename],
      },
      cacheDirectory: path.join(process.cwd(), ".next", "cache", "webpack"),
    };

    // Ignore warnings for production
    if (!dev) {
      config.ignoreWarnings = [{ module: /node_modules/ }];
    }

    return config;
  },
  // Trailing slash for better static hosting compatibility
  trailingSlash: false,

  // Disable source maps in production for faster builds and smaller bundle
  productionBrowserSourceMaps: false,

  // Generate static pages optimization
  generateBuildId: async () => {
    // Use timestamp for cache busting or commit hash in CI/CD
    return process.env.BUILD_ID || `build-${Date.now()}`;
  },

  // Optimize static generation
  distDir: ".next",

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

module.exports = nextConfig;
