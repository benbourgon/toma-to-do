import path from "node:path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd());
	const { VITE_APP_PORT, VITE_APP_BASE_PATH } = env;
	if (!VITE_APP_PORT || !VITE_APP_BASE_PATH)
		throw new Error("Missing env variables");
	const PARSED_PORT = Number.parseInt(VITE_APP_PORT);
	return {
		base: VITE_APP_BASE_PATH,
		plugins: [react(), tsconfigPaths(), TanStackRouterVite()],
		server: {
			port: PARSED_PORT,
		},
		preview: {
			port: PARSED_PORT,
		},
		resolve: {
			alias: {
				"@": path.resolve(__dirname, "./src"),
			},
		},
		optimizeDeps: {
			exclude: ["fsevents"],
		},
		build: {
			rollupOptions: {
				external: ["fs/promises"],
				output: {
					experimentalMinChunkSize: 3500,
				},
			},
		},
	};
});
