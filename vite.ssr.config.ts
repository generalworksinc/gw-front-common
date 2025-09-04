import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid({ solid: { generate: 'ssr', hydratable: true, delegateEvents: false } })],
  build: {
    outDir: 'dist',
    ssr: true,
    lib: {
      entry: {
        'solid/components-ssr': 'solid/components.ssr.ts',
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['solid-js', /^node:.*/],
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
});

