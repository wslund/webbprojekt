import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    plugins: [react()],

    // Viktigt: säkerställ att VITE_* exponeras i import.meta.env
    envPrefix: "VITE_",

    // Server-inställningar behövs bara lokalt
    ...(isDev
      ? {
          server: {
            host: "127.0.0.1",
            port: 5173,
          },
        }
      : {}),

    build: {
      outDir: "dist",
      sourcemap: true,
    },
  };
});
