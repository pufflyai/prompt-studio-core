// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Prompt Studio",
  tagline: "Prompt Studio is a collaborative prompt engineering platform for teams that work with LLMs",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://blog.prompt.studio",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        blog: {
          routeBasePath: "/",
          blogSidebarTitle: "All posts",
          blogSidebarCount: "ALL",
          showReadingTime: true,
          editUrl: "https://github.com/pufflyai/prompt-studio-core",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      navbar: {
        title: "Prompt Studio",
        logo: {
          alt: "PromptStudio Logo",
          src: "img/logo.svg",
          href: "https://prompt.studio",
        },
        items: [
          {
            href: "https://docs.prompt.studio",
            label: "Docs",
            position: "right",
          },
          {
            href: "https://discord.gg/3RxwUEk8fW",
            label: "Discord",
            position: "right",
          },
          {
            href: "https://github.com/pufflyai/prompt-studio-core",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "https://discord.gg/3RxwUEk8fW",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/pufflyai/prompt-studio-core",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Pufflig AB`,
      },
    }),
  plugins: [
    [
      "@docusaurus/plugin-google-gtag",
      {
        trackingID: "G-GEPCR3WDKS",
        anonymizeIP: false,
      },
    ],
  ],
};

module.exports = config;
