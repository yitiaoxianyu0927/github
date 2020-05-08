/*
  webpack config.js webpack配置文件
  webpack运行时会加载里面的配置

*/


const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const copyWebpackPlugin = require('copy-webpack-plugin');
const baseConfig = require('./webpack.base.conf.js');
const merge = require('webpack-merge');
const config = require('../config');
const portfinder = require('portfinder')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')


const devConfig = {

    
    plugins:[
       
        
        new webpack.HotModuleReplacementPlugin(),
     
    ],
     
    mode:"development", // production
    devtool:'eval-source-map',
    devServer:{

        contentBase: path.resolve(__dirname,'../dist'),
        //启动gzip压缩
        compress: true,
        host: config.dev.host,
        port: config.dev.post,
        overlay: config.dev.errorOverlay? 
          { warnings: false, errors: true }
          : false,
        hot: true,
        //quiet: true,
        publicPath:"/",
        watchOptions: {
          poll: config.dev.poll
        }
    }


    //只会在内存中编译打包，不会有任何输出
    // npx webpack-dev-server 

}
        



const devWebpackConfig = merge(baseConfig,devConfig);

//module.exports = devWebpackConfig;

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port;   ///
    portfinder.getPort((err, port) => {
      if (err) {
        reject(err)
      } else {
        // publish the new Port, necessary for e2e tests
        process.env.PORT = port
        // add port to devServer config
        devWebpackConfig.devServer.port = port
  
        // Add FriendlyErrorsPlugin
        devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
          },
        //   onErrors: config.dev.notifyOnErrors
        //   ? utils.createNotifierCallback()
        //   : undefined
        }))
  
        resolve(devWebpackConfig)
      }
    })
  })
  