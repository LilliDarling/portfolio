import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader'],
    });
    return config;
  },
  turbopack: {
    rules: {
      '*.{glsl,vs,fs,vert,frag}': {
        loaders: ['raw-loader', 'glslify-loader'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;
