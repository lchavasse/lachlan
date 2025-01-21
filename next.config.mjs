import process from 'node:process';
Object.assign(process.env, { NEXT_TELEMETRY_DISABLED: '1' });

/**
 * @typedef {import('next').NextConfig} NextConfig
 * @typedef {Array<((config: NextConfig) => NextConfig)>} NextConfigPlugins
 */
import nextMDX from '@next/mdx';
import rehypeSlug from 'rehype-slug';
import rehypePrettyCode from 'rehype-pretty-code';
// import { transformerCopyButton } from '@rehype-pretty/transformers'; // the copy button doesn't seem to be working yet
import remarkFrontmatter from 'remark-frontmatter';

/** @type {NextConfigPlugins} */
const plugins = [];

/** @type {NextConfig} */
const nextConfig = {
  output: 'export',
  cleanDistDir: true,
  reactStrictMode: true,
  poweredByHeader: false,
  pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
  images: {
    unoptimized: true
  },
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
  },
  // Exclude admin routes from static export
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
  distDir: '.next',
  // This will exclude the admin routes from being statically generated
  excludeDefaultMomentLocales: true,
  experimental: {
    // This excludes specific routes from static generation
    excludeRoutes: ['/admin', '/admin/editor']
  }
};

/** @type {import('rehype-pretty-code').Options} */
const options = {
  keepBackground: true,
  theme: 'one-dark-pro',
  filterMetaString: (string) => string.replace(/---(.|\n)*?---/, ''),
};

plugins.push(
  nextMDX({
    extension: /\.(md|mdx)$/,
    options: {
      remarkPlugins: [remarkFrontmatter],
      rehypePlugins: [[rehypePrettyCode, options], rehypeSlug],
    },
  }),
);

export default () => plugins.reduce((_, plugin) => plugin(_), nextConfig);