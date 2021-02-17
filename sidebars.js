module.exports = {
  docs: [
    "intro",
    {
      type: 'category',
      label: '入门',
      items: [
        'guides/before-start',
        {
          type: 'category',
          label: "安装",
          items: [
            'guides/installation/install mirai',
            'guides/installation/install graia',
          ]
        },
        'guides/about-connection-config',
      ]
    },
    {
      type: 'category',
      label: '附录',
      items: [
        'appendixs/asyncio-basic',
        'appendixs/mirai-api-http'
      ]
    }
  ],
};