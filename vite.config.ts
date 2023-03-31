import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

// sveltekit with https
export default defineConfig({
	plugins: [sveltekit()],
	// server: {
	// 	https: {
	// 		// i have a cert and a "ca-bundle" for my domain which is xavierbradford.com
	// 		cert: 'c:/certs/xavierbradford_com.crt',
	// 		key: 'c:/certs/xavierbradford_com.key',
	// 	},
	// 	fs: {
	// 		strict: true,
	// 	},
	// },
});
