import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Prompt Studio Docs",
  description: "A collaborative Prompt Engineering platform for teams that work with LLMs",
  srcDir: "./pages",
  lastUpdated: true,
  head: [
    ["script", { async: "", src: "https://www.googletagmanager.com/gtag/js?id=G-GEPCR3WDKS" }],
    ["link", { rel: "icon", href: "/favicon.ico" }],
  ],
  themeConfig: {
    logo: "/logo_inverted.svg",
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
      //   items: [{ text: "Getting Started", link: "/guides/getting-started" }],
      // },
      {
        text: "Concepts",
        items: [
          { text: "Tools", link: "/concepts/tools" },
          { text: "Instructions", link: "/concepts/instructions" },
          { text: "Prompts", link: "/concepts/prompts" },
          { text: "LLMs", link: "/concepts/llms" },
          { text: "Files", link: "/concepts/file" },
          { text: "Knowledge Bases", link: "/concepts/knowledge-base" },
        ],
      },
      {
        text: "Nodes",
        items: [
          { text: "File", link: "/nodes/file" },
          { text: "Template", link: "/nodes/template" },
          { text: "Instruction", link: "/nodes/instruction" },
          { text: "Checklist", link: "/nodes/table" },
        ],
      },
      {
        text: "Guides",
        items: [
          { text: "Introduction", link: "/tools/introduction" },
          { text: "Run your Tool", link: "/tools/run" },
          { text: "Preview your Tool", link: "/tools/preview" },
          { text: "Deploy your Tool", link: "/tools/deploy" },
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
          { text: "Run a Workflow", link: "/api/run-flow" },
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
  },
});
