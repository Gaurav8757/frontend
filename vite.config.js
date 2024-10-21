import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["react-phone-input-2"],
  },
  server: {
    proxy: {
      "/api": {
        target: "https://uatapigw.tataaig.com", // Replace with your API base URL
        changeOrigin: true, // Handle CORS on the server side
        rewrite: (path) => path.replace(/^\/api/, ""), // Optional: Rewrite the path if needed
        secure: false, // If your API is on HTTPS and uses self-signed certificates
      },
    },
  },
});
