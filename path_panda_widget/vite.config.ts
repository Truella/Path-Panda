import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, "src/main.ts"),
			name: "PathPandaWidget",
			fileName: "widget",
			formats: ["es", "umd"],
		},
		outDir: "dist",
		target: "es2019",
	},
});
