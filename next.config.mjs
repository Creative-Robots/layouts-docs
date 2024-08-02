import mdx from '@next/mdx';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['dl.dropbox.com']
    },
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
};

const withMDX = mdx({
    extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
