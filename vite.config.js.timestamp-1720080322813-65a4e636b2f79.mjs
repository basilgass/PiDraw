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
      entry: resolve(__vite_injected_original_dirname, "lib/main.ts"),
      formats: ["es"]
    }
  },
  plugins: [
    dtsPlugin({ include: ["lib", "es2022"] })
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx3ZWJzaXRlc1xcXFxQaURyYXdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHdlYnNpdGVzXFxcXFBpRHJhd1xcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovd2Vic2l0ZXMvUGlEcmF3L3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCBkdHNQbHVnaW4gZnJvbSBcInZpdGUtcGx1Z2luLWR0c1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuXHRidWlsZDoge1xyXG5cdFx0b3V0RGlyOiBcImRpc3RcIixcclxuXHRcdGNvcHlQdWJsaWNEaXI6IGZhbHNlLFxyXG5cdFx0bGliOiB7XHJcblx0XHRcdGVudHJ5OiByZXNvbHZlKF9fZGlybmFtZSwgXCJsaWIvbWFpbi50c1wiKSxcclxuXHRcdFx0Zm9ybWF0czogW1wiZXNcIl0sXHJcblx0XHR9XHJcblx0fSxcclxuXHRwbHVnaW5zOiBbXHJcblx0XHRkdHNQbHVnaW4oeyBpbmNsdWRlOiBbJ2xpYicsIFwiZXMyMDIyXCJdIH0pLCAvLyBnZW5lcmF0ZSAuZC50cyBmaWxlcyBmb3IgdGhlIGxpYiBmb2xkZXJcclxuXHRdLFxyXG5cdHJvbGx1cE9wdGlvbnM6IHtcclxuXHRcdGV4dGVybmFsOiBbXCJ2dWVcIl0sXHJcblx0XHRvdXRwdXQ6IHtcclxuXHRcdFx0Z2xvYmFsczoge1xyXG5cdFx0XHRcdFZ1ZTogXCJWdWVcIlxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59KSJdLAogICJtYXBwaW5ncyI6ICI7QUFBOE8sU0FBUyxvQkFBb0I7QUFDM1EsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sZUFBZTtBQUZ0QixJQUFNLG1DQUFtQztBQUl6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMzQixPQUFPO0FBQUEsSUFDTixRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsSUFDZixLQUFLO0FBQUEsTUFDSixPQUFPLFFBQVEsa0NBQVcsYUFBYTtBQUFBLE1BQ3ZDLFNBQVMsQ0FBQyxJQUFJO0FBQUEsSUFDZjtBQUFBLEVBQ0Q7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNSLFVBQVUsRUFBRSxTQUFTLENBQUMsT0FBTyxRQUFRLEVBQUUsQ0FBQztBQUFBO0FBQUEsRUFDekM7QUFBQSxFQUNBLGVBQWU7QUFBQSxJQUNkLFVBQVUsQ0FBQyxLQUFLO0FBQUEsSUFDaEIsUUFBUTtBQUFBLE1BQ1AsU0FBUztBQUFBLFFBQ1IsS0FBSztBQUFBLE1BQ047QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
