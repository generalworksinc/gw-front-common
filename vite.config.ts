import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		dts({
			outDir: 'dist',
			include: ['core', 'vue', 'solid'],
			exclude: ['**/__tests__/**'],
			rollupTypes: true,
			copyDtsFiles: true,
			tsconfigPath: 'tsconfig.build.json',
		}),
	],
	build: {
		lib: {
			entry: {
				core: 'core/mod.ts',
				'vue/mod': 'vue/mod.ts',
				'vue/components': 'vue/components.ts',
				'solid/mod': 'solid/mod.ts',
				'solid/components': 'solid/components.ts',
			},
			formats: ['es'],
		},
		rollupOptions: {
			external: ['vue', 'solid-js', 'dayjs'],
			output: {
				entryFileNames: '[name].js',
				chunkFileNames: 'chunks/[name]-[hash].js',
				assetFileNames: 'assets/[name]-[hash][extname]',
			},
		},
	},
});
