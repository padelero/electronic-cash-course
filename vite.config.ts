
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig({
  plugins: [react(), componentTagger()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: 'https://padelvalles.com',
        changeOrigin: true,
        secure: false, // Cambiado a false para ignorar certificados SSL
        rewrite: (path) => path.replace(/^\/api/, ''),
        headers: {
          'Origin': 'https://padelvalles.com', // Simular que la petición viene del mismo origen
          'Referer': 'https://padelvalles.com/'
        },
        // Esto es opcional pero útil para debugging
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('Proxy error:', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending request to:', proxyReq.path);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received response from:', proxyRes.statusCode, req.url);
          });
        }
      }
    }
  }
});
