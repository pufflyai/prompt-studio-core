import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Prompt Studio Docs",
  description: "A collaborative Prompt Engineering platform for teams that work with LLMs",
  srcDir: "./pages",
  lastUpdated: true,
  head: [
    ["script", { async: "", src: "https://www.googletagmanager.com/gtag/js?id=G-GEPCR3WDKS" }],
    ["link", { rel: "icon", href: "/assets/favicon.ico" }],
  ],
  themeConfig: {
    logo: "/assets/logo_inverted.svg",
    search: {
      provider: "local",
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      //  { text: "Guides", link: "/guides/getting-started" },
      { text: "API Reference", link: "/api/getting-started" },
      { text: "Blog", link: "https://blog.prompt.studio" },
    ],

    sidebar: [
      { text: "Introduction", link: "/" },
      // {
      //   text: "Guides",
      //   items: [
      //     { text: "Getting Started", link: "/guides/getting-started" },
      //     { text: "Setting up a Provider", link: "/guides/setting-up-provider" },
      //   ],
      // },
      {
        text: "Concepts",
        items: [
          {
            text: "Instructions",
            items: [
              { text: "Prompt", link: "/concepts/prompt" },
              { text: "Chat", link: "/concepts/chat" },
            ],
          },
          { text: "Workflow", link: "/concepts/workflow" },
          { text: "File", link: "/concepts/file" },
          { text: "Knowledge Base", link: "/concepts/knowledge-base" },
          { text: "Secrets", link: "/concepts/secrets" },
        ],
      },
      {
        text: "SDKs",
        items: [{ text: "Javascript", link: "/sdk/js" }],
      },
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
      { icon: "discord", link: "https://discord.gg/3RxwUEk8fW" },
      { icon: "github", link: "https://github.com/pufflyai/prompt-studio-core" },
    ],
    footer: {
      message: "Made with ❤️ at Pufflig",
      copyright: "Copyright © 2023 Pufflig AB",
    },
  },
});
