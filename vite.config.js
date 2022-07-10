import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const defaultConfig = {
  mode: "jit",
  plugins: [vue()],
  base: "/",
  root: "frontend/",
  build: {
    rollupOptions: {
      // https://rollupjs.org/guide/en/#big-list-of-options
    },
    write: true,
    publicDir: "./frontend/public/",
    manifest: true,
    emptyDir: true,
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
        changeOrigin: true,
        pathRewrite: { "^/api/": "/api/v1/" },
      },
    },
  },
};

export default defineConfig(({ command }) => {
  if (command === "serve") {
    //    const isDev = mode === "development";
    return {
      ...defaultConfig,
      // server: {
      //   proxy: {
      //     '/v1': {
      //        target: isDev ? 'https://127.0.0.1:8080' : 'https://api.example.com',
      //       changeOrigin: isDev,
      //       secure: !isDev
      //     }
      //   }
      // }
    };
  } else {
    return {
      ...defaultConfig,
      base: "/dist/",
    };
  }
});
