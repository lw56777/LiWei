import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';
import { codeInspectorPlugin } from 'code-inspector-plugin';
import UnoCSS from 'unocss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/index.scss" as *;
          @use "@/styles/mixin.scss" as *;
        `,
      }
    },
  },
  server: {
    host: '0.0.0.0'
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    codeInspectorPlugin({
      bundler: 'vite',
    }),
    UnoCSS()
  ]
});