/** @type {import('next').NextConfig} */
const path = require('path');
const withPlugins = require('next-compose-plugins');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === true,
    // enabled: process.env.NODE_ENV === 'development',
    openAnalyzer: false
});


const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: process.env.NEXT_PUBLIC_API_DOMAIN },
            { hostname: "hips.hearstapps.com" },
            { hostname: "www.thesprucepets.com" },
            { hostname: "images.unsplash.com" },
            { hostname: "raw.githubusercontent.com" },
        ],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        // prependData: `@import "src/app/styles/variables/_mixins.scss";`,
        prependData: `@import "src/preparedApp/styles/variables/_mixins.scss";`,
    },
}


module.exports = withPlugins([
    withBundleAnalyzer,
], nextConfig);


// module.exports = nextConfig;



