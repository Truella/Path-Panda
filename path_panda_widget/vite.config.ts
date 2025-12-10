import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "src/main.ts"),
			name: "PathPandaWidget",
			fileName: "widget",
			formats: ["iife"],
		},
		outDir: "dist",
		target: "es2019",
		rollupOptions: {
			output: {
				inlineDynamicImports: true,
			},
		},
		cssCodeSplit: false,
	},
});
