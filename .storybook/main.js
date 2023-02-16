module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
        controls: false,
        docs: false,
        toolbars: false
      }
    },
    'storybook-css-modules',
    '@riscarrott/storybook-source-link'
  ],
  framework: '@storybook/react'
};
