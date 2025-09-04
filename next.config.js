/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,

	// Image optimization settings
	images: {
		// Enable modern image formats for better compression
		formats: ['image/avif', 'image/webp'],

		// Define responsive breakpoints for images
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
		imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

		// Cache optimized images longer
		minimumCacheTTL: 86400, // 24 hours
	},

	// Add proper caching headers
	async headers() {
		return [
			{
				// Apply to all routes
				source: '/:path*',
				headers: [
					{
						key: 'Cache-Control',
						// Aggressive caching for static assets
						value: 'public, max-age=31536000, immutable',
					}
				],
			},
			{
				// Special handling for media files
				source: '/projectImages/:path*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					}
				],
			}
		];
	},

	// Optimize videos with webpack
	webpack(config) {
		// Add video file handling
		config.module.rules.push({
			test: /\.(mp4|webm)$/,
			use: {
				loader: 'file-loader',
				options: {
					// Store videos in a dedicated directory
					publicPath: '/_next/static/videos/',
					outputPath: 'static/videos/',
					name: '[name].[hash].[ext]',
				},
			},
		});

		return config;
	},

	// Experimental features to improve performance
	experimental: {
		// Optimize CSS and reduce unused styles
		optimizeCss: true,
		// Maintain scroll position during navigation
		scrollRestoration: true,
	}
};

module.exports = nextConfig;
