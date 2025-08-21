import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],

  server : {
    host: "0.0.0.0",//env.APP_HOST,
    hot: true,
    port: 8001,
    watch: {
      usePolling: true
    },
  }
})
