import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Prompt Studio Docs",
  description: "A collaborative Prompt Engineering platform for teams that work with LLMs",
  srcDir: "./pages",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "API Reference", link: "/" }],

    sidebar: [
      {
        text: "API Reference",
        items: [
          { text: "@pufflig/ps-chains", link: "/" },
          { text: "@pufflig/ps-nodes", link: "/@pufflig/ps-nodes" },
          { text: "@pufflig/ps-node-configs", link: "/@pufflig/ps-node-configs" },
        ],
      },
      {
        text: "Changelog",
        link: "/changelog",
      },
    ],

    socialLinks: [
      { icon: "discord", link: "https://github.com/pufflyai/prompt-studio-core" },
      { icon: "github", link: "https://github.com/pufflyai/prompt-studio-core" },
    ],
  },
});
