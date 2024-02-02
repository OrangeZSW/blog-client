const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 将依赖包提前编译
  transpileDependencies: true,
    // 配置webpack
  chainWebpack: config => {
    config
        .plugin('html')
        .tap(args => {
          // 修改title
          args[0].title = 'Orange';
          return args;
        })
  }
})

