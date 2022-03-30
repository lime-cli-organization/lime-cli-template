const { defineConfig } = require('@vue/cli-service');

// const CleanWebpackPlugin = require('clean-webpack-plugin');

// const path = require('path');
// const VersionPlugin = require('./VersionPlugin.js');
// // 是否是生产环境
// const isProduction = ['production', 'prod'].includes(process.env.NODE_ENV);

// "webpack-bundle-analyzer": "^4.5.0"

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 打包源码显示
  // productionSourceMap: false,
  // 对内部webpack进行更细粒度的修改
  // chainWebpack: (config) => {},
  // 其他配置
  // configureWebpack: (config) => {
  //   if (isProduction) {
  // 插件
  // config.plugins.push(new CleanWebpackPlugin(['dist']));
  // config.plugins.push(
  //   new VersionPlugin({
  //     path: path.resolve(__dirname, '../dist'),
  //     env: 'production',
  //     versionDirectory: 'public',
  //   })
  // );
  //   }
  // },
});
