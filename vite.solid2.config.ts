import solid from '@solidjs/vite-plugin';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	plugins: [
		solid({
			include: /solid2\/.*\.[jt]sx$/,
			refresh: { disabled: true },
		}),
		dts({
			outDir: 'dist',
			include: ['solid2'],
			exclude: ['**/__tests__/**'],
			rollupTypes: false,
			copyDtsFiles: true,
			tsconfigPath: 'tsconfig.solid2.json',
		}),
	],
	build: {
		outDir: 'dist',
		emptyOutDir: false,
		lib: {
			entry: {
				'solid2/mod': 'solid2/mod.ts',
				'solid2/components': 'solid2/components.ts',
			},
			formats: ['es'],
		},
		rollupOptions: {
			external: ['solid-js', '@solidjs/web'],
			output: {
				entryFileNames: '[name].js',
			},
		},
	},
});
