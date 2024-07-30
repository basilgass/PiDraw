// vite.config.js
import { defineConfig } from "file:///C:/websites/PiDraw/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import dtsPlugin from "file:///C:/websites/PiDraw/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\websites\\PiDraw";
var vite_config_default = defineConfig({
  build: {
    outDir: "dist",
    copyPublicDir: false,
    lib: {
      entry: resolve(__vite_injected_original_dirname, "lib/index.ts"),
      name: "PiDraw",
      formats: ["es"],
      fileName: "pidraw"
    },
    emptyOutDir: true
  },
  plugins: [
    dtsPlugin({
      beforeWriteFile: (filePath, content) => ({
        filePath: filePath.replace("index.d.ts", "pidraw.d.ts"),
        content
      }),
      include: ["lib", "es2022"]
    })
    // generate .d.ts files for the lib folder
  ],
  rollupOptions: {
    external: ["vue"],
    output: {
      globals: {
        Vue: "Vue"
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx3ZWJzaXRlc1xcXFxQaURyYXdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHdlYnNpdGVzXFxcXFBpRHJhd1xcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovd2Vic2l0ZXMvUGlEcmF3L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCBkdHNQbHVnaW4gZnJvbSBcInZpdGUtcGx1Z2luLWR0c1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuXHRidWlsZDoge1xyXG5cdFx0b3V0RGlyOiBcImRpc3RcIixcclxuXHRcdGNvcHlQdWJsaWNEaXI6IGZhbHNlLFxyXG5cdFx0bGliOiB7XHJcblx0XHRcdGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgXCJsaWIvaW5kZXgudHNcIiksXHJcblx0XHRcdG5hbWU6IFwiUGlEcmF3XCIsXHJcblx0XHRcdGZvcm1hdHM6IFtcImVzXCJdLFxyXG5cdFx0XHRmaWxlTmFtZTogXCJwaWRyYXdcIlxyXG5cdFx0fSxcclxuXHRcdGVtcHR5T3V0RGlyOiB0cnVlLFxyXG5cdH0sXHJcblx0cGx1Z2luczogW1xyXG5cdFx0ZHRzUGx1Z2luKHsgXHJcblx0XHRcdGJlZm9yZVdyaXRlRmlsZTogKGZpbGVQYXRoLCBjb250ZW50KSA9PiAoXHJcblx0XHRcdFx0e1xyXG5cdFx0XHRcdGZpbGVQYXRoOiBmaWxlUGF0aC5yZXBsYWNlKFwiaW5kZXguZC50c1wiLCBcInBpZHJhdy5kLnRzXCIpLFxyXG5cdFx0XHRcdGNvbnRlbnQsXHJcblx0XHRcdH0pLFxyXG5cdFx0XHRpbmNsdWRlOiBbJ2xpYicsIFwiZXMyMDIyXCJdXHJcblx0XHR9KSwgLy8gZ2VuZXJhdGUgLmQudHMgZmlsZXMgZm9yIHRoZSBsaWIgZm9sZGVyXHJcblx0XSxcclxuXHRyb2xsdXBPcHRpb25zOiB7XHJcblx0XHRleHRlcm5hbDogW1widnVlXCJdLFxyXG5cdFx0b3V0cHV0OiB7XHJcblx0XHRcdGdsb2JhbHM6IHtcclxuXHRcdFx0XHRWdWU6IFwiVnVlXCJcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBQThPLFNBQVMsb0JBQW9CO0FBQzNRLFNBQVMsZUFBZTtBQUN4QixPQUFPLGVBQWU7QUFGdEIsSUFBTSxtQ0FBbUM7QUFJekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDM0IsT0FBTztBQUFBLElBQ04sUUFBUTtBQUFBLElBQ1IsZUFBZTtBQUFBLElBQ2YsS0FBSztBQUFBLE1BQ0osT0FBTyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUN4QyxNQUFNO0FBQUEsTUFDTixTQUFTLENBQUMsSUFBSTtBQUFBLE1BQ2QsVUFBVTtBQUFBLElBQ1g7QUFBQSxJQUNBLGFBQWE7QUFBQSxFQUNkO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUixVQUFVO0FBQUEsTUFDVCxpQkFBaUIsQ0FBQyxVQUFVLGFBQzNCO0FBQUEsUUFDQSxVQUFVLFNBQVMsUUFBUSxjQUFjLGFBQWE7QUFBQSxRQUN0RDtBQUFBLE1BQ0Q7QUFBQSxNQUNBLFNBQVMsQ0FBQyxPQUFPLFFBQVE7QUFBQSxJQUMxQixDQUFDO0FBQUE7QUFBQSxFQUNGO0FBQUEsRUFDQSxlQUFlO0FBQUEsSUFDZCxVQUFVLENBQUMsS0FBSztBQUFBLElBQ2hCLFFBQVE7QUFBQSxNQUNQLFNBQVM7QUFBQSxRQUNSLEtBQUs7QUFBQSxNQUNOO0FBQUEsSUFDRDtBQUFBLEVBQ0Q7QUFDRCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
