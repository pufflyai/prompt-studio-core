import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import wasm from "vite-plugin-wasm";

export default defineConfig({
  plugins: [
    wasm(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "@pufflig/ps-nodes",
      formats: ["es", "umd"],
      fileName: (format) => `ps-nodes.${format}.js`,
    },
    rollupOptions: {
      external: ["axios", "lodash", "uuid", "openai", "@dqbd/tiktoken"],
    },
  },
});
