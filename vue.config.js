const path = require('path')
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [ // 自动注入到每个less文件或者vue组件中style标签中。 vue add style-resources-loader
        path.join(__dirname, './src/assets/styles/variables.less'),
        path.join(__dirname, './src/assets/styles/mixins.less')
      ]
    },
    chainWebpack: config => {
      // 图片
      config.module
        .rule('images')
        .use('url-loader')
        .loader('url-loader')
        .tap(options => Object.assign(options, { limit: 10000 }))
      // 这个是给webpack-dev-server开启可IP和域名访问权限。
      config.devServer.disableHostCheck(true)
    }
    // # 这个是设置外部扩展，模块为qc变量名为QC，导入qc将不做打包。
  },
  configureWebpack: {
    externals: {
      qc: 'QC'
    }
  }
})
