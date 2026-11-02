import {defineConfig} from "vitest/config"
import {resolve} from "path"
import vue from "@vitejs/plugin-vue"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig(({mode}) => ({
    build: {
        lib: {
            name: "PiDraw",
            fileName: "pidraw",
            entry: resolve(import.meta.dirname, "src/index.ts"),
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
    ],
    test: {
        // "full" mode: more generous time allowed, as for PiMath.
        testTimeout: mode === "full" ? 30_000 : 5_000,
        // "bench" mode (npm run bench): only the measures of bench/, which the other modes do not run.
        ...(mode === "bench" ? {include: ["bench/**/*.bench.ts"]} : {}),
    }
}))
