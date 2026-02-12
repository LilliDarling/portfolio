import type { NextConfig } from "next";

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://va.vercel-scripts.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: blob: https://cdn.jsdelivr.net https://www.svgrepo.com https://www.gstatic.com https://avatars.githubusercontent.com;
  connect-src 'self' https://api.emailjs.com https://api.mainnet-beta.solana.com https://api.devnet.solana.com https://*.infura.io https://*.alchemy.com https://*.walletconnect.com https://*.walletconnect.org https://va.vercel-scripts.com https://vitals.vercel-insights.com wss://*.walletconnect.com wss://*.walletconnect.org wss://*.reown.com https://*.reown.com https://eth.merkle.io https://raw.githack.com https://raw.githubusercontent.com https://*.coinbase.com;
  worker-src 'self' blob:;
  child-src 'self' blob:;
  frame-src 'self' https://*.walletconnect.com https://*.walletconnect.org;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
`.replace(/\s+/g, ' ').trim();

const isProduction = process.env.NODE_ENV === 'production';

const securityHeaders = [
  ...(isProduction ? [{ key: 'Content-Security-Policy', value: ContentSecurityPolicy }] : []),
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.svgrepo.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.gstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        pathname: '/**',
      },
    ],
  },
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
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
