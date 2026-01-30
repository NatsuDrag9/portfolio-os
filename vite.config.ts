import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { analyzer } from 'vite-bundle-analyzer';

// https://vitejs.dev/config/
const viteConfig = defineConfig({
  // base: '/portfolio-os/',
  base: '/',
  plugins: [
    react(),
    process.env.VITE_BUNDLE_ANALYZE === 'true' && analyzer(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@services': '/src/services',
      '@assets': '/src/assets',
      '@store': '/src/store',
      '@components': '/src/components',
      '@screens': '/src/screens',
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
      '@apps': '/src/apps',
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
