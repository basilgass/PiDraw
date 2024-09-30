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
		emptyOutDir: true,
	},
	plugins: [
		dtsPlugin({ 
			include: ['src', "es2022"],
			outDir: "./types"
		}), // generate .d.ts files for the lib folder
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