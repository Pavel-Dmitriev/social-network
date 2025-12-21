import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import postcssNested from "postcss-nested";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    open: "/",
    port: 3000,
    // warmup: {
    //   clientFiles: ["./src/index.css"],
    // },
  },
  css: {
    postcss: {
      plugins: [postcssNested],
    },
  },
  build: {
    outDir: "build",
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components"),
      assets: path.resolve(__dirname, "./src/assets"),
      api: path.resolve(__dirname, "./src/api"),
      store: path.resolve(__dirname, "./src/store"),
      utils: path.resolve(__dirname, "./src/utils"),
    },
  },
});
