import { defineConfig } from 'tsup';
import { generateTsupOptions, parsePresetOptions } from 'tsup-preset-solid';

export default defineConfig((_opts) => {
	const options = parsePresetOptions({
		entries: [
			{
				name: 'solid/mod',
				entry: 'solid/mod.ts',
				// dev_entry: true,
				server_entry: true,
			},
			{
				name: 'solid/components',
				entry: 'solid/components.ts',
				// dev_entry: true,
				// server_entry: true,
			},
			{
				name: 'solid/components_ssr',
				entry: 'solid/components_ssr.ts',
				// dev_entry: true,
				server_entry: true,
			},
		],
		// keep JSX; declaration build must read tsconfig.solid.json via tsup (handled by preset)
	});
	const arr = generateTsupOptions(options);
	return arr.map((cfg) => {
		// const entry = (cfg as any).entry;
		// const entries =
		// 	typeof entry === 'string' ? [entry] : Array.isArray(entry) ? entry : [];
		// const isComponents = entries.some((e) =>
		// 	String(e).includes('solid/components'),
		// );

		return {
			...cfg,
			// Use Solid tsconfig so TS knows JSX settings while emitting d.ts
			tsconfig: 'tsconfig.solid.json',
			// ...(isComponents
			// 	? {
			// 			// components は依存を束ねず ESM のまま配布
			// 			bundle: false,
			// 			splitting: false,
			// 			format: ['esm'],
			// 			sourcemap: true,
			// 			// Solid ランタイムなどは外部解決に委ねる
			// 			external: ['solid-js', 'solid-js/web', '@solidjs/router'],
			// 		}
			// 	: {}),
		};
	});
});
