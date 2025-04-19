/// <reference types="vitest" />

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import webfontDownload from 'vite-plugin-webfont-dl';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    webfontDownload(),
    tsconfigPaths(),
    !process.env.VITEST &&
      checker({
        typescript: true,
        eslint: {
          lintCommand: "eslint 'src/**/*.ts' 'src/**/*.tsx'",
          useFlatConfig: true,
        },
      }),
  ],
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.prepare.ts',
    include: ['./src/**/*.spec.tsx'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json'],
      reportsDirectory: './test/coverage',
      extension: ['.ts', '.tsx'],
    },
  },
});
