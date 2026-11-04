import {defineConfig} from "vitest/config"
import {resolve} from "path"
import vue from "@vitejs/plugin-vue"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig(({mode}) => ({
    build: {
        lib: {
            name: "PiDraw",
            // `pidraw` is the library; `codemirror` is the optional helper of the editors (colors, suggestions).
            fileName: (_format, entryName) => `${entryName}.js`,
            entry: {
                pidraw: resolve(import.meta.dirname, "src/index.ts"),
                codemirror: resolve(import.meta.dirname, "src/codemirror/index.ts"),
            },
            formats: ["es"],
        },
        rollupOptions: {
            external: [/^@codemirror\//, /^@lezer\//],
            // The code shared by the entry points (the parser) goes in one file with a stable name.
            output: {chunkFileNames: "shared.js"},
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
        // "docs" mode (npm run docs:check): only the check of the examples of the documentation.
        ...(mode === "docs" ? {include: ["scripts/docs-check.test.ts"], testTimeout: 30_000} : {}),
    }
}))
