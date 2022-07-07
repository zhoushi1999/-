module.exports = {
  plugins: {
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    'postcss-pxtorem': {
      // 只有自己写的样式除以75，其他的vant,....除以37.5
      rootValue ({ file }) {
        return (file.indexOf('vant') !== -1 || file.indexOf('github-markdown-css') !== -1) ? 37.5 : 75
      },

      propList: ['*']
    }
  }
}
