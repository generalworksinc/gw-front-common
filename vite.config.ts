import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import solid from 'vite-plugin-solid';

export default defineConfig({
	plugins: [
		// Solid: TSX を Solid の JSX 変換で処理（SSR安全のためイベント委譲を無効化）
		solid({ solid: { delegateEvents: false } }),
		// Vue: .vue SFC を処理
		vue(),
		// Vue/Core 用の d.ts 出力
		dts({
			outDir: 'dist',
			include: ['core', 'vue'],
			exclude: ['**/__tests__/**', 'vue/types.ts'],
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
	esbuild: {
		// Solid TSX を esbuild の自動 JSX 変換で処理
		// （Vue 側は .vue SFC を使用し TSX は未使用のため影響なし）
		jsx: 'automatic',
		jsxImportSource: 'solid-js',
	},
	build: {
		outDir: 'dist',
		lib: {
			entry: {
				'core/mod': 'core/mod.ts',
				'vue/mod': 'vue/mod.ts',
				'vue/components': 'vue/components.ts',
				'vue/nuxt/module': 'vue/nuxt/module.ts',
				'vue/nuxt/runtime/plugin': 'vue/nuxt/runtime/plugin.ts',
				'solid/mod': 'solid/mod.ts',
				'solid/components': 'solid/components.ts',
			},
			formats: ['es'],
		},
		rollupOptions: {
			external: [
				'vue',
				'solid-js',
				'dayjs',
				'pinia',
				'@nuxt/kit',
				'nuxt/app',
				/^node:.*/,
			],
			output: {
				entryFileNames: '[name].js',
				// 共有チャンクはデフォルトのまま（必要に応じて自動分割）
				assetFileNames: 'assets/[name]-[hash][extname]',
			},
		},
	},
});
