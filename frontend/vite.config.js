import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@chakra-ui/react": "/node_modules/@chakra-ui/react",
    },
  },
});
