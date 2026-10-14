import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      // The site sits behind a login, so the manifest request must carry cookies.
      useCredentials: true,
      manifest: {
        name: "App Hub",
        short_name: "Apps",
        description: "My own apps, in one place.",
        start_url: "/",
        display: "standalone",
        background_color: "#EEF0F3",
        theme_color: "#1B2430",
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
          { src: "/icons/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ],
      },
      workbox: {
        navigateFallbackDenylist: [/^\/api\//, /^\/\.auth\//],
      },
    }),
  ],
  resolve: {
    // Artifacts imported components from "@/..."; keep that path working for ported apps.
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
