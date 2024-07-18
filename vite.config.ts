import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ]
    }),
    Components({
      resolvers: [NaiveUiResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname,'src')
    },
    extensions: ['.js', '.json', '.ts']
  },
  server: {
    host: '0.0.0.0',
    port: 8080,
    // 是否开启 https
    https: false,
    proxy: {
      '/api': {
        target: 'http://121.36.65.25:8000/',
        changeOrigin: true,

      }
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  build: {
    rollupOptions: {
      // 将需要处理的资源文件添加到 external 中
      external: [
        'src/assets/y1.jpg',
        'src/assets/displayPaper.jpg',
        'date-fns',
        'src/assets/logo1.png',
        'src/assets/tempLogo.png',
        'src/assets/ScholarPage .jpg',
        'src/assets/messagePage.jpg ',
        'src/assets/messagePage.jpg',
      ],
    },
  },

})
