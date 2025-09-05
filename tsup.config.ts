import { defineConfig } from 'tsup';
import { generateTsupOptions, parsePresetOptions } from 'tsup-preset-solid';

export default defineConfig((_opts) => {
	const options = parsePresetOptions({
		entries: [
			{
				name: 'solid/mod',
				entry: 'solid/mod.ts',
				// dev_entry: true,
				// server_entry: true,
			},
			{
				name: 'solid/components',
				entry: 'solid/components.ts',
				// dev_entry: true,
				server_entry: true,
			},
		],
		// keep JSX; declaration build must read tsconfig.solid.json via tsup (handled by preset)
	});
	const arr = generateTsupOptions(options);
	return arr.map((cfg) => ({
		...cfg,
		// Use Solid tsconfig so TS knows JSX settings while emitting d.ts
		tsconfig: 'tsconfig.solid.json',
	}));
});
