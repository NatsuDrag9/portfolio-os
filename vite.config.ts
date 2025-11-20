import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { analyzer } from 'vite-bundle-analyzer';

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  plugins: [react(), analyzer()],
  resolve: {
    alias: {
      '@services': '/src/services',
      '@assets': '/src/assets',
      '@store': '/src/store',
      '@components': '/src/components',
      '@modules': '/src/modules',
      '@hooks': '/src/hooks',
      '@layouts': '/src/layouts',
      '@pages': '/src/pages',
      '@mocks': '/src/mocks',
      '@stories': '/src/stories',
      '@styles': '/src/styles',
      '@utils': '/src/utils',
      '@definitions': '/src/definitions',
      '@constants': '/src/constants',
      '@config': '/src/config',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use 'sass:color';@use "@styles/_helpers" as *;`,
      },
    },
  },
  optimizeDeps: {
    exclude: ['@storybook/blocks'],
  },

  /* Uncomment this when bundlesize is large due to recharts */
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks: {
  //         // Define chunks manually for these libraries
  //         recharts: ['recharts'],
  //       },
  //     },
  //   },
  // },
});

export default viteConfig;
