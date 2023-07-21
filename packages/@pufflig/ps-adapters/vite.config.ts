import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "@pufflig/ps-adapters",
      formats: ["es", "umd"],
      fileName: (format) => `ps-adapters.${format}.js`,
    },
    rollupOptions: {
      external: ["axios", "lodash", "uuid", "openai"],
    },
  },
});
