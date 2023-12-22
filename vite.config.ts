import { fileURLToPath } from 'url'
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/flying-founders/",
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL('./index.html', import.meta.url)),
        heads: fileURLToPath(new URL('./heads.html', import.meta.url)),
      },
    },
  }
});
