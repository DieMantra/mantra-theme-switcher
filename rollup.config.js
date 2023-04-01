import terser from '@rollup/plugin-terser';
import { defineConfig } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json' assert { type: 'json' };

export default defineConfig({
	input: 'src/lib/index.ts',
	output: [
		{
			file: pkg.main,
			format: 'cjs',
			exports: 'named',
			sourcemap: true,
			strict: false,
		},
	],
	external: ['react', 'react-dom'],
	plugins: [typescript({ tsconfig: 'tsconfig.lib.json' }), terser()],
});
