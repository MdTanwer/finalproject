/**
 * Vite Configuration
 * Configures the build tool settings for the React application
 *
 * Configuration includes:
 * - React plugin for JSX support and Fast Refresh
 * - Default build settings for optimal performance
 * - Development server configuration
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], // Enable React support with Fast Refresh
});
