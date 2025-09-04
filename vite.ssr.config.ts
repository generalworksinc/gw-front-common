import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid({ solid: { generate: 'ssr', hydratable: true, delegateEvents: false } })],
  esbuild: {
    jsx: 'automatic',
    jsxImportSource: 'solid-js',
  },
  build: {
    outDir: 'dist',
    ssr: true,
    emptyOutDir: false,
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
