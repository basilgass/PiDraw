/** @type {import('vite').UserConfig} */

import { defineConfig } from "vite"
import { resolve } from "path"
import dtsPlugin from "vite-plugin-dts"

export default defineConfig({
	build: {
		lib: {
			name: "PiDraw",
			fileName: "pidraw",
			entry: resolve(__dirname, "src/index.ts"),
			formats: ["es"],
		},
		sourcemap: true,
		emptyOutDir: true,
	},
	plugins: [
		dtsPlugin({ 
			include: ['src', "es2022"],
			outDir: "dist",
		}), // generate .d.ts files for the src folder
	],
	rollupOptions: {
		external: ["vue"],
		output: {
			globals: {
				Vue: "Vue"
			}
		}
	}
})