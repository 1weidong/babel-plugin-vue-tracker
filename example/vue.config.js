const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.module.rule('js')
      .test(/\.js$/)
      .use('babel-loader')
      .loader('babel-loader')
      .tap(options => {
        options.cacheDirectory = false
        return options
      })
  }
})
