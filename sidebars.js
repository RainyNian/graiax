module.exports = {
  docs: [
    "intro",
    {
      type: 'category',
      label: '入门',
      items: [
        'guides/before-start',
        'guides/install-mirai',
        {
          type: 'category',
          label: "GraiaApplication(v4)",
          items: [
            'guides/v4/install-graia',
            'guides/v4/about-connection-config',
          ]
        },
        {
          type: 'category',
          label: "AvillaCore(v5)",
          items: [
            'guides/v5/install-avilla',
          ]
        },
      ]

    },
    {
      type: 'category',
      label: '附录',
      items: [
        'appendixs/mirai-api-http'
      ]
    }
  ],
};