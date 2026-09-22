// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import preload from "vite-plugin-preload";
import sitemap from "vite-plugin-sitemap";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    plugins: [
        react(),
        preload(),
        sitemap({
            hostname: "https://pedrotiagojesus.github.io",
            dynamicRoutes: ["/experience", "/project", "/about", "/contact"],
            exclude: ["/404"],
            changefreq: {
                "*": "monthly",
                "/": "weekly",
                "/project": "weekly",
            },
            priority: {
                "*": 0.7,
                "/": 1.0,
                "/project": 0.9,
                "/experience": 0.8,
                "/contact": 0.6,
            },
        }),
    ],
    resolve: {
        alias: {
            "@api": path.resolve(__dirname, "src/api"),
            "@components": path.resolve(__dirname, "src/components"),
            "@pages": path.resolve(__dirname, "src/pages"),
            "@typesLocal": path.resolve(__dirname, "src/typesLocal"),
            "@contexts": path.resolve(__dirname, "src/contexts"),
            "@assets": path.resolve(__dirname, "src/assets"),
            "@utils": path.resolve(__dirname, "src/utils"),
            "@hooks": path.resolve(__dirname, "src/hooks"),
            "@service": path.resolve(__dirname, "src/service"),
            "@config": path.resolve(__dirname, "src/config"),
            "@styles": path.resolve(__dirname, "src/styles"),
            "@analytics": path.resolve(__dirname, "src/analytics"),
        },
    },
    build: {
        cssCodeSplit: true,
        rollupOptions: {
            output: {
                manualChunks: {
                    "react-vendor": ["react", "react-dom", "react-router-dom"],
                    "query-vendor": ["@tanstack/react-query"],
                },
            },
        },
    },
});
