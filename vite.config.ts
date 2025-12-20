import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isElectron = process.env.ELECTRON === 'true';
  
  return {
    base: command === 'serve' ? '/' : './',
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      // Importante para o Electron
      assetsDir: './',
      rollupOptions: {
        output: {
          format: 'es',
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name].[ext]',
        },
      },
    },
    server: {
      port: 5173,
      strictPort: true,
      // Importante para o Electron
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 5173,
      },
    },
    // Configurações específicas para o Electron
    define: {
      'process.env.ELECTRON': JSON.stringify(isElectron),
    },
  };
});
