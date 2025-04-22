import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import webpCompress from "vite-plugin-webp-compress";

export default defineConfig({
  plugins: [
    tailwindcss(),
    webpCompress(),
  ],
})

