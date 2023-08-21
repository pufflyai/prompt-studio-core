import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "@pufflig/ps-ui",
      formats: ["es", "umd"],
      fileName: (format) => `ps-ui.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "@chakra-ui/react",
        "@chakra-ui/icons",
        "@chakra-ui/system",
        "@emotion/css",
        "@emotion/react",
        "@emotion/styled",
        "framer-motion",
        "@fortawesome/free-solid-svg-icons",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
