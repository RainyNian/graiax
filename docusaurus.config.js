module.exports = {
  title: 'Graia Document',
  tagline: 'The Document of Graia',
  url: 'http://graiax.xyz/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Graiax',
      logo: {
        alt: 'Graiax Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/GraiaProject/Application',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: '入门教程',
              to: 'docs/',
            },
            {
              label: 'API文档',
              href: 'https://graiaproject.github.io/Application/',
            },
          ],
        },
        {
          title: '社区 - Community',
          items: [
            {
              label: 'QQ 讨论群',
              href: 'https://jq.qq.com/?_wv=1027&k=VXp6plBD',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: '加入我们',
              href: 'https://github.com/zzzzz167/graia-document/blob/main/join_us.md',
            },
            {
              label: '查看生成日志',
              href: '_logs'
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Graia Project.由 Docusaurus Ⅱ 强力驱动.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
