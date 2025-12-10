import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import postcssNested from "postcss-nested";

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
});
