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
    sidebar: {
      "/": [
        {
          text: "Introduction",
          link: "/",
        },
        {
          text: "Key Concepts",
          items: [
            {
              text: "Recipe",
              link: "/key-concepts/recipe/",
              items: [
                { text: "Instruction", link: "/key-concepts/recipe/instruction.md" },
                { text: "Content", link: "/key-concepts/recipe/content.md" },
                { text: "AI Setting", link: "/key-concepts/recipe/AI-Setting.md" },
                { text: "Preview", link: "/key-concepts/recipe/preview.md" },
                { text: "Deployment", link: "/key-concepts/recipe/deployment.md" },
              ],
            },
            {
              text: "Datapoint",
              link: "/key-concepts/datapoint.md",
            },
            {
              text: "Scenarios",
              link: "/key-concepts/scenarios.md",
            },
          ],
        },
        // {
        //   text: "Get Started",
        //   items: [
        //     {
        //       text: "Recipes",
        //       link: "/get-started/recipes/",
        //       items: [
        //         { text: "Creating a Recipe", link: "/get-started/recipes/creating-a-recipe/" },
        //         { text: "Preview a Recipe", link: "/get-started/recipes/preview-a-recipe/" },
        //         { text: "Deploy a Recipe", link: "/get-started/recipes/deploy-a-recipe/" },
        //       ],
        //     },
        //     {
        //       text: "Datapoints",
        //       link: "/get-started/datapoints/",
        //       items: [{ text: "Validation", link: "/get-started/datapoints/validation/" }],
        //     },
        //     {
        //       text: "Scenarios",
        //       link: "/get-started/scenarios/",
        //       items: [{ text: "Create a Scenario", link: "/get-started/scenarios/create-a-scenario/" }],
        //     },
        //   ],
        // },
        {
          text: "SDK Integration",
          link: "/sdk-integration/",
        },
        {
          text: "FAQ",
          link: "/faq/",
        },
      ],
    },
    socialLinks: [
      { icon: "discord", link: "https://discord.gg/3RxwUEk8fW" },
      { icon: "github", link: "https://github.com/pufflyai/prompt-studio-core" },
    ],
  },
});
