import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		esbuildOptions: {
			define: {
				global: "window",
				this: "window",
			},
			plugins: [
				NodeGlobalsPolyfillPlugin({
					buffer: true,
				}),
			],
		},
	},
	resolve: {
		alias: {
			"zlib": "browserify-zlib",
			"util": "util",
			"stream": "readable-stream",
			"assert": "assert",
		},
	}
});
