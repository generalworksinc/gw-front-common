import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		// Vue/Core 用の d.ts 出力
		dts({
			outDir: 'dist',
			include: ['core', 'vue'],
			exclude: ['**/__tests__/**'],
			rollupTypes: false,
			copyDtsFiles: true,
			tsconfigPath: 'tsconfig.build.json',
		}),
		// Solid 用の d.ts 出力（jsxImportSource: solid-js）
		dts({
			outDir: 'dist',
			include: ['solid'],
			exclude: ['**/__tests__/**'],
			rollupTypes: false,
			copyDtsFiles: true,
			tsconfigPath: 'tsconfig.solid.json',
		}),
	],
	build: {
		outDir: 'dist',
		lib: {
			entry: {
				'core/mod': 'core/mod.ts',
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
				// 共有チャンクはデフォルトのまま（必要に応じて自動分割）
				assetFileNames: 'assets/[name]-[hash][extname]',
			},
		},
	},
});
