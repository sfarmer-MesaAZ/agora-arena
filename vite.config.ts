import { defineConfig, ConfigEnv, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Define static paths directly in the config
const staticPaths = [
  { path: "/", outputPath: "index.html" },
  { path: "/forum", outputPath: "forum/index.html" },
  { path: "/webinars", outputPath: "webinars/index.html" },
  { path: "/conference", outputPath: "conference/index.html" },
  { path: "/members", outputPath: "members/index.html" },
  { path: "*", outputPath: "404.html" }
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv) => ({
  // Use VITE_BASE (set by CI or local env) so the app can be served from a subpath
  base: process.env.VITE_BASE || "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    mode === "production" && {
      name: 'generate-static-pages',
      apply: 'build' as const,
      closeBundle: async () => {
        const distPath = path.resolve(__dirname, 'dist');
        const indexContent = await fs.promises.readFile(
          path.join(distPath, 'index.html'),
          'utf-8'
        );

        // Create directories and copy index.html for each route
        for (const route of staticPaths) {
          if (route.outputPath === 'index.html') continue;

          const outputPath = path.join(distPath, route.outputPath);
          const outputDir = path.dirname(outputPath);

          // Ensure directory exists
          await fs.promises.mkdir(outputDir, { recursive: true });
          
          // Copy and modify index.html for this route
          await fs.promises.writeFile(outputPath, indexContent);
        }
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
