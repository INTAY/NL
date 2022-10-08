'use strict'
// Template version: 1.2.6
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

// const path = require('path')
const localUrl = 'http://192.168.10.102:81'
// const localUrl = 'http://192.168.20.173:81'
// const imgUrl = 'http://192.168.20.171:81/service/107/img/'
module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      //登陆服务
      '/service/9060': {
        target: localUrl, //模拟数据接口
        // secure: false, // https需要配置
        changeOrigin: true,
        pathRewrite: {
          '^/service': '/service/'
        }
      },
      //设置代理请求
      '/service/102': {
        target: localUrl, //模拟数据接口
        // secure: false, // https需要配置
        changeOrigin: true,
        pathRewrite: {
          '^/service': '/service/'
        }
      },
      //设置代理请求
      '/service/107': {
        target: localUrl, //模拟数据接口
        // secure: false, // https需要配置
        changeOrigin: true,
        pathRewrite: {
          '^/service': '/service/'
        }
      },
      //客户服务
      '/service/551': {
        target: localUrl, //模拟数据接口
        // secure: false, // https需要配置
        changeOrigin: true,
        pathRewrite: {
          '^/service': '/service/'
        }
      },
      //操作日志代理请求
      '/service/112': {
        target: localUrl, //模拟数据接口
        // secure: false, // https需要配置
        changeOrigin: true,
        pathRewrite: {
          '^/service': '/service/'
        }
      },
      //用户管理
      '/service/114': {
        target: localUrl, //模拟数据接口
        // secure: false, // https需要配置
        changeOrigin: true,
        pathRewrite: {
          '^/service': '/service/'
        }
      },
      //消息管理
      '/service/119': {
        target: localUrl, //模拟数据接口
        // secure: false, // https需要配置
        changeOrigin: true,
        pathRewrite: {
          '^/service': '/service/'
        }
      },
      //首页
      '/service/555': {
        target: localUrl, //模拟数据接口
        // secure: false, // https需要配置
        changeOrigin: true,
        pathRewrite: {
          '^/service': '/service/'
        }
      },
      //设备管理服务
      '/service/301': {
        target: localUrl, //模拟数据接口
        // secure: false, // https需要配置
        changeOrigin: true,
        pathRewrite: {
          '^/service': '/service/'
        }
      }
    },

    // Various Dev Server settings
    host: '0.0.0.0', // can be overwritten by process.env.HOST   localhost
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: false,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: true,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',

    /**
     * You can set by youself according to actual condition
     * You will need to set this if you plan to deploy your site under a sub path,
     * for example GitHub pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then assetsPublicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     */
    // assetsPublicPath: '/vueAdmin-template/', // If you are deployed on the root path, please use '/'
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}