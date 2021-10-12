module.exports = {
  publicPath: "./",
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: '上海回访',
    },
  },
  configureWebpack:{
    resolve:{
      alias:{
        // "@":"src"  已经配置过了
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  },




  // 配置跨域请求
  // devServer: {
  //   port: 8080,
  //   host: 'localhost',
  //   open: true,
  //   https: false,
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost/api/LargeData/',
  //       ws: true,
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     }
  //   }

  // }
}
