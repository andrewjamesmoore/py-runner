import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  css: {
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[name]__[local]___[hash:base64:5]",
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          pyodide: ["pyodide"],
          react: ["react", "react-dom"],
          codemirror: ["@uiw/react-codemirror", "@codemirror/lang-python"],
        },
      },
    },
  },
});
