/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

const vitestConfig = defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup'],
    testTransformMode: {
      web: ['.*\\.tsx?$', '.*\\.jsx?$'], // Ensure all JS and TS files, including JSX/TSX, are transformed
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        '**/*.d.ts',
        '**/node_modules/**',
        '**/tests/**',
        '**/*.config.ts',
      ],
    },
  },
});

export default mergeConfig(viteConfig, vitestConfig);
