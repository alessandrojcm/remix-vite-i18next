import {vitePlugin as remix} from "@remix-run/dev";
import {installGlobals} from "@remix-run/node";
import {defineConfig} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import {visualizer} from "rollup-plugin-visualizer";

installGlobals();

export default defineConfig({
    plugins: [remix(), visualizer({emitFile: true}), tsconfigPaths()],
    server: {port: 3000},
});
