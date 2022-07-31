import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import banner from "vite-plugin-banner";

const defaultConfig = {
  mode: "jit",
  plugins: [vue(), banner('/*! Built using the PremoWeb Software Development Kit for Vue 3 + PHP. Learn more at https://premoweb.com/sdk. */\n  ')],
  base: "/",
  root: "frontend/",
  build: {
    write: true,
    publicDir: "./frontend/public/",
    manifest: true,
  },
  server: {
    watch: {
      usePolling: true,
    },
    cors: true,
    strictPort: true,
    port: 80,
    proxy: {
      "^/api/": {
        target: "http://localhost:81",
        ws: true,
        changeOrigin: true
      },
    },
  },
};

export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      ...defaultConfig
    };
  } else {
    return {
      ...defaultConfig,
      base: "/dist/",
    };
  }
});
