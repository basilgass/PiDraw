import {defineConfig} from "vite"
import {resolve} from "path"
import vue from "@vitejs/plugin-vue"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
    build: {
        lib: {
            name: "PiDraw",
            fileName: "pidraw",
            entry: resolve(__dirname, "src/index.ts"),
            formats: ["es"],
        },
        outDir: "dist",
        copyPublicDir: false,
        sourcemap: true,
        emptyOutDir: true,
    },
    plugins: [
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        tailwindcss()
    ]
})