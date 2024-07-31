import withMDX from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = withMDX({
    images: {
        domains: ['dl.dropbox.com']
    },
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
});

export default nextConfig;
