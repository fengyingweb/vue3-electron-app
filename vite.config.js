import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import electron from 'vite-plugin-electron'
// import renderer from 'vite-plugin-electron-renderer'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // electron({
    //   entry: 'electron/main.js'
    // }),
    // renderer(),
    AutoImport({
      resolvers: [
        ElementPlusResolver({
          importStyle:'sass'
        }),
        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon',
        }),
      ],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle:'sass'
        }),
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep'],
        })
      ],
    }),
    Icons({
      autoInstall: true,
    })
  ],
  css: {
    preprocessorOptions: {
      scss: {
          additionalData: `@use "@/assets/css/layout.scss" as *;`,
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    },
    extensions: ['.js', '.ts', '.vue', '.jsx', '.tsx', '.json']
  },
  base: './', // 设置打包后文件引用路径
  server: {
    port: 3002,
    host: '0.0.0.0',
    open: false,
    cors: true, // 允许跨域
    proxy: {
      '/api/': {
        target: 'http://localhost:3001',
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\//, 'api')
      }
    }
  },
})
