module.exports = {
  presets: [
    // https://github.com/vuejs/vue-cli/tree/master/packages/@vue/babel-preset-app
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      // 指定样式路径
      style: (name) => {
        return `${name}/style/less`
      }
      // style: true
    }, 'vant']
  ],
  'env': {
    'development': {
      // babel-plugin-dynamic-import-node plugin only does one thing by converting all import() to require().
      // This plugin can significantly increase the speed of hot updates, when you have a large number of pages.
      // https://panjiachen.github.io/vue-element-admin-site/guide/advanced/lazy-loading.html
      'plugins': ['dynamic-import-node',
        ['@babel/plugin-proposal-decorators', { 'legacy': true }],
        '@babel/plugin-proposal-export-namespace-from',
        '@babel/plugin-proposal-export-default-from'
      ]
    }
  }
}
