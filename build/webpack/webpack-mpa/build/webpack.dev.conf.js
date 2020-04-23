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

const getMPA = () => {

    const entry = {};
    const htmlWebpackPlugins = [];
 
    const entryFiles = glob.sync(path.join(__dirname, '../src/page/*/index.js'))
 
    Object.keys(entryFiles).map(index => {
        const entryFile = entryFiles[index];
        const match = entryFile.match(/src\/(.*)\/index\.js/);
        const pageName = match && match[1];
 
        entry[pageName] = entryFile;
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                template: path.join(__dirname, `../src/${pageName}/index.html`),
                filename: `${pageName}/index.html`,
                chunks: [pageName],
                inject: true,
                minify: {
                    html5: true,
                    collapseWhitespace: true,
                    preserveLineBreaks: false,
                    minifyCSS: true,
                    minifyJS: true,
                    removeComments: false
                }
            })
        );
    })
    //console.log('entryFiles',entryFiles, entry,htmlWebpackPlugins);
 
    return {
        entry,
        htmlWebpackPlugins
    }
}


const { entry, htmlWebpackPlugins } = getMPA();

//let baseUrl = "page/page-vue";


module.exports = {

   
    entry ,//: path.resolve( __dirname,"src/"+baseUrl+"/index.js"),
    output:{

        //输出文件名
        filename: '[name]/build.js', //'build.js',//
        //__dirname当前目录绝对路径
        path:path.join(__dirname, '../dist') // path.resolve( __dirname , 'dist/'+baseUrl )//

    },
    module:{

        rules:[{
                
                test:/.js$/,
                use: 'babel-loader'

            },{  //loader配置

                test: /\.css$/,
                use:[
                    //创建style标签，将js中的样式资源插入进行，添加到head中生效   
                    MiniCssExtractPlugin.loader,
                    //将 css 文件变成common.js 模块加载js中
                    'css-loader'
                ]

            },{  //loader配置

                test: /\.less$/,
                use:[
                    //创建style标签，将js中的样式资源插入进行，添加到head中生效   
                    MiniCssExtractPlugin.loader,
                    //将 css 文件变成common.js 模块加载js中
                    'css-loader',
                    'less-loader'
                ]

            },{  //loader配置

                test: /\.vue$/,
                loader:'vue-loader'

            },{  //loader配置

                test: /\.(jpg|png|gif)$/,
                loader:'url-loader',
                options:{

                    limit: 8 * 1024,  ///图片小于8kb，会被base64处理 优点减少服务器压力 缺点图片体积增大
                    esModule: false,   ///url-loader使用es6loader 而html-loader引入图片使用 common.js解析会出问题
                    name:'assets/images/[name]_[hash:8].[ext]',
                    publicPath: '../../'
                    
                }

            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name:'assets/fonts/[name]_[hash:8].[ext]',
                    publicPath: '../../'
                }
            },
            {  //loader配置

                test: /\.html$/,
                loader:'html-loader', //处理html 中 img 
                loader: 'html-loader',
                options: {
                    attributes: {
                        list: [
                        {
                            // Tag name
                            tag: 'img',
                            // Attribute name
                            attribute: 'src',
                            // Type of processing, can be `src` or `scrset`
                            type: 'src',
                        },
                        ]
                    }
                }  
            }
        ]

    },
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
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename:'[name]/[contenthash:8].css'
        }),
        new webpack.HotModuleReplacementPlugin(),
  
    ].concat(htmlWebpackPlugins),
     
    mode:"development", // production
    
    devServer:{

        contentBase: path.resolve(__dirname,'../dist'),
        //启动gzip压缩
        compress: true,
        port: 3000,
        hot: true,
    }


    //只会在内存中编译打包，不会有任何输出
    // npx webpack-dev-server 

}
        

