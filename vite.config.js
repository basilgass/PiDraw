import { defineConfig } from "vite";
import { resolve } from "path";
import dtsPlugin from "vite-plugin-dts";

export default defineConfig({
	build: {
		outDir: "dist",
		copyPublicDir: false,
		lib: {
			entry: resolve(__dirname, "lib/index.ts"),
			name: "PiDraw",
			formats: ["es"],
			fileName: "pidraw"
		}
	},
	plugins: [
		dtsPlugin({ 
			include: ['lib', "es2022"] 
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