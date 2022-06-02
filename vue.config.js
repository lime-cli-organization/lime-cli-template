const { defineConfig } = require('@vue/cli-service');

const path = require('path');
const VersionPlugin = require('./VersionPlugin.js');

const isProduction = ['production', 'prod'].includes(process.env.NODE_ENV);

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 打包源码显示
  productionSourceMap: false,
  // 对内部webpack进行更细粒度的修改
  chainWebpack: (config) => {
    // 自定义svg组件
    config.module.rule('svg').exclude.add(path.join(__dirname, 'src/icons')).end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.join(__dirname, 'src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
      .before('svg-sprite-loader')
      .use('svgo-loader')
      .loader('svgo-loader')
      .options({
        plugins: [
          //!重点就是改这个位置，加个插件名字
          {
            name: 'removeAttrs',
            params: {
              attrs: '(fill|stroke)',
            },
          },
        ],
      })
      .end();
    // 全局引入 less 变量
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal'];
    types.forEach((type) =>
      config.module
        .rule('less')
        .oneOf(type)
        .use('style-resource')
        .loader('style-resources-loader')
        .options({
          patterns: [path.resolve(__dirname, './src/styles/variable.less')],
        })
    );
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  },
  // 其他配置
  configureWebpack: (config) => {
    config.entry.app = ['babel-polyfill', './src/main.js'];
    if (isProduction) {
      // 自动更新
      config.plugins.push(
        new VersionPlugin({
          path: path.resolve(__dirname, '../dist'),
          env: 'production',
          versionDirectory: 'public',
        })
      );
    }
  },
});
