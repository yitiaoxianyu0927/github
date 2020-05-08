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
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const PruifyCSSPlugin = require('purifycss-webpack');
const config = require('../config');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf.js');






const prodConfig = {

    plugins:[
       
        
        new CleanWebpackPlugin({

            // cleanOnceBeforeBuildPatterns: [
            //     path.resolve( __dirname,"dist/"+baseUrl)
            // ],
        }),
        // new HtmlWebpackPlugin({
        //     template:path.resolve( __dirname,"src/"+baseUrl+"/index.html"),
        //     inject: true,
        //     chunks:[baseUrl],
        //     minify: {
        //         removeComments: true,
        //         collapseWhitespace: true,
        //         removeAttributeQuotes: true
        //     }
        // }),
      
        // new PruifyCSSPlugin({
        //     paths:glob.sync(path.join(__dirname,'src/*.html'))//src下所有的html
        // })
        // new HtmlWebpackExternalsPlugin({
        //     externals: [
        //       {
        //         module: 'jquery',
        //         entry: 'dist/jquery.min.js',
        //         global: 'jQuery',
        //       },
        //     ],
        // })
    //     new webpack.LoaderOptionsPlugin({
    //         // webpack 2.0之后， 此配置不能直接写在自定义配置项中， 必须写在此处
    //         vue: {
    //             postcss: [require('postcss-px2rem')({ remUnit: 75, propWhiteList: [] })]
    //         },
    //     })
    ],
    optimization: {
        splitChunks: {
          chunks: 'all',
          minChunks: 1,
          cacheGroups: {
            libs: {
                name: 'libs/chunk-libs',
                test: /[\\/]node_modules[\\/]/,
                priority: 10,
                chunks: 'initial' // 只打包初始时依赖的第三方
            },
            elementUI: {
                name: 'libs/chunk-elementUI', // 单独将 elementUI 拆包
                
                priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                test: /[\\/]node_modules[\\/]element-ui[\\/]/
            },
            AntDesign: {
                name: 'libs/chunk-antd', // 单独将 elementUI 拆包
                priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
                test: /[\\/]node_modules[\\/]antd[\\/]/
            },
          }
        },
    },    
    mode:"production", // production

    //只会在内存中编译打包，不会有任何输出
    // npx webpack-dev-server 

}



module.exports = merge(baseConfig,prodConfig);