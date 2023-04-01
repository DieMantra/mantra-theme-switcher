import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	root: 'src/app',
	plugins: [react()],
	build: {
		outDir: '../../app-dist',
	},
});
