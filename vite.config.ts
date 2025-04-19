import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import checker from 'vite-plugin-checker';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    dts({
      insertTypesEntry: true,
      tsconfigPath: './tsconfig.app.json',
      rollupTypes: true,
    }),
    !!process.env.DEV &&
      checker({
        typescript: true,
        eslint: { lintCommand: "eslint 'src/**/*.ts' 'src/**/*.tsx'", useFlatConfig: true },
      }),
  ],
  build: {
    sourcemap: true,
    assetsDir: './src/assets',
    rollupOptions: {
      external: ['react', 'react-dom'],
      input: path.resolve(__dirname, 'src/main.tsx'), // Dùng entry point là main.tsx
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase', // Optional: Use camelCase for class names
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.prepare.ts',
    coverage: {
      reportsDirectory: './tests/unit/coverage',
      provider: 'istanbul',
    },
  },
});
