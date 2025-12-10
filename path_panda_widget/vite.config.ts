import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { defineConfig } from "vite";
export default defineConfig({
    plugins: [cssInjectedByJsPlugin()],
	build: {
		lib: {
			entry: "src/main.ts",
			name: "PathPandaWidget",
			fileName: "PathPandaWidget",
			formats: ["iife"],
		},
		rollupOptions: {
			output: {
				entryFileNames: "PathPandaWidget.js",
				assetFileNames: "PathPandaWidget.[ext]",
				extend: true,
				inlineDynamicImports: true,
			},
		},
		minify: "terser",
		cssCodeSplit: false,
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
		},
	},
});
