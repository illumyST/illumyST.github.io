import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  ssgOptions: {
    formatting: 'minify',
    // Each locale is its own static page; vite-ssg renders every route in src/router.ts.
    dirStyle: 'nested',
  },
})
