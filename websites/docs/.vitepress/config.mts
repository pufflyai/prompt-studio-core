import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Prompt Studio Docs",
  description: "A collaborative Prompt Engineering platform for teams that work with LLMs",
  srcDir: "./pages",
  lastUpdated: true,
  themeConfig: {
    search: {
      provider: "local",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "API Reference", link: "/api/run-flow" }],

    sidebar: [
      {
        text: "Rest API",
        items: [
          { text: "Getting Started", link: "/api/getting-started" },
          { text: "Run a Flow", link: "/api/run-flow" },
        ],
      },
      {
        text: "Packages",
        items: [
          { text: "@pufflig/ps-chains", link: "/@pufflig/ps-chains" },
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
    footer: {
      message: "Built with ❤️ at Pufflig",
      copyright: "Copyright © 2023 Pufflig AB",
    },
  },
});
