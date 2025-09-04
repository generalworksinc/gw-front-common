import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	plugins: [
		// Vue: .vue SFC を処理（Solid は tsup 側に完全移行）
		vue(),
		// Vue/Core 用の d.ts 出力（Solid 用 d.ts は tsup 側で生成）
		dts({
			outDir: 'dist',
			include: ['core', 'vue'],
			exclude: ['**/__tests__/**', 'vue/types.ts'],
			rollupTypes: false,
			copyDtsFiles: true,
			tsconfigPath: 'tsconfig.build.json',
		}),
	],
	build: {
		outDir: 'dist',
		lib: {
			entry: {
				'core/mod': 'core/mod.ts',
				'vue/mod': 'vue/mod.ts',
				'vue/components': 'vue/components.ts',
				'vue/nuxt/module': 'vue/nuxt/module.ts',
				'vue/nuxt/runtime/plugin': 'vue/nuxt/runtime/plugin.ts',
			},
			formats: ['es'],
		},
		rollupOptions: {
			external: ['vue', 'dayjs', 'pinia', '@nuxt/kit', 'nuxt/app', /^node:.*/],
			output: {
				entryFileNames: '[name].js',
				assetFileNames: 'assets/[name]-[hash][extname]',
			},
		},
	},
});
